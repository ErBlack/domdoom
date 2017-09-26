module.exports = class Sprite {
    constructor({
        frame,
        frames,
        frameOffsets,
        animationSpeed,
        animationCount,
        position,
        size,
        flip,
        onFinish
    }) {
        if (frame) {
            this._frames = [frame];
        } else if (frames) {
            this._frames = frames || [];
        }

        this._frameOffsets = frameOffsets || [];

        this.position = position;
        this._size = size || [];

        this._flip = Boolean(flip);

        this._antimationsLeft = animationCount;

        this._frameIndex = 0;
        this._frame = this._frames[0];
        this._finished = false;

        this._onFinish = onFinish;

        this._animated = Boolean(animationSpeed);
        this._finite = Boolean(animationCount);

        if (this._animated) {
            this._frameDuration = 1000 / animationSpeed;
            this._cycleDuration = this._frames.length * this._frameDuration;
            this._cycleTime = 0;
        }
    }

    set position(value) {
        if (!Array.isArray(value)) {
            throw new Error(`Координаты должны быть заданы массивом а не ${typeof value}`);
        }

        this._position = value;
    }

    get position() {
        return this._position;
    }

    get frame() {
        return this._frame;
    }

    set flip(value) {
        this._flip = Boolean(value);
    }

    set frameIndex(value) {
        this._frameIndex = value;
        this._frame = this._frames[value];
    }

    finish() {
        if (this._finished) {
            return;
        }

        if (typeof this._onFinish === 'function') {
            this._onFinish();
        }

        this._finished = true;
    }

    update(dt) {
        if (this._animated) {
            this._cycleTime += dt;

            if (this._cycleTime >= this._cycleDuration) {
                const reminder = this._cycleTime % this._cycleDuration;

                if (this._finite) {
                    this._antimationsLeft -= (this._cycleTime - reminder) / this._cycleDuration;

                    if (this._antimationsLeft <= 0) {
                        this.finish();
                    }
                }

                this._cycleTime = reminder;
            }

            this.frameIndex = Math.floor(this._cycleTime / this._frameDuration);
        }
    }

    render(ctx) {
        if (this._finished) {
            return;
        }

        ctx.save();

        const [
            w = this._frame.width,
            h = this._frame.height
        ] = this._size;

        let [x, y] = this._position;

        if (this._frameOffsets[this._frameIndex]) {
            x += this._frameOffsets[this._frameIndex][0];
            y += this._frameOffsets[this._frameIndex][1];
        }

        if (this._flip) {
            ctx.scale(-1, 1);
            x = -x - w;
        }

        ctx.drawImage(this._frame, x, y, w, h);
        ctx.restore();
    }
}