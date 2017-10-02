import React, { Component } from 'react';
import './Invitation.css';
import Timer from './Timer.js';

import header from '../images/text/title.png';
import MarsMap from './MarsMap.js';

const START_DATE = new Date('2017-10-14T15:00:00.000Z');
const PLACE_URL = 'http://antimars.ru/';
const WISHLIST_URL = 'https://raindrop.io/collection/9348';
const STEAM_URL = 'https://steamcommunity.com/id/ErBlack/wishlist';

export default class Invitation extends Component {
    render() {
        return (
            <div className="invitation">
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
                    <abbr title="Union Aerospace Corporation">UAC</abbr> не несёт отвественности за вашу жизнь и здоровье на мероприятии. На случай внезапного портала в ад, можете прихватить <span draggable>дробовик</span>.
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
                    <a className="invintation_link invintation_link_chat">Чат</a>
                </div>
            </div>
        );
    }
}
