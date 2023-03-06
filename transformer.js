/* DICTIONARIES */

const vocalDictionary = {
    "a": 1, "e": 2, "i": 3, "o": 4, "u": 5
}

const positionShiftDictionary = {
    "a": "q", "b": "r", "c": "s", "d": "t", "e": "u", "f": "v", "g": "w", "h": "x", "i": "y", "j": "z", "k": "a", "l": "b", "m": "c",
    "n": "d", "o": "e", "p": "f", "q": "g", "r": "h", "s": "i", "t": "j", "u": "k", "v": "l", "w": "m", "x": "n",
    "y": "o", "z": "p", " ": "$"
}

/* ARRAYS */

const initialSequence = [
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

function createMessageList() {
    let list = [];
    let active = "si";
    while(active === "si") {
        message = prompt("Ingrese el mensaje a procesar...");
        list.push(message);
        active = prompt("¿Desea ingresar otro mensaje?");
        active = active.toLowerCase();
    }
    console.log(`createMessageList: ${list}`);
    return list;
}

function createOperation(index) {  
    let operation = prompt("Ingrese si la operacion sera codificar o decodificar");
    let method = prompt("Ingrese el método de codificacion: vocales, posicion o reversion");
    let messages = createMessageList();
    let element = {
        id: index,
        operation: operation,
        method: method,
        messages: messages
    };
    console.log(`createOperation: \nId: ${element.id} \nOperacion: ${element.operation} \nMétodo: ${element.method} \nMensajes: ${element.messages}`);
    return element;
}

function createSequence() {
    let sequence = [];
    let active = "si";
    while(active === "si") {
        alert("Ingrese los datos de la operacion a realizar");
        sequence.push(createOperation(sequence.length + 1));
        view = prompt("¿Desea ver la sequencia hasta el momento?");
        if(view === "si") {
            sequence.map(x => alert(`Id: ${x.id} \nOperacion: ${x.operation} \nMétodo: ${x.method} \nMensajes: ${x.messages}`));
        }
        active = prompt("¿Desea agregar otra operacion a la secuencia?");
        active = active.toLowerCase();
    }
    let remove = prompt("¿Desea eliminar alguna operacion de la secuencia?");
    if(remove === "si") {
        let toBeRemoved = parseInt(prompt("Ingrese el id de la operacion a ser eliminada"));
        const found = sequence.find(element => element.id == toBeRemoved);
        const index = sequence.indexOf(found);
        sequence.splice(index, 1);
    }
    console.log(`createSequence: ${sequence.flatMap(x => `\nId: ${x.id} \nOperacion: ${x.operation} \nMétodo: ${x.method} \nMensajes: ${x.messages}`)}`);
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
                case "posicion":
                    newMessage = transform(messageList.shift(), operation, positionShiftDictionary);
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

function createMethodsList() {
    let methods = ["Método de reversion: invierte las posiciones de los caracteres que forman el mensaje",
                   "Método de vocales: reemplaza las vocales del texto por números",
                   "Método de posicion: desplaza las letras por otras letras cambiando la posicion en el alfabeto",
                   "Método personalizado: permite al usuario crear su propio diccionario de caracteres para reemplazar"];
    return methods
}

/* MESSAGE PROCESSING */

let bienvenida = "¡Bienvenido a CoDeCo, un sitio para codificar y decodificar textos!";
alert(bienvenida);
let active = "si";
while(active === "si") {
    let choice = parseInt(prompt("¿Que desea hacer? \n1) Codificar o decodificar un mensaje \n2) Programar una sequencia de codificaciones \n3) Conocer más sobre los métodos de codificación"));
    switch(choice) {
        case 1:
            let operation = prompt("¿Quieres codificar o decodificar un mensaje?");
            let method = prompt("¿Que método de codificacion quieres usar: vocales, general, reversion o personalizado?");
            let messageList = createMessageList()
            process(operation, method, messageList);
            break;
        case 2:
            let sequence = createSequence();
            sequence.forEach(element => {
                process(element.operation, element.method, element.messages);
            });
            break;
        case 3:
            let methodList = createMethodsList();
            methodList.map(x => alert(x));
            break;
        default: 
            alert(`La opcion ${choice} no es valida`);
            break;
    }
    active = prompt("¿Desea realizar otra operacion?");
    active = active.toLowerCase();
}

