import { CACODEMON } from './Resources.js';
import Sprite from './Sprite';
import Vector from './Vector';

const FRAME_OFFSET = [-31, -33];

const DEATH_FRAME_OFFSETS = [
    [-31, -33],
    [-31, -33],
    [-31, -33],
    [-31, -37],
    [-36, -33],
    [-41, -16]
];

const R = 31;

export default class Cacodemon {
    constructor({ position }) {
        this._position = position;
        this._initialPosition = this._position.concat();
        this._hspeed = 0;
        this._vspeed = 0;

        this._panicDistance = 160;

        this._sprite = this._mainSprite = new Sprite({
            frames: CACODEMON.regular,
            frameOffsets: [
                FRAME_OFFSET,
                FRAME_OFFSET,
                FRAME_OFFSET
            ],
            position
        });
    }

    shot(coords) {
        const [sx, sy] = coords;
        const [px, py] = this._position;
        const SR = Math.sqrt(Math.pow(sx - px, 2) + Math.pow(sy - py, 2));
        const hit = SR <= R;

        if (hit) {
            this._drawHit();
        }

        return hit;
    }

    beware(coords) {
        const v = new Vector(coords, this._position);
        const panicValue = this._panicDistance - v.length;

        if (panicValue > 0) {
            this._goingHome = false;

            const speed = Math.max(this._panicDistance - v.length, 0) * 1.2 / 1000;
            const summ = Math.abs(v.width) + Math.abs(v.height);

            this._hspeed = -v.width / summ * speed;
            this._vspeed = -v.height / summ * speed;
        } else {
            this._goingHome = true;
        }
    }

    _tryToGoHome() {
        if (!this._goingHome) {
            return;
        }

        const [px, py] = this._position;
        const [ix, iy] = this._initialPosition;

        const dx = ix - px;
        const dy = iy - py;
        const adx = Math.abs(dx);
        const ady = Math.abs(dy);
        const summ = adx + ady;
        const speed = 0.1;
        const threshold = 1;

        this._hspeed = adx > threshold ? Math.min(adx / summ * speed, adx * 3 / 1000) * Math.sign(dx) : 0;
        this._vspeed = ady > threshold ? Math.min(ady / summ * speed, ady * 3 / 1000) * Math.sign(dy) : 0;
    }



    _drawHit() {
        this._sprite = new Sprite({
            frames: CACODEMON.hit,
            frameOffsets: [
                FRAME_OFFSET,
                FRAME_OFFSET
            ],
            position: this._position,
            animationSpeed: 8,
            animationCount: 1,
            onFinish: function() {
                this._sprite = this._mainSprite;
            }.bind(this)
        });
    }

    _drawDeath() {
        this._sprite = new Sprite({
            frames: CACODEMON.death,
            frameOffsets: DEATH_FRAME_OFFSETS,
            position: this._position,
            animationSpeed: 7,
            animationCount: 1,
            onFinish: function() {
                this._sprite = this._mainSprite;
            }.bind(this)
        });
    }

    _turn() {
        const ahspeed = Math.abs(this._hspeed);

        if (ahspeed > 0.1) {
            this._mainSprite.frameIndex = 2;
            this._mainSprite.flip = this._hspeed > 0;
        } else if (ahspeed > 0) {
            this._mainSprite.frameIndex = 1;
            this._mainSprite.flip = this._hspeed > 0;
        } else {
            this._mainSprite.frameIndex = 0;
            this._mainSprite.flip = false;
        }
    }

    _move(dt) {
        if (this._hspeed !== 0) {
            this._position[0] += dt * this._hspeed;
        }

        if (this._vspeed !== 0) {
            this._position[1] += dt * this._vspeed;
        }
    }

    update(dt) {
        this._tryToGoHome();
        this._turn();
        this._move(dt);
        this._sprite.update(...arguments);
    }

    render(ctx) {
        this._sprite.render(...arguments);
    }
}