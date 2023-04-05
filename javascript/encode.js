import { process, animate } from './functions.js';
import { addUserData } from './storage.js';

let padlockBeat = new Audio('../sounds/padlock.wav');
let failureBeat = new Audio('../sounds/failed-operation.wav');
let encode = document.getElementById("encode");

encode.addEventListener("click", () => {
    let method = document.getElementById("method").value;
    let message = document.getElementById("message").value;
    try {
        let encodedMessage = process("encode", method, [message]);
        let result = document.getElementById("result");
        if(encodedMessage === undefined) {
            result.innerHTML = ``;
        }
        else {
            result.innerHTML = `${encodedMessage}`;
            addUserData("encode", method, message, encodedMessage);
            animate("padlock", "rotation", padlockBeat);
        }
    }
    catch(error) {
        failureBeat.play();
        Swal.fire({
            title: `Encoding failed`, 
            text: `${error}`, 
            icon: "warning",
            confirmButtonText: "OK",
        });
    }
});
