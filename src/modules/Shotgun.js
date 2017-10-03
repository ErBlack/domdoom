import React, { Component } from 'react';
import { SHOTGUN } from './Resources.js';
import './Shotgun.css';

export default class Shotgun extends Component {
    constructor() {
        super();

        this._onDragStart = this._onDragStart.bind(this);
        this._onDragStop = this._onDragStop.bind(this);
    }

    render() {
        return (
            <span
                className="shotgun"
                draggable
                onDragStart={this._onDragStart}
                onDragEnd={this._onDragStop}
            >дробовик</span>
        );
    }

    _onDragStart(e) {
        e.dataTransfer.setDragImage(SHOTGUN, 63, 12);
        e.dataTransfer.setData('is', 'shotgun');
        this.props.onDragStart(e);
    }

    _onDragStop(e) {
        this.props.onDragStop(e);
    }
}
