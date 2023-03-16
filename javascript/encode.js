import { process } from './functions.js';
import { addUserData } from './storage.js';

let encode = document.getElementById("encode");

encode.addEventListener("click", () => {
    let method = document.getElementById("method").value;
    console.log(method);
    let message = document.getElementById("message").value;
    console.log(message);
    let encodedMessage = process("codificar", method, [message]);
    console.log(encodedMessage);

    let result = document.getElementById("result");
    if(encodedMessage === undefined) {
        result.innerHTML = ``;
    }
    else {
        result.innerHTML = `${encodedMessage}`;
        addUserData("encode", message, encodedMessage)

    }
    
});
