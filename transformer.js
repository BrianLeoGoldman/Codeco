/* FUNCTIONS */

function swapDictionary(dictionary){
    let swapped = {};
    for(let key in dictionary){
        swapped[dictionary[key]] = key;
    }
    return swapped;
}

function reverseMessage(message) {
    console.log("El mensaje sera invertido");
    let splitMessage = message.split("");
    let reverseArray = splitMessage.reverse();
    let reversedMessage = reverseArray.join("");
    return reversedMessage;
}

function transform(message, operation, dictionary) {
    let transformedMessage = "";
    let usedDictionary;
    if(operation === "codificar") {
        console.log("El mensaje sera codificado");
        usedDictionary = dictionary;
    }
    if(operation === "decodificar") {
        console.log("El mensaje sera decodificado");
        usedDictionary = swapDictionary(dictionary);
    }
    for (let c of message) {
        if(c in usedDictionary) {
            transformedMessage = transformedMessage + usedDictionary[c];
        }
        else {
            transformedMessage = transformedMessage + c;
        }
    }
    return transformedMessage;
} 


/* DICTIONARIES */

const vocalDictionary = {
    "a": "z", "e": "y", "i": "x", "o": "w", "u": "v"
}

const generalDictionary = {
    "a": 1, "b": 2, "c": 3, "d": 4, "e": 5, "f": 6, "g": 7, "h": 8, "i": 9, "j": 0, "k": "a", "l": "b", "m": "c",
    "n": "d", "o": "e", "p": "f", "q": "g", "r": "h", "s": "i", "t": "j", "u": "k", "v": "l", "w": "m", "x": "n",
    "y": "o", "z": "p", " ": "$"
}

/* MESSAGE PROCESSING */

let bienvenida = "¡Bienvenido a CoDeCo, un sitio para codificar y decodificar mensajes!";
alert(bienvenida);

let active = "si";
while(active == "si") {
    let operation = prompt("¿Quieres codificar o decodificar un mensaje?");
    let message = prompt(`Introduce el texto que quieras ${operation}...`);
    let method = prompt("¿Que método de codificacion quieres usar: de vocales, general o reversion?");
    let newMessage;
    if(operation === "codificar" || operation === "decodificar") {
        switch(method) {
            case "vocales":
                newMessage = transform(message, operation, vocalDictionary);
                alert(`Este es tu mensaje: ${newMessage}`);
                break;
            case "general":
                newMessage = transform(message, operation, generalDictionary);
                alert(`Este es tu mensaje: ${newMessage}`);
                break;
            case "reversion":
                newMessage = reverseMessage(message);
                alert(`Este es tu mensaje: ${newMessage}`);
                break;
            default: 
                alert(`No se ha podido ${operation} el mensaje`);
                break;
        }
    } 
    else {
        alert(`La operacion ${operation} no es valida`);
    }
    active = prompt("¿Desea realizar otra codificacion?");
}