import React, { Component } from 'react';
import './Droptarget.css';

export default class Droptarget extends Component {
    constructor() {
        super();

        this._onDrop = this._onDrop.bind(this);
    }

    render() {
        return (
            <div
                className="droptarget"
                onDrop={this._onDrop}
                onDragOver={(e) => e.preventDefault()}
            ></div>
        );
    }

    _onDrop(e) {
        if (e.dataTransfer.getData('is') === 'shotgun') {
            this.props.onDrop(e);
        }
    }
}
