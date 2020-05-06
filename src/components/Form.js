import React, { Component } from 'react';
import './Form.scss';

export default class Form extends Component {
    constructor(props) {
        super(props);

        this.state = {
            brand: "",
            model: "",
            version: ""
        }

        this.getBrands = this.getBrands.bind(this);
        this.getModels = this.getModels.bind(this);
        this.getVersions = this.getVersions.bind(this);
        this.setVersions = this.setVersions.bind(this);
    }

    componentDidMount() {
        this.getBrands();
    }

    getBrands() {
        let url = "http://desafioonline.webmotors.com.br/api/OnlineChallenge/make";
        fetch(url)
            .then(result=>{
                return result.json()
            })
            .then(json=>{
                this.addOptions(document.getElementById("brand"), json);
            })
    }

    getModels(event) {
        this.setState({brand:event.target.value}, () => {
            if(this.state.brand !== "") {
                let url = "http://desafioonline.webmotors.com.br/api/OnlineChallenge/model?MakeID=" + this.state.brand;
                fetch(url)
                    .then(result=>{
                        return result.json()
                    })
                    .then(json=>{
                        this.resetOptions(document.getElementById("model"));
                        this.addOptions(document.getElementById("model"), json);
                        this.resetOptions(document.getElementById("version"));
                    })
            } else {
                this.resetOptions(document.getElementById("model"));
                this.resetOptions(document.getElementById("version"));
            }
        });
    }

    getVersions(event) {
        this.setState({model:event.target.value, version:""}, () => {
            if(this.state.model !== "") {
                let url = "http://desafioonline.webmotors.com.br/api/OnlineChallenge/version?ModelID=" + this.state.model;
                fetch(url)
                    .then(result=>{
                        return result.json()
                    })
                    .then(json=>{
                        this.resetOptions(document.getElementById("version"));
                        this.addOptions(document.getElementById("version"), json);
                    })
            } else {
                this.resetOptions(document.getElementById("version"));
            }
        });
    }

    setVersions(event) {
        this.setState({version:event.target.value});
    }

    addOptions(object, json) {
        for(let option in json) {
            let selectOption = document.createElement("option");
            selectOption.setAttribute("value", json[option].ID);
            selectOption.text = json[option].Name;
            object.add(selectOption);
        }
        object.disabled = false;
        object.focus();
    }

    resetOptions(object) {
        object.disabled = true;
        for (var i = object.length - 1; i >= 0; i--) {
            if (i > 0) {
                object.remove(i);
            }
        }
    }

    render() {
        return (
            <form id="form">
                <div id="formContainer">
                    <input type="checkbox" id="novos" name="checkbox" value="novos" />
                    <label htmlFor="novos" className="lblCheckbox">Novos</label>

                    <input type="checkbox" id="usados" name="checkbox" value="usados" />
                    <label htmlFor="usados" className="lblCheckbox">Usados</label>

                    <label htmlFor="location" className="lblInput">Onde:</label>
                    <input type="text" id="location" />

                    <label htmlFor="radius" className="lblSelect">Raio:</label>
                    <select id="radius">
                        <option value="0km">0km</option>
                        <option value="50km">50km</option>
                        <option value="100km">100km</option>
                        <option value="150km">150km</option>
                        <option value="200km">200km</option>
                    </select>

                    <label htmlFor="brand" className="lblSelect">Marca:</label>
                    <select id="brand" disabled="disabled" onChange={this.getModels}>
                        <option value="">Todas</option>
                    </select>

                    <label htmlFor="model" className="lblSelect">Modelo:</label>
                    <select id="model" disabled="disabled" onChange={this.getVersions}>
                        <option value="">Todos</option>
                    </select>

                    <label htmlFor="year" className="lblSelect">Ano Desejado:</label>
                    <select id="year"></select>

                    <label htmlFor="price" className="lblSelect">Faixa de Preço:</label>
                    <select id="price"></select>

                    <label htmlFor="version" className="lblSelect">Versão:</label>
                    <select id="version" disabled="disabled" onChange={this.setVersions}>
                        <option value="">Todas</option>
                    </select>

                    <button id="btnAdvanced">busca avançada</button>
                    <button id="btnReset">limpar filtros</button>
                    <button id="btnSearch">ver ofertas</button>
                </div>
            </form>
        );
    }
}
