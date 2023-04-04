import { process } from './functions.js';
import { addUserData } from './storage.js';

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
            let padlock = document.getElementById("padlock");
            padlock.classList.add("animation");
            result.innerHTML = `${encodedMessage}`;
            addUserData("encode", method, message, encodedMessage);
            setTimeout(() => {
                padlock.classList.remove("animation");
            }, 3000);
            
        }
    }
    catch(error) {
        Swal.fire({
            title: `Encoding failed`, 
            text: `${error}`, 
            icon: "warning",
            confirmButtonText: "Ok",
        });
    }
});
