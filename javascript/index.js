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

function save(key, value) {
    localStorage.setItem(key, value);
}

function get(key) {
    return localStorage.getItem(key);
}

let register = document.getElementById("register");

register.addEventListener("click", () => {
    let firstname = document.getElementById("firstname");
    let lastname = document.getElementById("lastname");

    if(get(firstname.value + lastname.value)) {
        alert(`Lo lamentamos ${firstname.value}, pero ya te has registrado`);
    }
    else {
        let newUser = createUser(firstname.value, lastname.value);
        save(firstname.value + lastname.value, JSON.stringify(newUser));
    
        let success = document.getElementById("register-success");
        let message = document.createElement("div");
        message.innerHTML = `
        <h4>¡Hola ${firstname.value} ${lastname.value}!</h3>
        <h4>¡Te has registrado exitosamente!</h3>
        `
        success.innerText = "";
        success.append(message);
    }
});



/*



productos.forEach(item => {
    guardar(item.id, JSON.stringify(item));
})

localStorage.setItem("carrito", JSON.stringify(productos));

let usuario;
let usuarioStorage = sessionStorage.getItem("usuario");

if (usuarioStorage) {
    usuario = usuarioStorage;
    alert(`Bienvenido nuevamente ${usuario}!`);
} else {
    usuario = prompt("Ingrese el usuario");
    alert(`Hola ${usuario}! Es tu primera vez`);
    sessionStorage.setItem("usuario", usuario);
}

let carrito = [];
let carritoStorage = localStorage.getItem("carrito");

if (carritoStorage) {
    carrito = JSON.parse(carritoStorage);
} else {
    let div = document.createElement("div");
    div.innerHTML = "El carrito esta vacio";
    document.body.append(div);
}

*/