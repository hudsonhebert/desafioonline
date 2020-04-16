/* 
* Desafio Online Webmotors
* 2020/4/15
* Hudson Hebert <hudsonhebert@gmail.com>
*/

const app = {};

app.config = {
    /*
    * App variables
    */
    logo: "img/logo.png", // no svg/png
}

app.init = function() {
    /*
    * Initializing application
    */
    // add base html
    app.build.base();
    // add inputs
    app.build.inputs();
    // get brands
    app.api.request(document.getElementById("brand"), "make");
    // apply navigation
    app.nav.init();
}

app.build = {
    /*
    * Build html elements
    */
    root: document.getElementById("app"),
    radius: ["0km", "50km", "100km", "150km", "200km"],
    base: function() {
        // add logo
        let logo = document.createElement("img");
        logo.setAttribute("id", "logo");
        logo.setAttribute("src", app.config.logo);
        this.root.appendChild(logo);

        // add box
        let box = document.createElement("div");
        box.setAttribute("id", "box");
        this.root.appendChild(box);

        // add tabs
        let tabs = document.createElement("ul");
        tabs.setAttribute("id", "tabs");
        box.appendChild(tabs);

        // add tab1
        let tab1 = document.createElement("li");
        tab1.setAttribute("id", "tab1");
        tab1.setAttribute("class", "active");
        tab1.innerHTML = `Comprar <b>carros</b>`;
        tabs.appendChild(tab1);

        // add tab2
        let tab2 = document.createElement("li");
        tab2.setAttribute("id", "tab2");
        tab2.innerHTML = `Comprar <b>motos</b>`;
        tabs.appendChild(tab2);

        // add button "sell"
        let btnSell = document.createElement("button");
        btnSell.setAttribute("id", "btnSell");
        btnSell.innerHTML = "Vender meu carro";
        box.appendChild(btnSell);
    },
    inputs: function() {
        // add form
        let form = document.createElement("form");
        form.setAttribute("id", "form");
        box.appendChild(form);

        // add form container
        let container = document.createElement("div");
        container.setAttribute("id", "formContainer");
        form.appendChild(container);

        // add checkboxes with labels
        let check1 = document.createElement("input");
        check1.setAttribute("type", "checkbox");
        check1.setAttribute("id", "novos");
        check1.setAttribute("name", "checkbox");
        check1.setAttribute("value", "novos");
        container.appendChild(check1);

        let label1 = document.createElement("label");
        label1.setAttribute("for", "novos");
        label1.setAttribute("class", "lblCheckbox");
        label1.innerHTML = "Novos";
        container.appendChild(label1);

        let check2 = document.createElement("input");
        check2.setAttribute("type", "checkbox");
        check2.setAttribute("id", "usados");
        check2.setAttribute("name", "checkbox");
        check2.setAttribute("value", "usados");
        container.appendChild(check2);

        let label2 = document.createElement("label");
        label2.setAttribute("for", "usados");
        label2.setAttribute("class", "lblCheckbox");
        label2.innerHTML = "Usados";
        container.appendChild(label2);

        // add location input + label
        let locationLabel = document.createElement("label");
        locationLabel.setAttribute("for", "location");
        locationLabel.setAttribute("class", "lblInput");
        locationLabel.innerHTML = "Onde:";
        container.appendChild(locationLabel);

        let location = document.createElement("input");
        location.setAttribute("type", "text");
        location.setAttribute("id", "location");
        container.appendChild(location);

        // add location radius select + label
        let radiusLabel = document.createElement("label");
        radiusLabel.setAttribute("for", "radius");
        radiusLabel.setAttribute("class", "lblSelect");
        radiusLabel.innerHTML = "Raio:";
        container.appendChild(radiusLabel);

        let radius = document.createElement("select");
        radius.setAttribute("id", "radius");
        container.appendChild(radius);

        this.radius.map( function(option) {
            let radiusOption = document.createElement("option");
            radiusOption.setAttribute("value", option);
            radiusOption.text = option;
            radius.add(radiusOption);
        });

        // add brand select + label
        let brandLabel = document.createElement("label");
        brandLabel.setAttribute("for", "brand");
        brandLabel.setAttribute("class", "lblSelect");
        brandLabel.innerHTML = "Marca:";
        container.appendChild(brandLabel);

        let brand = document.createElement("select");
        brand.setAttribute("id", "brand");
        brand.disabled = true;
        container.appendChild(brand);

        let brandOption = document.createElement("option");
        brandOption.setAttribute("value", "");
        brandOption.text = "Todas";
        brand.add(brandOption);

        // add model select + label
        let modelLabel = document.createElement("label");
        modelLabel.setAttribute("for", "model");
        modelLabel.setAttribute("class", "lblSelect");
        modelLabel.innerHTML = "Modelo:";
        container.appendChild(modelLabel);

        let model = document.createElement("select");
        model.setAttribute("id", "model");
        model.disabled = true;
        container.appendChild(model);

        let modelOption = document.createElement("option");
        modelOption.setAttribute("value", "");
        modelOption.text = "Todos";
        model.add(modelOption);

        // add year select + label
        let yearLabel = document.createElement("label");
        yearLabel.setAttribute("for", "year");
        yearLabel.setAttribute("class", "lblSelect");
        yearLabel.innerHTML = "Ano Desejado:";
        container.appendChild(yearLabel);

        let year = document.createElement("select");
        year.setAttribute("id", "year");
        container.appendChild(year);

        // add price select + label
        let priceLabel = document.createElement("label");
        priceLabel.setAttribute("for", "price");
        priceLabel.setAttribute("class", "lblSelect");
        priceLabel.innerHTML = "Faixa de Preço:";
        container.appendChild(priceLabel);

        let price = document.createElement("select");
        price.setAttribute("id", "price");
        container.appendChild(price);

        // add version select + label
        let versionLabel = document.createElement("label");
        versionLabel.setAttribute("for", "version");
        versionLabel.setAttribute("class", "lblSelect");
        versionLabel.innerHTML = "Versão:";
        container.appendChild(versionLabel);

        let version = document.createElement("select");
        version.setAttribute("id", "version");
        version.disabled = true;
        container.appendChild(version);

        let versionOption = document.createElement("option");
        versionOption.setAttribute("value", "");
        versionOption.text = "Todas";
        version.add(versionOption);

        // add advanced search button
        let btnAdvanced = document.createElement("button");
        btnAdvanced.setAttribute("id", "btnAdvanced");
        btnAdvanced.innerHTML = "busca avançada";
        container.appendChild(btnAdvanced);

        // add reset button
        let btnReset = document.createElement("button");
        btnReset.setAttribute("id", "btnReset");
        btnReset.innerHTML = "limpar filtros";
        container.appendChild(btnReset);

        // add search button
        let btnSearch = document.createElement("button");
        btnSearch.setAttribute("id", "btnSearch");
        btnSearch.innerHTML = "ver ofertas";
        container.appendChild(btnSearch);
    },
    resetOptions: function(object) {
        if (object && typeof object == "object" && object.length > 1) {
            object.disabled = true;
            for (var i = object.length - 1; i >= 0; i--) {
                if (i > 0) {
                    object.remove(i);
                }
            }
        }
    }
}

