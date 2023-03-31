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

const apiFunction = async () => {
    try {
        const result = await fetch("https://inshorts.deta.dev/news?category=all");
        const json = await result.json();
        const data = json.data;
        data.forEach(item => {
            const div = document.createElement("div");
            div.className = "carousel-item";
            div.innerHTML = `
            <div class="card" style="background: rgb(207,91,120); background: linear-gradient(90deg, rgba(207,91,120,1) 0%, rgba(218,207,82,1) 50%, rgba(252,176,69,1) 100%);">
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

let news = document.getElementById("news");
apiFunction();



