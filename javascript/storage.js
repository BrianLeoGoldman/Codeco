export function save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function get(key) {
    return JSON.parse(localStorage.getItem(key));
}

export function addUserData(operation, inputMessage, outputMessage) {
    let currentUser = get("user");
    let userData = get(currentUser);
    if(operation === "encode") {
        userData.encodedMessages.push(inputMessage);
        save(currentUser, userData);
    }
    if(operation === "decode") {
        userData.decodedMessages.push(inputMessage);
        save(currentUser, userData);
    }
}

/*
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