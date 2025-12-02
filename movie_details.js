// Use the same API key you used in script.js
const API_KEY = 'C85e226da66bb3a510f4b28bdb99592b'; 
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_URL = 'https://image.tmdb.org/t/p/original'; // Base URL for high-res backdrops
const POSTER_URL = 'https://image.tmdb.org/t/p/w500'; // Poster size

const detailsContainer = document.querySelector('.details-container');
const pageTitle = document.getElementById('page-title');

// 1. Get the Movie ID from the URL (e.g., /movie.html?id=499293)
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');

if (movieId) {
    getMovieDetails(movieId);
} else {
    detailsContainer.innerHTML = '<h2 style="text-align:center; margin-top: 50px;">Movie ID not found! Please return to the Home Page.</h2>';
}

// 2. Fetch the specific movie data from TMDB
async function getMovieDetails(id) {
    const movieURL = `${BASE_URL}/movie/${id}?api_key=${API_KEY}`;

    try {
        const response = await fetch(movieURL);
        const movie = await response.json();

        displayMovieDetails(movie);
    } catch (error) {
        console.error("Error fetching movie details:", error);
        detailsContainer.innerHTML = '<h2 style="text-align:center; margin-top: 50px;">Failed to load details.</h2>';
    }
}

// 3. Display the fetched details on the movie.html page
function displayMovieDetails(movie) {
    const { 
        title, 
        overview, 
        poster_path, 
        vote_average, 
        runtime, 
        genres, 
        release_date, 
        tagline,
        id 
    } = movie;

    // Update the browser tab title
    pageTitle.textContent = `${title} | FLASH-MUXES`;

    // Format data
    const genreNames = genres.map(g => g.name).join(', ');
    const displayRating = `⭐ ${vote_average.toFixed(1)}`;
    const posterPath = POSTER_URL + poster_path;
    const releaseYear = release_date ? release_date.substring(0, 4) : 'N/A';
    
    // Create HTML structure similar to the video's detail page
    detailsContainer.innerHTML = `
        <div class="detail-header" style="background-image: url(${IMAGE_URL + movie.backdrop_path})">
            <div class="header-overlay">
                <img src="${posterPath}" alt="${title} Poster" class="detail-poster">
                <div class="header-info">
                    <h1>${title} (${releaseYear})</h1>
                    <p class="tagline">${tagline || ''}</p>
                    <p class="rating-large">${displayRating}</p>
                    <p>Runtime: ${runtime} mins</p>
                    <p>Genres: <span>${genreNames}</span></p>
                </div>
            </div>
        </div>

        <div class="detail-body">
            <h2>Synopsis</h2>
            <p class="overview">${overview}</p>
            
            <hr>
            
            <a href="links.html?id=${id}" class="download-btn">
                Watch / Download →
            </a>
            
        </div>
    `;
}
