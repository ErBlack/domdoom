const WALL_SPRITE_HEIGHT = 128; // px

export default class Pool {
    update() {
    }

    render(ctx) {
        ctx.save();

        ctx.fillStyle = 'rgba(155, 0, 0, 0.5)';
        ctx.fillRect(0, WALL_SPRITE_HEIGHT * 4, 1024, WALL_SPRITE_HEIGHT);
        ctx.restore();
    }
}