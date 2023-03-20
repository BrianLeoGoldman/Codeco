import { process } from './functions.js';
import { addUserData, save } from './storage.js';

let add = document.getElementById("add");

add.addEventListener("click", () => {
    let cards = document.getElementById("cards");
    let newCard = document.createElement("div");
    newCard.className = "card added-card";
    newCard.innerHTML = `
        <div class="dropdowns">
            <div class="dropdown">
                <label class="operation-label" for="operation">Operation:</label>
                <select id="added-operation" class="operation-select">
                    <option value="none">None</option>
                    <option value="encode">Encode</option>
                    <option value="decode">Decode</option>
                </select>
            </div>

            <div class="dropdown">
                <label class="method-label" for="method">Method:</label>
                <select id="added-method" class="method-select">
                    <option value="none">None</option>
                    <option value="vocals">Vocals</option>
                    <option value="position">Position</option>
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
        let modal = document.getElementById("modal-body");
        modal.innerHTML = `Information missing: please enter a message`
        $('#errorModal').modal('show');
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
        let modal = document.getElementById("modal-body");
        modal.innerHTML = `Information missing: please choose operation and method`
        $('#errorModal').modal('show');
    }
    else {
        try {
            let messageToProcess = message;
            let processedMessage = "";
            sequence.forEach(step => {
                processedMessage = process(step.operation, step.method, [messageToProcess]);
                addUserData(step.operation, step.method, messageToProcess, processedMessage);
                messageToProcess = processedMessage;
            })
            let response = document.getElementById("sequence-response");
            let responseText = document.createElement("div");
            responseText.className = "";
            responseText.innerHTML = `<p>¡The sequence was successfully processed!</p>`;
            response.append(responseText);
        }
        catch(error) {
            let modal = document.getElementById("modal-body");
            modal.innerHTML = error;
            $('#errorModal').modal('show');
        }
    }
});