app.nav = {
    /*
    * Navigation rules
    */
    init: function() {
        // selects
        let brand = document.getElementById("brand");
        let model = document.getElementById("model");
        let version = document.getElementById("version");

        // brand listener
        brand.addEventListener("change", function(event) {
            // clear options
            app.build.resetOptions(model);
            if (event.target.value != "") {
                // fill with models from API
                app.api.request(model, "model", event.target.value);
            }
        } );

        // model listener
        model.addEventListener("change", function(event) {
            // clear options
            app.build.resetOptions(version);
            if (event.target.value != "") {
                // fill with models from API
                app.api.request(version, "version", event.target.value);
            }
        } );
    }
}

app.api = {
    /*
    * API handling
    */
    request: function(object, endpoint, param) {
        if (object && typeof object == "object" && endpoint) {
            let url = "http://desafioonline.webmotors.com.br/api/OnlineChallenge/";
            switch(endpoint) {
                case "make":
                    this.get(object, url + endpoint);
                break;
                case "model":
                    if (param) {
                        this.get(object, url + endpoint +  "?MakeID=" + param);
                    } else {
                        this.error("Parâmetro necessário");
                    }
                break;
                case "version":
                    if (param) {
                        this.get(object, url + endpoint +  "?ModelID=" + param);
                    } else {
                        this.error("Parâmetro necessário");
                    }
                break;
                default:
                    this.error("Endpoint indisponível");
            }
        } else {
            this.error("Erro na requisição");
        }
    },
    get: function(object, url) {
        if (object && typeof object == "object" && url) {
            let xhr = new XMLHttpRequest();
            xhr.open("GET", url, true);
            xhr.onload = function(e) {
                let response = JSON.parse(xhr.responseText);
                // fill with response
                response.map( function(option) {
                    let selectOption = document.createElement("option");
                    selectOption.setAttribute("value", option.ID);
                    selectOption.text = option.Name;
                    object.add(selectOption);
                });
                object.disabled = false;
                // set focus
                object.focus();

            };
            xhr.onerror = function(e) {
                app.api.error("Erro na requisição");
            };
            xhr.send();
        } else {
            this.error("Erro na requisição");
        }
    },
    error: function(message) {
        // could be a modal message
        console.log("error: " + message);
    }
}

window.addEventListener("load", app.init());
