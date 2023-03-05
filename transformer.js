/* DICTIONARIES */

const vocalDictionary = {
    "a": "z", "e": "y", "i": "x", "o": "w", "u": "v"
}

const generalDictionary = {
    "a": 1, "b": 2, "c": 3, "d": 4, "e": 5, "f": 6, "g": 7, "h": 8, "i": 9, "j": 0, "k": "a", "l": "b", "m": "c",
    "n": "d", "o": "e", "p": "f", "q": "g", "r": "h", "s": "i", "t": "j", "u": "k", "v": "l", "w": "m", "x": "n",
    "y": "o", "z": "p", " ": "$"
}

/* ARRAYS */

const sequence = [
    {id: 1, operation: "codificar", method: "general", messages: ["La reunion es en la plaza"]},
    {id: 2, operation: "decodificar", method: "vocales", messages: ["La reunion es en la plaza"]},
    {id: 3, operation: "codificar", method: "reversion", messages: ["El blanco esta desaparecido", "No hay tiempo"]},
]

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
    console.log(transformedMessage);
    return transformedMessage;
} 

function createCustomCoder() {
    let creating = true;
    let list = {};
    while(creating) {
        let key = prompt("Introduzca el caracter a cambiar:");
        let value = prompt("Introduzca el caracter por el que sera reemplazado:");
        list[key] = value;
        let continuar = prompt("¿Desea cambiar otro caracter?");
        if(continuar !== "si") {
            creating = false;
        }
    }
    return new CustomCoder(list);
}

function createMessageList() {
    let list = [];
    let active = "si";
    while(active === "si") {
        message = prompt("Ingrese el mensaje a procesar...");
        list.push(message);
        active = prompt("¿Desea ingresar otro mensaje?");
    }
    console.log(list);
    return list;
}

function createOperation(index) {  
    let operation = prompt("Ingrese si la operacion sera codificar o decodificar");
    let method = prompt("Ingrese el método de codificacion: vocales, general o reversion");
    let messages = createMessageList();
    let element = {
        id: index,
        operation: operation,
        method: method,
        messages: messages
    };
    console.log(element);
    return element;
}

function createSequence() {
    let sequence = [];
    let active = "si";
    while(active === "si") {
        alert("Ingrese los datos de la operacion a realizar");
        sequence.push(createOperation(sequence.length + 1));
        active = prompt("¿Desea continuar?");
    }
    console.log(sequence);
    return sequence
}

function process(operation, method, messageList) {
    let newMessage;
    if(operation === "codificar" || operation === "decodificar") {
        while(messageList.length > 0) {
            switch(method) {
                case "vocales":
                    newMessage = transform(messageList.shift(), operation, vocalDictionary);
                    alert(`Este es tu mensaje: ${newMessage}`);
                    break;
                case "general":
                    newMessage = transform(messageList.shift(), operation, generalDictionary);
                    alert(`Este es tu mensaje: ${newMessage}`);
                    break;
                case "reversion":
                    newMessage = reverseMessage(messageList.shift());
                    alert(`Este es tu mensaje: ${newMessage}`);
                    break;
                case "personalizado":
                    let customCoder = createCustomCoder();
                    newMessage = customCoder.encode(messageList.shift(), operation);
                    alert(`Este es tu mensaje: ${newMessage}`);
                    break;
                default: 
                    alert(`No se ha podido ${operation} el mensaje`);
                    break;
            }
        }
    } 
    else {
        alert(`La operacion ${operation} no es valida`);
    }
}

/* MESSAGE PROCESSING */

let bienvenida = "¡Bienvenido a CoDeCo, un sitio para codificar y decodificar textos!";
alert(bienvenida);
let active = "si";
while(active == "si") {
    let choice = prompt("¿Desea realizar una o varias operaciones?");
    if (choice === 'una') {
        let operation = prompt("¿Quieres codificar o decodificar un mensaje?");
        let method = prompt("¿Que método de codificacion quieres usar: vocales, general, reversion o personalizado?");
        let messageList = createMessageList()
        process(operation, method, messageList);
    }
    else {
        let sequence = createSequence();
        sequence.forEach(element => {
            process(element.operation, element.method, element.messages);
        });
    }
    active = prompt("¿Desea realizar otra operacion?");
}

