import { WALLS } from './Resources';
import Sprite from './Sprite';

const WALL_SPRITE_WIDTH = 64; // px
const WALL_SPRITE_HEIGHT = 128; // px

function commonWal(frame) {
    return {
        frame: frame,
        size: [
            WALL_SPRITE_WIDTH,
            WALL_SPRITE_HEIGHT
        ]
    }
}

function doubleWal(frame) {
    return {
        frame: frame,
        size: [
            WALL_SPRITE_WIDTH * 2,
            WALL_SPRITE_HEIGHT
        ]
    }
}

const WALL_TYPES = {
    r0: commonWal(WALLS.regular[0]),
    r1: commonWal(WALLS.regular[1]),
    r2: commonWal(WALLS.regular[2]),
    r3: commonWal(WALLS.regular[3]),
    b0: commonWal(WALLS.bloody[0]),
    b1: commonWal(WALLS.bloody[1]),
    b2: commonWal(WALLS.bloody[2]),
    b3: commonWal(WALLS.bloody[3]),
    d0: commonWal(WALLS.border[0]),
    d1: commonWal(WALLS.border[1]),
    d2: commonWal(WALLS.border[2]),
    d3: commonWal(WALLS.border[3]),
    ft: {
        frames: WALLS.fontain,
        size: [
            WALL_SPRITE_WIDTH,
            WALL_SPRITE_HEIGHT
        ],
        animationSpeed: 10
    },
    c1: doubleWal(WALLS.wide_corpse[0]),
    c2: doubleWal(WALLS.wide_corpse[1]),
    c3: commonWal(WALLS.corpse[0]),
    c4: commonWal(WALLS.corpse[1])
}

const MAP = [ // 16 в ширину 5 в высоту в спрайтах
    [
        'r0', 'r1', 'r2', 'r3', 'r0', 'r2', 'r1', 'r3', 'r0', 'r2', 'r1', 'r3', 'r2', 'r0', 'r1', 'r0'
    ],
    [
        'r1', 'c1', null, 'r1', 'r0', 'c3', 'r3', 'r1', 'r2', 'r3', 'c4', 'r1', 'r3', 'c2', null, 'r2'
    ],
    [
        'r2', 'r3', 'r1', 'r2', 'r3', 'r0', 'r2', 'r0', 'r3', 'r1', 'r3', 'r0', 'r1', 'r3', 'r2', 'r1'
    ],
    [
        'd2', 'd3', 'd1', 'd2', 'd3', 'ft', 'd2', 'd0', 'd3', 'd1', 'ft', 'd0', 'd1', 'd3', 'd2', 'd1'
    ],
    [
        'b2', 'b3', 'b1', 'b2', 'b3', 'b0', 'b2', 'b0', 'b3', 'b1', 'b3', 'b0', 'b1', 'b3', 'b2', 'b1'
    ]
];

export default class Wall {
    constructor() {
        this._sprites = [];

        MAP.forEach((row, y) => {
            row.forEach((col, x) => {
                if (col) {
                    this._sprites.push(
                        new Sprite(Object.assign({
                            position: [
                                x * WALL_SPRITE_WIDTH,
                                y * WALL_SPRITE_HEIGHT
                            ]
                        }, WALL_TYPES[col]))
                    )
                }
            })
        });
    }

    update() {
        const arg = arguments;
        this._sprites.forEach((sprite) => {
            sprite.update(...arg);
        });
    }

    render() {
        const arg = arguments;
        this._sprites.forEach((sprite) => {
            sprite.render(...arg);
        });
    }
}