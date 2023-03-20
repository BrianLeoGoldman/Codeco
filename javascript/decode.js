import { process } from './functions.js';
import { addUserData } from './storage.js';

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
            addUserData("decode", method, message, decodedMessage)
        }
    }
    catch(error) {
        let modal = document.getElementById("modal-body");
        modal.innerHTML = error;
        $('#errorModal').modal('show');
    }
});
