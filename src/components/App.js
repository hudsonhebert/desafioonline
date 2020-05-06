import React, { Component } from 'react';
import './App.scss';

import Header from './Header.js';
import Nav from './Nav.js';
import Form from './Form.js';

export default class App extends Component {
    render() {
        return (
            <div id="app">
                <Header />
                <div id="box">
                    <Nav />
                    <Form />
                </div>
            </div>
        );
    }
}
