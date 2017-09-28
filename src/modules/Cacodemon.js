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

const GRAVE_BOTTOM = 612;

const R = 31;

const SHOTGUN_MIN_DEMAGE = 35;
const SHOTGUN_MAX_DEMAGE = 105;
const SHOTGUN_DAMAGE_FACTOR = (SHOTGUN_MAX_DEMAGE - SHOTGUN_MIN_DEMAGE) / R;

export default class Cacodemon {
    constructor({ position }) {
        position = position.concat();

        this._position = position;
        this._initialPosition = this._position.concat();
        this._hspeed = 0;
        this._vspeed = 0;

        this._isDead = false;
        this._hp = 4;

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

        if (hit && !this._isDead) {
            this._drawHit();

            this._takeDamage(R - SR);
        }

        return hit;
    }

    beware(coords) {
        if (this._isDead) {
            return;
        }

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

    _takeDamage(hitrate) {
        this._hp -= SHOTGUN_MIN_DEMAGE + (SHOTGUN_DAMAGE_FACTOR * hitrate);

        if (this._hp <= 0) {
            this._die();
        }
    }

    _die() {
        this._isDead = true;
        this._gravePosition = [
            this._position[0],
            GRAVE_BOTTOM
        ];
        this._drawDeath();

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

    _tryToGoGrave() {
        if (!this._isDead) {
            return;
        }

        const [px, py] = this._position;
        const [ix, iy] = this._gravePosition;

        const dy = iy - py;
        const ady = Math.abs(dy);
        const speed = 0.2;
        const threshold = 5;

        this._hspeed = 0;
        this._vspeed = ady > threshold ? speed * Math.sign(dy) : 0;
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
            onFinish: () => {
                this._sprite = new Sprite({
                    frame: CACODEMON.death.slice(-1).pop(),
                    frameOffsets: DEATH_FRAME_OFFSETS.slice(-1),
                    position: this._position
                })
            }
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
        this._tryToGoGrave();
        this._turn();
        this._move(dt);
        this._sprite.update(...arguments);
    }

    render(ctx) {
        this._sprite.render(...arguments);
    }
}