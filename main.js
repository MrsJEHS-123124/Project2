const apiKey = "82RMeFCXNTk8K5lDcD3Ay4w2BmAWI3IQ";

// Function to fetch GIFs based on a search query
const searchGIFs = async (query) => {
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${"82RMeFCXNTk8K5lDcD3Ay4w2BmAWI3IQ"}&q=${query}&limit=25`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayGIFs(data.data); // Pass the array of GIFs to displayGIFs
    } catch (error) {
        console.error("Error fetching GIFs:", error);
    }
};



// Event listener for search button
document.querySelector("#search-button").addEventListener("click", async () => {
    const query = document.querySelector("#search-input").value.trim();
    if (!query) {
        alert("Please enter a search term!");
        return;
    }
    console.log("Search button clicked!");
    await searchGIFs(query);
});

// Load trending GIFs on page load
window.addEventListener("DOMContentLoaded", async () => {
    try {
        const url = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=25`;
        const response = await fetch(url);
        const data = await response.json();
        displayGIFs(data.data); // Pass the array of trending GIFs to displayGIFs
    } catch (error) {
        console.error("Error fetching trending GIFs:", error);
    }
});
const displayGIFs = (gifArray) => {
    const gifContainer = document.querySelector("#gifContainer");
    gifContainer.innerHTML = ""; // Clear previous results

    gifArray.forEach(gif => {
        const gifWrapper = document.createElement("div");

        const img = document.createElement("img");
        img.src = gif.images.fixed_height.url;
        img.alt = gif.title;

        const saveButton = document.createElement("button");
        saveButton.textContent = "❤️ Save";
        saveButton.addEventListener("click", () => saveGIF(gif));

        gifWrapper.appendChild(img);
        gifWrapper.appendChild(saveButton);
        gifContainer.appendChild(gifWrapper);
    });
};
    let savedGIFs = JSON.parse(localStorage.getItem("favorites")) || [];
    savedGIFs.push(gif);
    localStorage.setItem("favorites", JSON.stringify(savedGIFs));
    alert("GIF saved to favorites");
const loadFavorites = () => {
    const favoriteContainer = document.querySelector("#favoriteContainer");
    favoriteContainer.innerHTML = ""; 

    let savedGIFs = JSON.parse(localStorage.getItem("favorites")) || [];

    savedGIFs.forEach(gif => {
        const img = document.createElement("img");
        img.src = gif.images.fixed_height.url;
        img.alt = gif.title;
        favoriteContainer.appendChild(img);
    });
};
// Call `loadFavorites()` when the favorites page loads
window.addEventListener("DOMContentLoaded", loadFavorites);
document.getElementById("createMeme").addEventListener("click", () => {
    const canvas = document.getElementById("memeCanvas");
    const ctx = canvas.getContext("2d");
    const text = document.getElementById("memeText").value;
// Example GIF URL (replace with dynamic selection)
    const gifUrl = "https://media.giphy.com/media/Ju7l5y9osyymQ/giphy.gif";
    const img = new Image();
    img.crossOrigin = "Anonymous"; // Prevent CORS issues
    img.src = gifUrl;
     img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "white";
        ctx.font = "30px Arial";
        ctx.fillText(text, 50, 50);
    };
});
document.getElementById("downloadMeme").addEventListener("click", () => {
    const canvas = document.getElementById("memeCanvas");
    const link = document.createElement("a");
    link.download = "meme.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
});

