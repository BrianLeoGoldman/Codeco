import { save, get } from './storage.js';

function createUser(firstname, lastname) {
    let user = {
        firstname: firstname,
        lastname: lastname,
        register: new Date().toDateString(),
        encodedMessages: [],
        decodedMessages: []
    }
    return user
}

let register = document.getElementById("register");

register.addEventListener("click", () => {
    let firstname = document.getElementById("firstname");
    let lastname = document.getElementById("lastname");

    if(get(firstname.value + lastname.value)) {
        alert(`Sorry ${firstname.value}, you are registered already`);
        save("user", firstname.value + lastname.value);
    }
    else {
        let newUser = createUser(firstname.value, lastname.value);
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
    }
});
