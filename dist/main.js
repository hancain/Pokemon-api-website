"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
/*
    Constants and declarations
*/
//as of today, there are 898 pokemon in the dex
var DEXMAX = 898;
//input/output and button declarations
var theInput;
var theButton1;
var theButton2;
var tableBody;
//select associated HTML items
tableBody = document.querySelector("#progOutput table > tbody");
theInput = document.querySelector("#inputData > input[type=text]");
theButton1 = document.querySelector("#btn1");
theButton2 = document.querySelector("#btn2");
/*
    Inputs
*/
//types dynamically declaring checkboxes
var typeList = [
    { id: 1, name: "normal" },
    { id: 2, name: "fighting" },
    { id: 3, name: "flying" },
    { id: 4, name: "poison" },
    { id: 5, name: "ground" },
    { id: 6, name: "rock" },
    { id: 7, name: "bug" },
    { id: 8, name: "ghost" },
    { id: 9, name: "steel" },
    { id: 10, name: "fire" },
    { id: 11, name: "water" },
    { id: 12, name: "grass" },
    { id: 13, name: "electric" },
    { id: 14, name: "psychic" },
    { id: 15, name: "ice" },
    { id: 16, name: "dragon" },
    { id: 17, name: "dark" },
    { id: 18, name: "fairy" },
];
//create checkboxes dynamically
var checkBoxes = document.getElementById("check_div");
for (var i = 0; i < typeList.length; i++) {
    //create elements
    var clickLabel = document.createElement("label");
    var clickBox = document.createElement("input");
    var clickBr = document.createElement("br");
    //assign data and values
    clickBox.type = "checkbox";
    clickBox.id = "type " + typeList[i].id;
    clickBox.value = typeList[i].name;
    clickBox.name = "type";
    clickLabel.htmlFor = "" + typeList[i].id;
    //append to HTML
    clickLabel.appendChild(document.createTextNode(typeList[i].name));
    checkBoxes === null || checkBoxes === void 0 ? void 0 : checkBoxes.appendChild(clickBox);
    checkBoxes === null || checkBoxes === void 0 ? void 0 : checkBoxes.appendChild(clickLabel);
    checkBoxes === null || checkBoxes === void 0 ? void 0 : checkBoxes.appendChild(clickBr);
}
/*
    Data retrieval functions
*/
//retrieve pokemon by type data
var typeArray = [];
//loops through given urls to retrieve type data
function makeRequestsType(URLs) {
    var index = 0;
    function request() {
        //axios request, makes array of typePokemon
        return (axios_1["default"]
            .get(URLs[index])
            .then(function (typeData) {
            for (var t = 0; t < typeData.data.pokemon.length; t++) {
                var typeItem = {
                    type: typeData.data.name,
                    pokemonName: typeData.data.pokemon[t].pokemon.name,
                    pokemonUrl: typeData.data.pokemon[t].pokemon.url
                };
                typeArray.push(typeItem);
                //uses pokemon url to make individual pokemon call
                makeRequestsPokemon(typeItem);
            }
        })["catch"](function (error) { return window.alert("Could not retrieve type"); })
            //loops until end of URL list
            .then(function () {
            index++;
            if (index >= URLs.length) {
                return "done";
            }
            return request();
        }));
    }
    return request();
}
//retrieve individual pokemon data
var pokeArray = [];
//retrieves 1 pokemon's data and makes a table row
function makeRequestsPokemon(typeItem) {
    //axios request, makes array of pokemon and table
    axios_1["default"]
        .get(typeItem.pokemonUrl)
        .then(function (pokeData) {
        var pokeItem = {
            name: pokeData.data.name,
            dexNum: pokeData.data.id,
            type: [""],
            sprite: pokeData.data.sprites.front_default
        };
        //some pokemon have more than 1 type, account for that occurrence
        pokeItem.type[0] = pokeData.data.types[0].type.name;
        if (pokeData.data.types.length > 1) {
            pokeItem.type[1] = pokeData.data.types[1].type.name;
        }
        //to avoid going over dex max (mega evolution exception)
        if (pokeData.data.id < DEXMAX + 1) {
            var place = pokeData.data.id;
            pokeArray[place] = pokeItem;
        }
        return pokeItem;
    })["catch"](function (error) {
        window.alert("Could not retrieve pokemon");
        var spriteItemErr = {
            url: "http://assets.stickpng.com/images/5a461418d099a2ad03f9c999.png"
        };
        var pokeItemErr = {
            name: "",
            dexNum: -1,
            type: [""],
            sprite: spriteItemErr
        };
    })
        //makes table using individual pokemon
        .then(function (p) {
        //make sure not over 898 and does not already exist in table (2 type occurrence)
        if (p.dexNum < DEXMAX + 1 && p.dexNum !== -1) {
            if (!document.body.contains(document.getElementById(p.name))) {
                makeRow(p);
            }
        }
    })["catch"](function (error) { return window.alert("Could not make row"); });
}
//makes a table row containing pokemon data
function makeRow(anItem) {
    //make row
    var tabRow = document.createElement("tr");
    tabRow.setAttribute("id", anItem === null || anItem === void 0 ? void 0 : anItem.name);
    tableBody === null || tableBody === void 0 ? void 0 : tableBody.appendChild(tabRow);
    //make image cell
    var tabCol1 = document.createElement("td");
    var pokeImage = document.createElement("img");
    pokeImage.setAttribute("src", anItem === null || anItem === void 0 ? void 0 : anItem.sprite);
    tabCol1.appendChild(pokeImage);
    tabRow.appendChild(tabCol1);
    //make name cell
    var tabCol2 = document.createElement("td");
    tabCol2.appendChild(document.createTextNode(anItem === null || anItem === void 0 ? void 0 : anItem.name));
    tabRow.appendChild(tabCol2);
    //make dex number cell
    var tabCol3 = document.createElement("td");
    tabCol3.appendChild(document.createTextNode("" + (anItem === null || anItem === void 0 ? void 0 : anItem.dexNum)));
    tabCol3.setAttribute("style", "text-align:center");
    tabRow.appendChild(tabCol3);
    //make type call
    var tabCol4 = document.createElement("td");
    tabCol4.appendChild(document.createTextNode(anItem === null || anItem === void 0 ? void 0 : anItem.type[0]));
    //account for multiple type occurrence
    if ((anItem === null || anItem === void 0 ? void 0 : anItem.type.length) > 1) {
        tabCol4.appendChild(document.createTextNode(", " + (anItem === null || anItem === void 0 ? void 0 : anItem.type[1])));
    }
    tabRow.appendChild(tabCol4);
}
/*
    Event handlers
*/
//button1 (checkbox - Go!) listener
theButton1 === null || theButton1 === void 0 ? void 0 : theButton1.addEventListener("click", function () {
    //get rid of old rows
    var oldRows;
    oldRows = tableBody === null || tableBody === void 0 ? void 0 : tableBody.querySelectorAll("tr");
    if (oldRows) {
        for (var k = 0; k < (oldRows === null || oldRows === void 0 ? void 0 : oldRows.length); k++) {
            var oldOne = oldRows[k];
            tableBody === null || tableBody === void 0 ? void 0 : tableBody.removeChild(oldOne);
        }
        typeArray = [];
        pokeArray = [];
    }
    //see which boxes are checked
    var checkboxes = [];
    var checkedList = [];
    for (var i = 1; i <= 18; i++) {
        checkboxes[i] = document.getElementById("type " + i);
        if (checkboxes[i] && checkboxes[i].checked) {
            checkedList.push(checkboxes[i].value);
        }
    }
    //if nothing is checked, apply for all types
    if (checkedList.length == 0) {
        for (var i = 0; i < 18; i++) {
            checkedList.push(typeList[i].name);
        }
    }
    //make the urls for type searching
    var pokeURLs = [];
    for (var i = 0; i < checkedList.length; i++) {
        pokeURLs[i] = "https://pokeapi.co/api/v2/type/" + checkedList[i] + "/";
    }
    //call by type
    makeRequestsType(pokeURLs);
});
//button2 (search - Go!) listener
theButton2 === null || theButton2 === void 0 ? void 0 : theButton2.addEventListener("click", function () {
    //get rid of old rows
    var oldRows;
    oldRows = tableBody === null || tableBody === void 0 ? void 0 : tableBody.querySelectorAll("tr");
    if (oldRows) {
        for (var k = 0; k < (oldRows === null || oldRows === void 0 ? void 0 : oldRows.length); k++) {
            var oldOne = oldRows[k];
            tableBody === null || tableBody === void 0 ? void 0 : tableBody.removeChild(oldOne);
        }
        pokeArray = [];
    }
    //convert input to numerical, integer value
    var dexNum = Number(theInput === null || theInput === void 0 ? void 0 : theInput.value);
    //if not a number, default 1
    if (isNaN(dexNum)) {
        dexNum = 1;
        window.alert("That's not a valid number... searching for dex #1");
    }
    //if a decimal, default to whole number (round)
    else if (!(dexNum % 1 === 0)) {
        dexNum = Math.floor(dexNum / 1);
        window.alert("Dex numbers are whole numbers... trying to search for #" + dexNum);
    }
    //if over max, default to max
    if (dexNum > DEXMAX) {
        dexNum = DEXMAX;
        window.alert("Too high! Searching for current max dex entry...");
    }
    //if under 1, default to 1
    else if (dexNum < 1) {
        dexNum = 1;
        window.alert("Most people start counting at 1! searching for dex #1...");
    }
    //create URL for individual pokemon search
    var aPoke = {
        type: "",
        pokemonName: "",
        pokemonUrl: "https://pokeapi.co/api/v2/pokemon/" + dexNum + "/"
    };
    //call by pokemon
    makeRequestsPokemon(aPoke);
});
