import { save, get } from './storage.js';

const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    return regex.test(email);
};

function createUser(firstname, lastname, email) {
    let user = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        register: new Date().toDateString(),
        encodedMessages: [],
        decodedMessages: []
    }
    return user
}

let successBeat = new Audio('../sounds/login.wav');
let failureBeat = new Audio('../sounds/failed-login.wav');
let register = document.getElementById("register");

register.addEventListener("click", () => {
    let firstname = document.getElementById("firstname");
    let lastname = document.getElementById("lastname");
    let email = document.getElementById("email");

    if (firstname.value === "" || lastname.value === "" || email.value === "" || !validateEmail(email.value)) {
        failureBeat.play();
        Swal.fire({
            title: `Register failed`, 
            text: `Please complete all the required data`, 
            icon: "warning",
            confirmButtonText: "Fill missing data",
        });
    }
    else {
        if(get(firstname.value + lastname.value)) {
            save("user", firstname.value + lastname.value);
            failureBeat.play();
            Swal.fire({
                title: `Register failed`, 
                text: `Sorry ${firstname.value}, you are registered already`, 
                icon: "warning",
                confirmButtonText: "OK",
            });
        }
        else {
            let newUser = createUser(firstname.value, lastname.value, email.value);
            save(firstname.value + lastname.value, newUser);
            save("user", firstname.value + lastname.value);
        
            let success = document.getElementById("register-success");
            let message = document.createElement("div");
            message.innerHTML = `
            <h4>¡Hello ${firstname.value} ${lastname.value}!</h4>
            <h4>¡You have been successfully registered!</h4>
            `
            success.innerText = "";
            success.append(message);
            successBeat.play();
            Swal.fire({
                title: `${firstname.value} ${lastname.value}`, 
                text: "You have been successfully registered!", 
                icon: "success",
                confirmButtonText: "OK",
            });
        }
    }
});