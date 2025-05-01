const apiKey = "82RMeFCXNTk8K5lDcD3Ay4w2BmAWI3IQ"; // Store API Key

// Function to fetch GIFs based on user search
export const fetchGIFs = async (query) => {
    const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}&limit=25`;
    
    try {
        const response = await fetch(endpoint);
        const data = await response.json();
        return data.data; // Return GIF array for use in `main.js`
    } catch (error) {
        console.error("Error fetching GIFs:", error);
        return []; // Return an empty array in case of an error
    }
};

// Function to fetch trending GIFs
export const fetchTrendingGIFs = async () => {
    const endpoint = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=25`;
    
    try {
        const response = await fetch(endpoint);
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error fetching trending GIFs:", error);
        return [];
    }
};