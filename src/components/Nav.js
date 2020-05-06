import React, { Component } from 'react';
import './Nav.scss';

export default class Nav extends Component {
    render() {
        return (
            <nav>
                <ul id="tabs">
                    <li id="tab1" className="active">Comprar <b>carros</b></li>
                    <li id="tab2">Comprar <b>motos</b></li>
                </ul>
                <button id="btnSell">Vender meu carro</button>
            </nav>
        );
    }
}
