// Replace THIS with your actual API key from TMDB
const API_KEY = 'c85e226da66bb3a510f4b28bdb99592b'; 
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = `${BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`;
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500'; // Base URL for posters

const movieGrid = document.querySelector('.movie-grid-container');

// Function to fetch and display movies
async function getMovies(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        // Clear any placeholder content
        movieGrid.innerHTML = ''; 

        // Build the movie cards dynamically
        data.results.forEach(movie => {
            const { title, poster_path, vote_average, release_date, id } = movie;
            
            // Format the poster URL
            const posterPath = poster_path ? IMAGE_URL + poster_path : 'https://via.placeholder.com/200x300/121212/888888?text=Poster+Not+Found';
            
            // Determine the display rating (e.g., convert 8.5 to ⭐ 8.5)
            const displayRating = `⭐ ${vote_average.toFixed(1)}`;
            
            // Extract the year
            const year = release_date ? release_date.substring(0, 4) : 'N/A';

            const movieCardHTML = `
                <div class="movie-card" data-movie-id="${id}">
                    <img src="${posterPath}" alt="Poster for ${title}" class="poster">
                    <div class="card-info">
                        <h3>${title}</h3>
                        <p class="rating">${displayRating}</p>
                        <p class="year">${year}</p>
                        <a href="/movie.html?id=${id}" class="watch-btn">Details / Watch</a>
                    </div>
                </div>
            `;
            
            movieGrid.innerHTML += movieCardHTML;
        });

    } catch (error) {
        console.error("Error fetching movies:", error);
        movieGrid.innerHTML = '<p style="color:red; text-align:center;">Failed to load movies. Check your API key.</p>';
    }
}

// Initial call to load popular movies
getMovies(API_URL);

// --- Basic Search Functionality (Similar to what you see in the video) ---
const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-input');

searchForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Stop the form from submitting the traditional way
    const searchTerm = searchInput.value.trim();

    if (searchTerm) {
        const searchURL = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchTerm}`;
        getMovies(searchURL);
    } else {
        // If the search bar is cleared, go back to popular movies
        getMovies(API_URL); 
    }
});
