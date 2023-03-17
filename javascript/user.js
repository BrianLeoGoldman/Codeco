import { get } from './storage.js';

function fillUserPanel(user, userInfo) { 
    userInfo.innerHTML = `
    <h4>Nombre: ${user.firstname}</h4>
    <h4>Apellido: ${user.lastname}</h4>
    <h4>Registrado: ${user.register}</h4>
    `
    userInfo.innerHTML = userInfo.innerHTML + `<h4>Mensajes codificados:</h4>`;
    /* userInfo.innerHTML = userInfo.innerHTML + `<ul>`; */
    user.encodedMessages.forEach(item => {
        userInfo.innerHTML = userInfo.innerHTML + `<h5>${item}</h5>`;
    })
    /* userInfo.innerHTML = userInfo.innerHTML + `</ul>`; */
    userInfo.innerHTML = userInfo.innerHTML + `<h4>Mensajes decodificados:</h4>`;
    user.decodedMessages.forEach(item => {
        userInfo.innerHTML = userInfo.innerHTML + `<h5>${item}</h5>`;
    })
    return userInfo
}


let currentUser = get("user");
let panel = document.getElementById("user-panel");
let userInfo = document.createElement("div");

if(currentUser === null) {
    userInfo.innerHTML = `
    <h4>No hay ningun usuario registrado</h4>
    <h4>Prueba registrarte en la página de Inicio</h3>
    `
    panel.innerText = "";
    panel.append(userInfo);
}
else {
    let user = get(currentUser);
    let userHtml = fillUserPanel(user, userInfo);
    panel.innerText = "";
    panel.append(userHtml);
}
