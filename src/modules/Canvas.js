import React, { Component } from 'react';
import { resourcesLoad } from './Resources.js';

import Wall from './Wall';
import Shot from './Shot';
import Blood from './Blood';
import Teleport from './Teleport';
import Cacodemon from './Cacodemon';

const CANVAS_WIDTH = 1024;
const CANVAS_HEIGHT = 640;

class Canvas extends Component {
    constructor() {
        super();

        this._effects = [];
        this._npc = [];

        this.main = this.main.bind(this);
        this._onClick = this._onClick.bind(this);
        this._onMouseMove = this._onMouseMove.bind(this);
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

            this._spawn([
                512,
                320
            ]);

            this._time = Date.now();
            this.main();
        })
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
    }

    _onClick(e) {
        const rect = this._canvas.getBoundingClientRect();
        this._shoot([
            e.clientX - rect.left,
            e.clientY - rect.top
        ]);
    }

    _onMouseMove(e) {
        const rect = this._canvas.getBoundingClientRect();
        this._beware([
            e.clientX - rect.left,
            e.clientY - rect.top
        ]);
    }

    _spawn(position) {
        this._effects.push(new Teleport({
            position
        }));
        this._npc.push(new Cacodemon({
            position
        }));
    }

    _shoot(position) {
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
