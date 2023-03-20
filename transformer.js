
/* FUNCTIONS */

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


function createMethodsList() {
    let methods = ["Método de reversion: invierte las posiciones de los caracteres que forman el mensaje",
                   "Método de vocales: reemplaza las vocales del texto por números",
                   "Método de posicion: desplaza las letras por otras letras cambiando la posicion en el alfabeto",
                   "Método personalizado: permite al usuario crear su propio diccionario de caracteres para reemplazar"];
    return methods
}

/* MESSAGE PROCESSING */

let active = "no";
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


