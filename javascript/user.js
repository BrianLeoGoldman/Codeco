import { get } from './storage.js';

function fillUserPanel(user, userInfo) { 
    userInfo.innerHTML = `
    <div class="user-bio">
        <div class="user-names">
            <h4>Nombre: ${user.firstname}</h4>
            <h4>Apellido: ${user.lastname}</h4>
        </div>
        <h4 class="date">Registrado: ${user.register}</h4>
    </div>
    `
    return userInfo
}

function fillMessagePanel(user, messageInfo) { 
    let htmlString = ``
    htmlString = htmlString + `
    <div class="all-messages">
        <div class="encoded-messages">
            <h4>Mensajes codificados</h4>
    `;
    user.encodedMessages.forEach(item => {
        htmlString = htmlString + `<div class="message">`;
        htmlString = htmlString + `<p><b>Original</b>: ${item.input}</p>`;
        htmlString = htmlString + `<p><b>Codificado</b>: ${item.output}</p>`;
        htmlString = htmlString + `<p><b>Fecha</b>: ${item.date}</p>`;
        htmlString = htmlString + `</div>`;
    })
    htmlString = htmlString + `
        </div>
        <div class="decoded-messages">
            <h4>Mensajes decodificados</h4>
    `;
    user.decodedMessages.forEach(item => {
        htmlString = htmlString + `<div class="message">`;
        htmlString = htmlString + `<p><b>Codificado</b>: ${item.input}</p>`;
        htmlString = htmlString + `<p><b>Decodificado</b>: ${item.output}</p>`;
        htmlString = htmlString + `<p><b>Fecha</b>: ${item.date}</p>`;
        htmlString = htmlString + `</div>`;
    })
    htmlString = htmlString + `
        </div>
    </div>
    `
    messageInfo.innerHTML = htmlString;
    return messageInfo
}


let currentUser = get("user");
let userPanel = document.getElementById("user-panel");
let userInfo = document.createElement("div");
userInfo.className = "user-info";
let messagePanel = document.getElementById("message-panel");
let messageInfo = document.createElement("div");
messageInfo.className = "message-info";

if(currentUser === null) {
    userInfo.innerHTML = `
    <h4 class="information">No hay ningun usuario registrado</h4>
    <h4 class="information">Prueba registrarte en la página de Inicio</h4>
    `
    userPanel.innerText = "";
    userPanel.append(userInfo);
    messageInfo.innerHTML = `<h4 class="information">No hay mensajes codificados o decodificados</h4>`
    messagePanel.innerText = "";
    messagePanel.append(messageInfo);
}
else {
    let user = get(currentUser);
    let userHtml = fillUserPanel(user, userInfo);
    userPanel.innerText = "";
    userPanel.append(userHtml);
    let messageHtml = fillMessagePanel(user, messageInfo);
    messagePanel.innerText = "";
    messagePanel.append(messageHtml);
}
