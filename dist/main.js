"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
var pokeURL = "https://pokeapi.co/api/v2/type/fairy";
axios_1["default"]
    .get(pokeURL)
    .then(function (r) { return r.data; })
    .then(function (fairytype) {
    console.log(fairytype.generation.name);
    console.log(fairytype.damage_relations.double_damage_from);
    for (var i = 0; i < fairytype.pokemon.length; i++) {
        if (fairytype.pokemon[i].pokemon.name == "togekiss") {
            console.log("togekiss is a fairy type");
        }
    }
});
