class VocalCoder {

    codeMessage(message) {
        let codedMessage = "";
        for (let c of message) {
            switch(c) {
                case "a":
                    codedMessage = codedMessage + "z"
                    break;
                case "e":
                    codedMessage = codedMessage + "y"
                    break;
                case "i":
                    codedMessage = codedMessage + "x"
                    break;
                case "o":
                    codedMessage = codedMessage + "w"
                    break;
                case "u":
                    codedMessage = codedMessage + "v"
                    break;
                default: codedMessage = codedMessage + c
                    break;
            }
        }
        return codedMessage;
    }

    decodeMessage(message) {
        let decodedMessage = "";
        for (let c of message) {
            switch(c) {
                case "z":
                    decodedMessage = decodedMessage + "a"
                    break;
                case "y":
                    decodedMessage = decodedMessage + "e"
                    break;
                case "x":
                    decodedMessage = decodedMessage + "i"
                    break;
                case "w":
                    decodedMessage = decodedMessage + "o"
                    break;
                case "v":
                    decodedMessage = decodedMessage + "u"
                    break;
                default: decodedMessage = decodedMessage + c
                    break;
            }
        }
        return decodedMessage;
    }
}

class DictionaryCoder {

    constructor(dictionary) {
        this.dictionary = dictionary;
    }

    swapDictionary(){
        var ret = {};
        for(var key in this.dictionary){
          ret[this.dictionary[key]] = key;
        }
        return ret;
    }

    codeMessage(message) {
        let codedMessage = "";
        for (let c of message) {
            if(c in this.dictionary) {
                codedMessage = codedMessage + this.dictionary[c];
            }
            else {
                codedMessage = codedMessage + c;
            }
        }
        return codedMessage;
    } 

    decodeMessage(message) {
        let decodedMessage = "";
        invertedDictionary = this.swapDictionary(this.dictionary);
        for (let c of message) {
            if(c in this.dictionary) {
                decodedMessage = decodedMessage + this.invertedDictionary[c];
            }
            else {
                decodedMessage = decodedMessage + c;
            }
        }
        return decodedMessage;
    } 
}  

let dictionary = {
    "a": 1, "b": 2, "c": 3, "d": 4, "e": 5, "f": 6, "g": 7, "h": 8, "i": 9, "j": 0, "k": "a", "l": "b", "m": "c",
    "n": "d", "o": "e", "p": "f", "q": "g", "r": "h", "s": "i", "t": "j", "u": "k", "v": "l", "w": "m", "x": "n",
    "y": "o", "z": "p", " ": "$"
}

let bienvenida = "¡Bienvenido a CoDeCo, un sitio para codificar y decodificar mensajes!";
alert(bienvenida);

let operacion = prompt("¿Quieres codificar o decodificar un mensaje?");
if(operacion === "codificar") {
    let mensaje = prompt("Introduce el texto que quieras codificar...");
    let metodo = prompt("¿Que metodo de codificacion quieres usar, de vocales o de diccionario?");
    if(metodo === "vocales") {
        const vocalCoder = new VocalCoder();
        let mensajeCodificado = vocalCoder.codeMessage(mensaje);
        alert(`Este es tu mensaje codificado: ${mensajeCodificado}`);
    }
    else {
        const dictionaryCoder = new DictionaryCoder(dictionary);
        let mensajeCodificado = dictionaryCoder.codeMessage(mensaje);
        alert(`Este es tu mensaje codificado: ${mensajeCodificado}`);
    }
        
}
else {
    let mensaje = prompt("Introduce el texto que quieras decodificar...");
    let metodo = prompt("¿Que metodo de decodificacion quieres usar, de vocales o de diccionario?");
    if(metodo === "vocales") {
        const vocalCoder = new VocalCoder();
        let mensajeDecodificado = vocalCoder.decodeMessage(mensaje);
        alert(`Este es tu mensaje decodificado: ${mensajeDecodificado}`);
    }
    else {
        const dictionaryCoder = new DictionaryCoder(dictionary);
        let mensajeDecodificado = dictionaryCoder.decodeMessage(mensaje);
        alert(`Este es tu mensaje decodificado: ${mensajeDecodificado}`);
    }
}