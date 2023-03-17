import { process } from './functions.js';
import { addUserData } from './storage.js';

let add = document.getElementById("add");

add.addEventListener("click", () => {
    let cards = document.getElementById("cards");
    let newCard = document.createElement("div");
    newCard.className = "card added-card";
    newCard.innerHTML = `
        <div class="dropdowns">
            <div class="dropdown">
                <label class="operation-label" for="operation">Operación:</label>
                <select id="added-operation" class="operation-select">
                    <option value="none">Ninguna</option>
                    <option value="codificar">Codificar</option>
                    <option value="decodificar">Decodificar</option>
                </select>
            </div>

            <div class="dropdown">
                <label class="method-label" for="method">Método:</label>
                <select id="added-method" class="method-select">
                    <option value="none">Ninguno</option>
                    <option value="vocales">Vocales</option>
                    <option value="posicion">Posicion</option>
                    <option value="reversion">Reversion</option>
                </select>
            </div>
        </div>
    `
    cards.append(newCard);
});


let execute = document.getElementById("execute");

execute.addEventListener("click", () => {
    let message = document.getElementById("message").value;
    let operation = document.getElementById("operation").value;
    let method = document.getElementById("method").value;
    let first = {
        operation: operation,
        method: method
    };
    let sequence = [];
    sequence.push(first);
    if(message === "") {
        alert(`Por favor ingrese un mensaje`);
    }
    let addedCards = document.getElementsByClassName("added-card");
    for (let i = 0; i < addedCards.length; i++) {
        let addedCard = addedCards[i];
        let step = {
            operation: addedCard.querySelector("#added-operation").value,
            method: addedCard.querySelector("#added-method").value
        };
        sequence.push(step);
    }
    let emptyStep = false;
    sequence.forEach(step => {
        emptyStep = emptyStep || (step.operation === "none") || (step.method === "none");
    });
    if (emptyStep) {
        alert("Por favor complete todos los campos");
    }
});