import React, { Component } from 'react';
import './Invitation.css';
import Timer from './Timer.js';

import header from '../images/text/title.png';
import MarsMap from './MarsMap.js';
import Shotgun from './Shotgun.js';
import Droptarget from './Droptarget.js';

import { SHOTGUN_SOUND } from './Resources';

const START_DATE = new Date('2017-10-14T15:00:00.000Z');
const PLACE_URL = 'http://antimars.ru/';
const WISHLIST_URL = 'https://raindrop.io/collection/9348';
const STEAM_URL = 'https://steamcommunity.com/id/ErBlack/wishlist';
const CHAT_URL = 'https://t.me/joinchat/AnHOJg8YZcEe24R3_xhTzg';

export default class Invitation extends Component {
    constructor() {
        super();

        this._onGunDrop = this._onGunDrop.bind(this);
        this._onGunDragStart = this._onGunDragStart.bind(this);
        this._onGunDragStop = this._onGunDragStop.bind(this);

        this.state = {
            dragging: false,
            hunt: false
        }
    }

    render() {
        return (
            <div className={`invitation invitation_dragging_${this.state.dragging} invitation_hunt_${this.state.hunt}`}>
                <img src={header} className="invitation_header" alt="Welcome to the DOOMSDAY" />
                <div className="invitation_subheader">
                    Приглашаю на день рождения
                </div>
                <Timer start={START_DATE} />
                <h2>Описание</h2>
                <div className="invintation_text">
                    Мероприятие пройдёт <a href={PLACE_URL}>на марсе</a> {START_DATE.toLocaleDateString()} в {START_DATE.toLocaleTimeString()}.
                </div>
                <div className="invintation_disclamer">
                    <abbr title="Union Aerospace Corporation">UAC</abbr> не несёт отвественности за вашу жизнь и здоровье на мероприятии.
                    На случай внезапного портала в ад, можете прихватить <Shotgun
                        onDragStart={this._onGunDragStart}
                        onDragStop={this._onGunDragStop}
                    />.
                </div>
                <h2>Карта</h2>
                <MarsMap />
                <h2>Программа</h2>
                <div className="invintation_program">
                    <ul>
                        <li>18:00 Начало</li>
                        <li>18:30 Ужин</li>
                        <li>19:00 Настолки/Консоли</li>
                        <li>20:00 Пьянство</li>
                        <li>21:00 The Empire Strikes Back</li>
                        <li>23:00 Encore</li>
                    </ul>
                </div>
                <h2>Ссылки</h2>
                <div className="invintation_links">
                    <a className="invintation_link invintation_link_wishlist" href={WISHLIST_URL}>Вишлист</a>
                    <a className="invintation_link invintation_link_steam" href={STEAM_URL}>В стим</a>
                    <a className="invintation_link invintation_link_chat" href={CHAT_URL}>Чат</a>
                </div>
                <Droptarget onDrop={this._onGunDrop} />
            </div>
        );
    }

    _onGunDrop() {
        const event = new Event('hunt');

        window.dispatchEvent(event);

        this.setState({ hunt: true });

        SHOTGUN_SOUND.reload.play();
    }

    _onGunDragStart() {
        this.setState({ dragging: true });
    }

    _onGunDragStop() {
        this.setState({ dragging: false });
    }
}
