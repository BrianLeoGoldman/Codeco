import { get } from './storage.js';

function fillUserPanel(user, userInfo) { 
    userInfo.innerHTML = `
    <div class="user-bio">
        <div class="user-names">
            <h4>Firstname: ${user.firstname}</h4>
            <h4>Lastname: ${user.lastname}</h4>
        </div>
        <h4 class="date">Registered: ${user.register}</h4>
    </div>
    `
    return userInfo
}

function fillMessagePanel(user, messageInfo) { 
    let htmlString = ``
    htmlString = htmlString + `
    <div class="all-messages">
        <div class="encoded-messages">
            <h4>Encoded messages</h4>
    `;
    user.encodedMessages.forEach(item => {
        htmlString = htmlString + `<div class="card"><div class="card-body">`;
        htmlString = htmlString + `<p><b>Method</b>: ${item.method}</p>`;
        htmlString = htmlString + `<p><b>Original</b>: ${item.input}</p>`;
        htmlString = htmlString + `<p><b>Encoded</b>: ${item.output}</p>`;
        htmlString = htmlString + `<p><b>Date</b>: ${item.date}</p>`;
        htmlString = htmlString + `</div></div>`;
    })
    htmlString = htmlString + `
        </div>
        <div class="decoded-messages">
            <h4>Decoded messages</h4>
    `;
    user.decodedMessages.forEach(item => {
        htmlString = htmlString + `<div class="card"><div class="card-body">`;
        htmlString = htmlString + `<p><b>Method</b>: ${item.method}</p>`;
        htmlString = htmlString + `<p><b>Original</b>: ${item.input}</p>`;
        htmlString = htmlString + `<p><b>Decoded</b>: ${item.output}</p>`;
        htmlString = htmlString + `<p><b>Date</b>: ${item.date}</p>`;
        htmlString = htmlString + `</div></div>`;
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
    <h4 class="information">There is no registered user</h4>
    <h4 class="information">Please go to Register page to register your data</h4>
    `
    userPanel.innerText = "";
    userPanel.append(userInfo);
    messageInfo.innerHTML = `<h4 class="information">There are no encoded or decoded messages</h4>`
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
