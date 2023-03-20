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
    if(operation === "encode" || operation === "decode") {
        while(messageList.length > 0) {
            let messageToProcess = messageList.shift();
            if(messageToProcess !== "") {
                switch(method) {
                    case "vocals":
                        newMessage = transform(messageToProcess, operation, vocalDictionary);
                        break;
                    case "position":
                        newMessage = transform(messageToProcess, operation, positionShiftDictionary);
                        break;
                    case "reversion":
                        newMessage = reverseMessage(messageToProcess);
                        break;
                    case "custom":
                        let customCoder = createCustomCoder();
                        newMessage = customCoder.encode(messageToProcess, operation);
                        break;
                    default: 
                        throw `The operation ${operation} could not be performed. Please select a valid method`;
                        break;
                }
            }
            else {
                throw `Please enter a message`;
            }
        }
    } 
    else {
        throw `The operation ${operation} is not valid`;
    }
    return newMessage
}

function transform(message, operation, dictionary) {
    let transformedMessage = "";
    let usedDictionary;
    if(operation === "encode") {
        usedDictionary = dictionary;
    }
    if(operation === "decode") {
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

function reverseMessage(message) {
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

// NOT IN USE
function createCustomCoder() {
    let active = "si";
    let list = {};
    while(active) {
        let key = prompt("Enter the character to change in the original message:");
        let value = prompt("Enter the character to be replaced for in the encoded message:");
        list[key] = value;
        active = prompt("¿Do you want to chnage another character?");
        active = active.toLowerCase();
    }
    return new CustomCoder(list);
}

/* CLASS */

// NOT IN USE
class CustomCoder {
    constructor(list) {
        this.encodeDictionary = list;
        this.decodeDictionary = swapDictionary(list);
    }

    encode(message, operation) {
        let usedDictionary;
        let newMessage = "";
        if(operation === "encode"){
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
        return newMessage
    }
}