import React, { Component } from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import './MarsMap.css';

const mars = [60.03880, 30.32160];

export default class MarsMap extends Component {
    render() {
        return (
            <div className="map">
                <YMaps>
                    <Map state={{
                        center: [60.037890, 30.322156],
                        zoom: 16,
                        controls: []
                    }} width={800}>
                        <Placemark
                            geometry={{
                                coordinates: mars
                            }}
                            properties={{
                                hintContent: 'Марс',
                                balloonContent: 'Антикафе «Марс»'
                            }}
                            options={{
                                iconLayout: 'default#image',
                                iconImageHref: 'soula.gif',
                                iconImageSize: [25, 25]
                            }}
                        />

                    </Map>
                </YMaps>
            </div >
        );
    }
}
