import { process } from './functions.js';

let encode = document.getElementById("encode");

encode.addEventListener("click", () => {
    let method = document.getElementById("method").value;
    console.log(method);
    let message = document.getElementById("message").value;
    console.log(message);
    let encodedMessage = process("codificar", method, [message]);
    console.log(encodedMessage);

    let result = document.getElementById("result");
    console.log
    result.innerHTML = `${encodedMessage}`;
});
