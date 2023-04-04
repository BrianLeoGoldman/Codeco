const getLanguages = async () => {
    const options = {
        method: 'GET',
    };
    fetch('https://libretranslate.com/languages', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
}

const translate = async (text) => {
    const res = await fetch("https://libretranslate.com/translate", {
	method: "POST",
	body: JSON.stringify({
		q: "",
		source: "auto",
		target: "en",
		format: "text",
		api_key: ""
	}),
	headers: { "Content-Type": "application/json" }
});

console.log(await res.json());
}


getLanguages()
translate()