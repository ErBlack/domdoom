import { EFFECTS } from './Resources.js';
import Sprite from './Sprite';

const FRAME_OFFSETS = [
    [-2, -2],
    [-4, -4],
    [-6, -11],
    [-7, -13]
];

export default class Shot extends Sprite {
    constructor(params) {
        super(Object.assign({
            frames: EFFECTS.shot,
            frameOffsets: FRAME_OFFSETS,
            animationSpeed: 7,
            animationCount: 1
        }, params));
    }
}