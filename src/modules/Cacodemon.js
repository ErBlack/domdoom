import { CACODEMON } from './Resources.js';
import Sprite from './Sprite';

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
        this._sprite = this._mainSprite = new Sprite({
            frames: CACODEMON.regular.slice(0, 1),
            frameOffsets: [FRAME_OFFSET],
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

    update() {
        this._sprite.update(...arguments);
    }

    render(ctx) {
        this._sprite.render(...arguments);
    }
}