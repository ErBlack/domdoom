import React, { Component } from 'react';
import { resourcesLoad, ENVIRONMENT_SOUND, SHOTGUN_SOUND } from './Resources.js';

import './Canvas.css';

import Wall from './Wall';
import Pool from './Pool';
import Shot from './Shot';
import Blood from './Blood';
import Teleport from './Teleport';
import Cacodemon from './Cacodemon';

const CANVAS_WIDTH = 1024;
const CANVAS_HEIGHT = 640;
const CANVAS_AR = CANVAS_WIDTH / CANVAS_HEIGHT;

class Canvas extends Component {
    constructor() {
        super();

        this._effects = [];
        this._npc = [];

        this.main = this.main.bind(this);
        this._onClick = this._onClick.bind(this);
        this._onMouseMove = this._onMouseMove.bind(this);
        this._onWindowResize = this._onWindowResize.bind(this);
        this._onWindowHunt = this._onWindowHunt.bind(this);

        this._reload = false;
        this._hunt = false;
    }

    render() {
        return (
            <canvas
                className="canvas"
                ref={(canvas) => {
                    this._canvas = canvas;
                    this._2d = canvas.getContext('2d');
                }}
                width={CANVAS_WIDTH}
                height={CANVAS_HEIGHT}
                style={{
                    transform: `scale(${this._scale()})`
                }}
                onClick={this._onClick}
                onMouseMove={this._onMouseMove}
            >
            </canvas>
        );
    }

    main() {
        var now = Date.now();
        var dt = now - this._time;

        this.update(dt);
        this.draw();

        this._time = now;

        requestAnimationFrame(this.main)
    }


    componentDidMount() {
        resourcesLoad.then((resources) => {
            this._2d.imageSmoothingEnabled = false;

            this._background = new Wall();
            this._foreground = new Pool();

            this._time = Date.now();
            this.main();
        })

        window.addEventListener('resize', this._onWindowResize);
        window.addEventListener('hunt', this._onWindowHunt);
    }

    update(dt) {
        const update = (sprite) => {
            sprite.update(dt);
        };

        update(this._background);

        this._npc.forEach(update);
        this._effects.forEach(update);
    }


    draw() {
        const render = (sprite) => {
            sprite.render(this._2d);

            return !sprite.finished;
        };

        render(this._background);
        this._npc = this._npc.filter(render);
        this._effects = this._effects.filter(render);
        render(this._foreground);
    }

    _scale() {
        const {
            innerWidth,
            innerHeight
        } = window;
        const window_ar = innerWidth / innerHeight;

        this._scaleFactor = window_ar > CANVAS_AR ? innerWidth / CANVAS_WIDTH : innerHeight / CANVAS_HEIGHT;

        return this._scaleFactor;
    }

    _onClick(e) {
        if (!this._reload && this._hunt) {
            this._shoot(this._eventPosition(e));
        }
    }

    _onWindowResize() {
        this._canvas.style.transform = `scale(${this._scale()})`;
    }

    _onWindowHunt() {
        this._hunt = true;
        this._canvas.classList.add('canvas_hunt');
        this._spawn([
            512,
            320
        ], () => {
            setTimeout(() => {
                this._hunt = false;
                this._canvas.classList.remove('canvas_hunt');

                ENVIRONMENT_SOUND.ost.pause();
            }, 1000);
        });

        setTimeout(() => {
            ENVIRONMENT_SOUND.ost.play()
        }, 1500);
    }

    _onMouseMove(e) {
        this._beware(this._eventPosition(e));
    }

    _eventPosition(e) {
        const rect = this._canvas.getBoundingClientRect();

        return [
            this._scaleValue(e.clientX - rect.left),
            this._scaleValue(e.clientY - rect.top)
        ];
    }

    _scaleValue(value) {
        return value / this._scaleFactor;
    }

    _spawn(position, onDeath) {
        this._effects.push(new Teleport({
            position
        }));

        ENVIRONMENT_SOUND.teleport.play();

        this._npc.push(new Cacodemon({
            position,
            onDeath
        }));
    }

    _shoot(position) {
        SHOTGUN_SOUND.shot.play();

        this._reload = true;

        setTimeout(() => {
            this._reload = false;
        }, 1000);

        const hit = this._npc.some((npc) => {
            return npc.shot(position);
        });

        this._effects.push(new (hit ? Blood : Shot)({
            position
        }));
    }

    _beware(position) {
        this._npc.forEach((npc) => {
            npc.beware(position);
        });
    }
}

export default Canvas;
