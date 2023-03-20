export function save(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value));
}

export function get(key) {
    return JSON.parse(sessionStorage.getItem(key));
}

export function addUserData(operation, method, inputMessage, outputMessage) {
    let currentUser = get("user");
    let userData = get(currentUser);
    let object = {
        method: method,
        input: inputMessage, 
        output: outputMessage, 
        date: new Date().toDateString()
    };
    if(operation === "encode") {
        userData.encodedMessages.push(object);
    }
    if(operation === "decode") {
        userData.decodedMessages.push(object);
    }
    save(currentUser, userData);
}