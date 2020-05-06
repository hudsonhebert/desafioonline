import React, { Component } from 'react';
import './Header.scss';
import logo from '../img/logo.png';

export default class Header extends Component {
    render() {
        return (
            <img id="logo" src={logo} alt="Webmotors" />
        );
    }
}
