import { process } from './functions.js';
import { addUserData } from './storage.js';

let encode = document.getElementById("encode");

encode.addEventListener("click", () => {
    let method = document.getElementById("method").value;
    let message = document.getElementById("message").value;
    let encodedMessage = process("encode", method, [message]);

    let result = document.getElementById("result");
    if(encodedMessage === undefined) {
        result.innerHTML = ``;
    }
    else {
        result.innerHTML = `${encodedMessage}`;
        addUserData("encode", method, message, encodedMessage)

    }
    
});
