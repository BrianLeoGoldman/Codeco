const fetchNews = async () => {
    try {
        let news = document.getElementById("news");
        const result = await fetch("https://inshorts.deta.dev/news?category=all");
        const json = await result.json();
        const data = json.data;
        data.forEach(item => {
            const div = document.createElement("div");
            div.className = "carousel-item";
            div.innerHTML = `
            <div class="card">
                <div class="card-body" >
                    <a href="${item.url}"><h4 class="card-title">${item.title}</h4></a>
                    <p class="card-text">${item.content}</p>
                </div>
            </div>
            `;
            news.append(div); 
        });
    } catch(error) {
        console.log(error);
    }
}

fetchNews();