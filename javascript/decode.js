import { process, animate } from './functions.js';
import { addUserData } from './storage.js';

let padlockBeat = new Audio('../sounds/padlock.wav');
let failureBeat = new Audio('../sounds/failed-operation.wav');
let decode = document.getElementById("decode");

decode.addEventListener("click", () => {
    let method = document.getElementById("method").value;
    let message = document.getElementById("message").value;
    try {
        let decodedMessage = process("decode", method, [message]);
        let result = document.getElementById("result");
        if(decodedMessage === undefined) {
            result.innerHTML = ``;
        }
        else {
            result.innerHTML = `${decodedMessage}`;
            addUserData("decode", method, message, decodedMessage);
            animate("padlock", "rotation", padlockBeat);
        }
    }
    catch(error) {
        failureBeat.play();
        Swal.fire({
            title: `Decoding failed`, 
            text: `${error}`, 
            icon: "warning",
            confirmButtonText: "OK",
        });
    }
});
