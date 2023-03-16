/* DICTIONARIES */

const vocalDictionary = {
    "a": 1, "e": 2, "i": 3, "o": 4, "u": 5
}

const positionShiftDictionary = {
    "a": "q", "b": "r", "c": "s", "d": "t", "e": "u", "f": "v", "g": "w", "h": "x", "i": "y", "j": "z", "k": "a", "l": "b", "m": "c",
    "n": "d", "o": "e", "p": "f", "q": "g", "r": "h", "s": "i", "t": "j", "u": "k", "v": "l", "w": "m", "x": "n",
    "y": "o", "z": "p", " ": "$"
}

/* FUNCTIONS */

export function process(operation, method, messageList) {
    let newMessage;
    if(operation === "codificar" || operation === "decodificar") {
        while(messageList.length > 0) {
            switch(method) {
                case "vocales":
                    newMessage = transform(messageList.shift(), operation, vocalDictionary);
                    break;
                case "posicion":
                    newMessage = transform(messageList.shift(), operation, positionShiftDictionary);
                    break;
                case "reversion":
                    newMessage = reverseMessage(messageList.shift());
                    break;
                case "personalizado":
                    let customCoder = createCustomCoder();
                    newMessage = customCoder.encode(messageList.shift(), operation);
                    break;
                default: 
                    alert(`No se ha podido ${operation} el mensaje. Por favor seleccione un método válido`);
                    messageList.shift();
                    break;
            }
        }
    } 
    else {
        alert(`La operacion ${operation} no es valida`);
    }
    return newMessage
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
    console.log(transformedMessage);
    return transformedMessage;
} 

function reverseMessage(message) {
    console.log("El mensaje sera invertido");
    let splitMessage = message.split("");
    let reverseArray = splitMessage.reverse();
    let reversedMessage = reverseArray.join("");
    return reversedMessage;
}

function swapDictionary(dictionary){
    let swapped = {};
    for(let key in dictionary){
        swapped[dictionary[key]] = key;
    }
    return swapped;
}

function createCustomCoder() {
    let active = "si";
    let list = {};
    while(active) {
        let key = prompt("Introduzca el caracter a cambiar en el texto original:");
        let value = prompt("Introduzca el caracter por el que sera reemplazado en el texto codificado:");
        list[key] = value;
        active = prompt("¿Desea cambiar otro caracter?");
        active = active.toLowerCase();
    }
    return new CustomCoder(list);
}

/* CLASS */

class CustomCoder {
    constructor(list) {
        this.encodeDictionary = list;
        this.decodeDictionary = swapDictionary(list);
    }

    encode(message, operation) {
        let usedDictionary;
        let newMessage = "";
        if(operation === "codificar"){
            usedDictionary = this.encodeDictionary;
        }
        else {
            usedDictionary = this.decodeDictionary;
        }
        for (let c of message) {
            if(c in usedDictionary) {
                newMessage = newMessage + usedDictionary[c];
            }
            else {
                newMessage = newMessage + c;
            }
        }
        cosnole.log(newMessage);
        return newMessage
    }
}