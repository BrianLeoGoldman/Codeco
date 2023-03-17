import { save, get } from './storage.js';

function createUser(firstname, lastname) {
    let user = {
        firstname: firstname,
        lastname: lastname,
        register: new Date(),
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
        alert(`Lo lamentamos ${firstname.value}, pero ya te has registrado`);
        save("user", firstname.value + lastname.value);
    }
    else {
        let newUser = createUser(firstname.value, lastname.value);
        save(firstname.value + lastname.value, newUser);
        save("user", firstname.value + lastname.value);
    
        let success = document.getElementById("register-success");
        let message = document.createElement("div");
        message.innerHTML = `
        <h4>¡Hola ${firstname.value} ${lastname.value}!</h4>
        <h4>¡Te has registrado exitosamente!</h4>
        `
        success.innerText = "";
        success.append(message);
    }
});
