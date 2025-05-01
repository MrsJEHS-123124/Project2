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

// Function to display GIFs
const displayGIFs = (gifArray) => {
    const gifContainer = document.querySelector("#gif-container");
    gifContainer.innerHTML = ""; // Clear previous results
    gifArray.forEach((gif) => {
        const img = document.createElement("img");
        img.src = gif.images.fixed_height.url;
        img.alt = gif.title;
        img.style.margin = "5px";
        gifContainer.appendChild(img);
    });
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