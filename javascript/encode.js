import { process } from './functions.js';
import { addUserData } from './storage.js';

function animate(image, animation, sound) {
    let padlock = document.getElementById(image);
    padlock.classList.add(animation);
    sound.play();
    setTimeout(() => {
        sound.play();
    }, 500);
    setTimeout(() => {
        padlock.classList.remove(animation);
    }, 1500);
}

let beat = new Audio('../sounds/padlock.wav');
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
            animate("padlock", "rotation", beat);
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
