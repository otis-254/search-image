const accessKey = "erbhL-1wL5J5zvODLqxLh1-uhH9dOA1ycyBW1rD47Wg"

const formEl = document.querySelector("form")
const inputEl = document.getElementById("search")
const searchResults = document.querySelector(".container")
const showBtn = document.getElementById("show-more")


let inputData = ""
let page = 1;


async function searchImages() {
    inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`

    const response = await fetch(url)
    const data = await response.json()

    const results = data.results

    if (page === 1) {
        searchResults.innerHTML = ""
    }

    results.map((result) => {
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add("images");


        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.alt_description;
        image.style.maxWidth = "100%";

        const imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;


        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);

    });

    page++
    if (page > 1) {
        showBtn.style.display = "block";

    }
}



formEl.addEventListener('submit', (event) => {
    event.preventDefault()

    page = 1;
    searchImages()
})


showBtn.addEventListener('click', () => {
    searchImages()
})