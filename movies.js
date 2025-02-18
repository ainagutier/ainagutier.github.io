document.addEventListener("DOMContentLoaded", function () {
    const movieSeriesForm = document.getElementById("movie-series-form");
    const movieTitleInput = document.getElementById("movie-title");
    const movieDescriptionInput = document.getElementById("movie-description");
    const starRating = document.getElementById("movie-rating");
    const movieList = document.getElementById("movie-list");

    let selectedRating = 0;

    // Load saved movies from localStorage
    function loadMovies() {
        const savedMovies = localStorage.getItem("movies");
        if (savedMovies) {
            const movies = JSON.parse(savedMovies);
            movies.forEach(movie => {
                addMovieToList(movie.title, movie.description, movie.rating);
            });
        }
    }

    // Save movies to localStorage
    function saveMovies() {
        const movies = [];
        movieList.querySelectorAll("li").forEach(movieItem => {
            const title = movieItem.querySelector("h4").textContent;
            const description = movieItem.querySelector("p").textContent;
            const rating = movieItem.querySelector(".rating").textContent.split("★").length - 1; // Count filled stars
            movies.push({ title, description, rating });
        });
        localStorage.setItem("movies", JSON.stringify(movies));
    }

    // Add a movie to the list
    function addMovieToList(title, description, rating) {
        const movieItem = document.createElement("li");
        movieItem.innerHTML = `
            <h4>${title}</h4>
            <p>${description}</p>
            <div class="rating">${"★".repeat(rating)}${"☆".repeat(5 - rating)}</div>
            <button class="delete-button">borrar</button>
        `;
        
        // Attach delete functionality to the button
        const deleteButton = movieItem.querySelector(".delete-button");
        deleteButton.addEventListener("click", function () {
            movieItem.remove();
            saveMovies(); // Update localStorage after deletion
        });

        movieList.appendChild(movieItem);
    }

    // Handle star click to select rating
    starRating.addEventListener("click", function (e) {
        if (e.target.classList.contains("star")) {
            selectedRating = e.target.getAttribute("data-value");
            const stars = starRating.querySelectorAll(".star");
            stars.forEach(star => {
                if (star.getAttribute("data-value") <= selectedRating) {
                    star.classList.add("selected");
                } else {
                    star.classList.remove("selected");
                }
            });
        }
    });

    // Handle mouseenter on stars to show hover effect
    starRating.addEventListener("mouseenter", function (e) {
        if (e.target.classList.contains("star")) {
            const hoveredRating = e.target.getAttribute("data-value");
            const stars = starRating.querySelectorAll(".star");
            stars.forEach(star => {
                if (star.getAttribute("data-value") <= hoveredRating) {
                    star.classList.add("hover");
                } else {
                    star.classList.remove("hover");
                }
            });
        }
    });

    // Remove hover effect when mouse leaves
    starRating.addEventListener("mouseleave", function () {
        const stars = starRating.querySelectorAll(".star");
        stars.forEach(star => {
            star.classList.remove("hover");
        });
    });

    // Handle form submission
    movieSeriesForm.addEventListener("submit", function (e) {
        e.preventDefault();

        if (selectedRating === 0) {
            alert("Please select a rating.");
            return;
        }

        const movieTitle = movieTitleInput.value.trim();
        const movieDescription = movieDescriptionInput.value.trim();

        if (!movieTitle || !movieDescription) {
            alert("Please fill in both the title and description.");
            return;
        }

        // Add the new movie to the list and save to localStorage
        addMovieToList(movieTitle, movieDescription, selectedRating);
        saveMovies();

        // Clear the form
        movieTitleInput.value = "";
        movieDescriptionInput.value = "";
        selectedRating = 0;
        starRating.querySelectorAll(".star").forEach(star => {
            star.classList.remove("selected");
        });
    });

    // Load movies when the page loads
    loadMovies();
});
