export default class Vector {
    constructor(a, b) {
        this._a = a;
        this._b = b;
    }
    get width() {
        return this._a[0] - this._b[0];
    }

    get height() {
        return this._a[1] - this._b[1];
    }

    get length() {
        return Math.sqrt(this.width * this.width + this.height * this.height);
    }

    valueOf() {
        return this.length;
    }
}
