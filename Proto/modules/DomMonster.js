module.exports = class DomMonster {
    constructor(elem) {
        if (elem instanceof HTMLElement) {
            this._elem = elem;
        } else {
            throw new TypeError('elem should be an instance of HTMLElement');
        }
    }
    /**
     * main dataset
     */
    get data() {
        return this._elem.dataset;
    }

    get left() {
        return Number(this._elem.style.left);
    }

    set left(value) {
        return this._elem.style.left = value + 'px';
    }

    get top() {
        return Number(this._elem.style.top);
    }

    set top(value) {
        return this._elem.style.top = value + 'px';
    }
};