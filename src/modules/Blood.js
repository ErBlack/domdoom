import { EFFECTS } from './Resources.js';
import Sprite from './Sprite';

const FRAME_OFFSETS = [
    [-2, -2],
    [-4, -4],
    [-5, -5]
];

export default class Blood extends Sprite {
    constructor(params) {
        super(Object.assign({
            frames: EFFECTS.blood,
            frameOffsets: FRAME_OFFSETS,
            animationSpeed: 7,
            animationCount: 1
        }, params));
    }
}