let bienvenida = "¡Bienvenido a Deco, el mejor sitio para encriptar mensajes!";
alert(bienvenida);

let operacion = prompt("¿Quieres encriptar o desencriptar un texto?");
if(operacion === "encriptar") {
    let mensaje = prompt("Introduce el texto que quieras codificar...");
    let mensajeCodificado = codificar(mensaje);
    alert(`Este es tu mensaje codificado: ${mensajeCodificado}!`);
}
else {
    let mensaje = prompt("Introduce el texto que quieras decodificar...");
    let mensajeDecodificado = decodificar(mensaje);
    alert(`Este es tu mensaje decodificado: ${mensajeDecodificado}!`);
}

function codificar(mensaje) {
    mensajeCodificado = "";
    for (let c of mensaje) {
        switch(c) {
            case "a":
                mensajeCodificado = mensajeCodificado + "z"
                break;
            case "e":
                mensajeCodificado = mensajeCodificado + "y"
                break;
            case "i":
                mensajeCodificado = mensajeCodificado + "x"
                break;
            case "o":
                mensajeCodificado = mensajeCodificado + "w"
                break;
            case "u":
                mensajeCodificado = mensajeCodificado + "v"
                break;
            default: mensajeCodificado = mensajeCodificado + c
                break;
        }
    }
    return mensajeCodificado;
}

function decodificar(mensaje) {
    
}

