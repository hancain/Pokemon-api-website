import axios, {AxiosResponse} from "axios";

let theInput: HTMLInputElement | null;
let theButton: HTMLButtonElement | null;
theInput = document.querySelector("#inputData > input[type=text]");
theButton = document.querySelector("#inputData > button");
let tableBody: HTMLTableSectionElement | null;
tableBody = document.querySelector("#progOutput table > tbody");

interface pokeSprite {
    url: string
};

interface typePokemon {
    type: string,
    pokemonName:string
    pokemonUrl: string  
};

interface fullPokemon{
    name: string,
    dexNum: number,
    type: string,
    sprite: pokeSprite
}

const typeList = [
    {id: 1, name: "normal"},
    {id: 2, name: "fighting"},
    {id: 3, name: "flying"},
    {id: 4, name: "poison"},
    {id: 5, name: "ground"},
    {id: 6, name: "rock"},
    {id: 7, name: "bug"},
    {id: 8, name: "ghost"},
    {id: 9, name: "steel"},
    {id: 10, name: "fire"},
    {id: 11, name: "water"},
    {id: 12, name: "grass"},
    {id: 13, name: "electric"},
    {id: 14, name: "psychic"},
    {id: 15, name: "ice"},
    {id: 16, name: "dragon"},
    {id: 17, name: "dark"},
    {id: 18, name: "fairy"}
];

//dynamic table
let checkBoxes = document.getElementById('check_div');
for(let i = 0; i < typeList.length; i++){
    var clickLabel = document.createElement("label");
    var clickBox = document.createElement("input");
    var clickBr = document.createElement("br");

    clickBox.type = "checkbox";
    clickBox.id = "type " + typeList[i].id;
    clickBox.value = typeList[i].name;
    clickBox.name = "type";
    clickLabel.htmlFor = "" + typeList[i].id;

    clickLabel.appendChild(document.createTextNode(typeList[i].name));
    checkBoxes?.appendChild(clickBox);
    checkBoxes?.appendChild(clickLabel);
    checkBoxes?.appendChild(clickBr);
}

theButton?.addEventListener("click", () => {
  let oldRows: NodeListOf<HTMLTableRowElement> | undefined;
    oldRows = tableBody?.querySelectorAll("tr");
    if (oldRows) {
        for (let k = 0; k < oldRows?.length; k++) {
            const oldOne = oldRows[k];
            tableBody?.removeChild(oldOne);
        }
    };

    var checkboxes = [] as any;
    var checkedList = [] as any;
    for (var i = 1; i <= 18; i++) {
        checkboxes[i] = document.getElementById('type '+ i);
        if(checkboxes[i] && checkboxes[i].checked){
            checkedList.push(checkboxes[i].value);
        }
    }

    var pokeArray = [] as any;
    const pokeURLs: string[] = [];
    for(var i = 0; i < checkedList.length; i++){
        pokeURLs[i] = "https://pokeapi.co/api/v2/type/" + checkedList[i] + "/";
    }

    /*for(var i = 0; i < pokeURLs.length; i++){
    axios
    .get(pokeURLs[i])
    .then((r: AxiosResponse) => r.data)
    .then((typeData: any) => {
        pokeArray.push(typeData.pokemon.map(
            (p: any): typePokemon => {
            return {
                type: typeData.name,
                pokemonName: p.pokemon.name,
                pokemonUrl: p.pokemon.url
            };
            }
        ));
        return pokeArray;
    })
    .then()
    }*/

    function makeRequestsType(URLs){
        let index = 0;
        function request(){
            return axios.get(URLs[index])
            .then(() => {
                console.log(index);
                index ++;
                if(index >= URLs.length){
                    return 'done';
                }
                return request();
            });
        }
        return request();
    }

    makeRequestsType(pokeURLs);
    console.log("hi");
});