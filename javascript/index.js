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

// TODO: check that firstname and lastanem is not empty
register.addEventListener("click", () => {
    let firstname = document.getElementById("firstname");
    let lastname = document.getElementById("lastname");

    if(get(firstname.value + lastname.value)) {
        save("user", firstname.value + lastname.value);
        Swal.fire({
            title: `Register failed`, 
            text: `Sorry ${firstname.value}, you are registered already`, 
            icon: "warning",
            confirmButtonText: "OK",
        });
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
        Swal.fire({
            title: `${firstname.value} ${lastname.value}`, 
            text: "You have been successfully registered!", 
            icon: "success",
            confirmButtonText: "OK",
        });
    }
});

const fetchNews = async () => {
    try {
        let news = document.getElementById("news");
        const result = await fetch("https://inshorts.deta.dev/news?category=all");
        const json = await result.json();
        const data = json.data;
        data.forEach(item => {
            const div = document.createElement("div");
            div.className = "carousel-item";
            div.innerHTML = `
            <div class="card">
                <div class="card-body" >
                    <a href="${item.url}"><h4 class="card-title">${item.title}</h4></a>
                    <p class="card-text">${item.content}</p>
                </div>
            </div>
            `;
            news.append(div); 
        });
    } catch(error) {
        console.log(error);
    }
}

fetchNews();

const test = async () => {
    const encodedParams = new URLSearchParams();
    encodedParams.append("source", "en");
    encodedParams.append("target", "es");
    encodedParams.append("q", "Hello, world!");

    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Accept-Encoding': 'application/gzip',
            'X-RapidAPI-Key': '294a9b42cdmsha20092a4c735133p186789jsnb5285f98aa78',
            'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
        },
        body: encodedParams
    };

    fetch('https://google-translate1.p.rapidapi.com/language/translate/v2', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
}

test()