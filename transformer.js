/* DICTIONARY CODER-DECODER */

class DictionaryCoder {

    constructor(dictionary) {
        this.dictionary = dictionary;
    }

    swapDictionary(){
        let swapped = {};
        for(let key in this.dictionary){
            swapped[this.dictionary[key]] = key;
        }
        return swapped;
    }

    transform(message, operation) {
        let transformedMessage = "";
        let usedDictionary;
        if(operation === "codificar") {
            console.log("El mensaje sera codificado");
            usedDictionary = this.dictionary;
        }
        else {
            console.log("El mensaje sera decodificado");
            usedDictionary = this.swapDictionary(this.dictionary);
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
}

/* REVERSE FUNCTION */

function reverseMessage(message) {
    console.log("El mensaje sera invertido");
    let splitMessage = message.split("");
    let reverseArray = splitMessage.reverse();
    let reversedMessage = reverseArray.join("");
    return reversedMessage;
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

let operation = prompt("¿Quieres codificar o decodificar un mensaje?");
let message = prompt(`Introduce el texto que quieras ${operation}...`);
let method = prompt("¿Que método de codificacion quieres usar, de vocales o general?");
let coder;
let newMessage;
switch(method) {
    case "vocales":
        coder = new DictionaryCoder(vocalDictionary);
        newMessage = coder.transform(message, operation);
        alert(`Este es tu mensaje: ${newMessage}`);
        break;
    case "general":
        coder = new DictionaryCoder(generalDictionary);
        newMessage = coder.transform(message, operation);
        alert(`Este es tu mensaje: ${newMessage}`);
        break;
    default: 
        newMessage = reverseMessage(message);
        alert(`Este es tu mensaje: ${newMessage}`);
        break;
}