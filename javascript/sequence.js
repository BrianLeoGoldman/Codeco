import { process } from './functions.js';
import { addUserData, save } from './storage.js';

let sequenceBeat = new Audio('../sounds/padlock.wav');
let failureBeat = new Audio('../sounds/failed-operation.wav');
let add = document.getElementById("add");

add.addEventListener("click", () => {
    let cards = document.getElementById("cards");
    let newCard = document.createElement("div");
    newCard.className = "card added-card";
    newCard.innerHTML = `
        <div class="dropdowns">
            <div class="dropdown">
                <label class="label" for="operation">OPERATION</label>
                <select id="added-operation" class="select">
                    <option value="none">None</option>
                    <option value="encode">Encode</option>
                    <option value="decode">Decode</option>
                </select>
            </div>

            <div class="dropdown">
                <label class="label" for="method">METHOD</label>
                <select id="added-method" class="select">
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
        failureBeat.play();
        Swal.fire({
            title: `Operation failed`, 
            text: `Information missing: please enter a message`, 
            icon: "warning",
            confirmButtonText: "OK",
        });
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
        failureBeat.play();
        Swal.fire({
            title: `Operation failed`, 
            text: `Information missing: please choose operation and method`, 
            icon: "warning",
            confirmButtonText: "OK",
        });
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
            sequenceBeat.play();
            setTimeout(() => {
                sequenceBeat.play();
            }, 500);
            Swal.fire({
            title: `Sequence completed!`, 
            text: `All operations were performed with no issues`, 
            icon: "success",
            confirmButtonText: "OK",
            });
        }
        catch(error) {
            failureBeat.play();
            Swal.fire({
                title: `Operation failed`, 
                text: `${error}`, 
                icon: "warning",
                confirmButtonText: "OK",
            });
        }
    }
});