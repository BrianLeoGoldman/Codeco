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
            switch(method) {
                case "vocals":
                    newMessage = transform(messageList.shift(), operation, vocalDictionary);
                    break;
                case "position":
                    newMessage = transform(messageList.shift(), operation, positionShiftDictionary);
                    break;
                case "reversion":
                    newMessage = reverseMessage(messageList.shift());
                    break;
                case "custom":
                    let customCoder = createCustomCoder();
                    newMessage = customCoder.encode(messageList.shift(), operation);
                    break;
                default: 
                    alert(`The operation ${operation} could not be performed. Please seelct a valid method`);
                    messageList.shift();
                    break;
            }
        }
    } 
    else {
        alert(`The operation ${operation} is not valid`);
    }
    return newMessage
}

function transform(message, operation, dictionary) {
    let transformedMessage = "";
    let usedDictionary;
    if(operation === "encode") {
        console.log("Message will be encoded");
        usedDictionary = dictionary;
    }
    if(operation === "decode") {
        console.log("Message will be decoded");
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
    console.log("Message will be reversed");
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
        let key = prompt("Enter the character to change in the original message:");
        let value = prompt("Enter the character to be replaced for in the encoded message:");
        list[key] = value;
        active = prompt("¿Do you want to chnage another character?");
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
        cosnole.log(newMessage);
        return newMessage
    }
}