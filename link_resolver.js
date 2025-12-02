const linksContainer = document.getElementById('download-buttons-container');
const fileTitle = document.getElementById('file-title');
const fileSpecs = document.getElementById('file-specs');
const fileType = document.getElementById('file-type');
const fileSize = document.getElementById('file-size');

// 1. Get the Movie ID from the URL (The ID is passed from the detail page)
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');

// 2. Fetch the manual link data from your JSON file
async function loadLinks() {
    try {
        // Fetch the file containing your custom links
        const response = await fetch('movie_links.json');
        const allLinks = await response.json();

        // Find the specific movie's link data based on the ID
        const movieData = allLinks.find(movie => movie.id == movieId);

        if (movieData) {
            // Update the display fields with data from the JSON
            fileTitle.textContent = movieData.title;
            fileSpecs.textContent = movieData.specs;
            fileType.textContent = movieData.file_type || 'N/A'; // Use N/A if missing
            fileSize.textContent = movieData.file_size || 'N/A';
            
            // Clear the "Loading" message
            linksContainer.innerHTML = ''; 

            // 3. Generate the download buttons
            movieData.links.forEach(link => {
                const buttonHTML = `
                    <a href="${link.url}" class="download-button ${link.class}" target="_blank">
                        ${link.name}
                    </a>
                `;
                linksContainer.innerHTML += buttonHTML;
            });
            
        } else {
            linksContainer.innerHTML = '<p style="color:red; text-align:center;">No download links found for this movie in your JSON file.</p>';
        }

    } catch (error) {
        console.error("Error loading links:", error);
        linksContainer.innerHTML = '<p style="color:red; text-align:center;">Error fetching links file. Check console for details.</p>';
    }
}

// Start loading the links when the page loads
loadLinks();
