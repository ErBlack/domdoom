const css = require('./cacodemon/index.css');
const DomMonster = require('./DomMonster.js');


class Vector {
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
        return length;
    }
}

module.exports = class Cacodemon extends DomMonster {
    constructor() {
        super(...arguments);

        this._mode = 'watch';

        Object.assign(this.data, {
            angle: 0
        });

        this._template();

        this._onMouseMove = this._onMouseMove.bind(this);

        this._body.addEventListener('click', function () {
            this._elem.classList.add('cacodemon_death');
        }.bind(this));

        document.body.addEventListener('mousemove', this._onMouseMove);

        this._panicDistance = 160;
    }

    get bounds() {
        return this._body.getBoundingClientRect();
    }

    get center() {
        const bounds = this._elem.getBoundingClientRect();

        return [
            bounds.left,
            bounds.top
        ];
    }

    _onMouseMove(e) {
        const run = this._calcRunaway(e.clientX, e.clientY);
        
        if (run) {
            this.data.angle = this._calcAngle(e.clientX);

            Object.assign(this, run);
        } else {
            this.data.angle = 0;
        }
    }

    _calcRunaway(x, y) {
        const center = this.center;
        const v = new Vector([x, y], this.center);
        const offset = this._panicDistance - v.length;
        const speed = 1.5;

        if (offset > 0) {
            const mult = offset / v.length;

            return {
                left: center[0] - v.width * mult * speed,
                top: center[1] - v.height * mult * speed
            }
        }
    }

    _calcAngle(x) {
        const center = this.center[0];
        let rect = this.bounds;
        let left = rect.left;
        let right = left + rect.width;

        const leftPanicBound = center - this._panicDistance;
        const rightPanicBound = center + this._panicDistance;

        if (x >= leftPanicBound && x < left) {
            return -45;
        } else if (x >= left && x < center) {
            return -90;
        } if (x >= center && x <= right) {
            return 90;
        } else if (x > right && x <= rightPanicBound) {
            return 45;
        } else {
            return 0;
        }
    }

    _template() {
        this._sprite = document.createElement('div');
        this._sprite.className = 'sprite';
        this._elem.appendChild(this._sprite);

        this._body = document.createElement('div');
        this._body.className = 'body';
        this._elem.appendChild(this._body);
    }
};