import { EFFECTS } from './Resources.js';
import Sprite from './Sprite';

const FRAME_OFFSETS = [
    [-20, -28],
    [-20, -22],
    [-20, -19],
    [-15, -17],
    [-8, -8],
    [-4, -4],
    [-1, -1],
    [-3, -3],
    [-6, -6],
    [-8, -8]
];

export default class Teleport extends Sprite {
    constructor(params) {
        super(Object.assign({
            frames: EFFECTS.teleport,
            frameOffsets: FRAME_OFFSETS,
            animationSpeed: 7,
            animationCount: 1
        }, params));
    }
}