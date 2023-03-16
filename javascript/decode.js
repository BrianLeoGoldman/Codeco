import { process } from './functions.js';

let decode = document.getElementById("decode");

decode.addEventListener("click", () => {
    let method = document.getElementById("method").value;
    console.log(method);
    let message = document.getElementById("message").value;
    console.log(message);
    let decodedMessage = process("decodificar", method, [message]);
    console.log(decodedMessage);

    let result = document.getElementById("result");
    if(decodedMessage === undefined) {
        result.innerHTML = ``;
    }
    else {
        result.innerHTML = `${decodedMessage}`;
    }
    
});
