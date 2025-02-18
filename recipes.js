document.addEventListener("DOMContentLoaded", function () {
    const recipeForm = document.getElementById("recipe-form");
    const recipeTitleInput = document.getElementById("recipe-title");
    const recipeDescriptionInput = document.getElementById("recipe-description");
    const starRating = document.getElementById("recipe-rating");
    const recipeList = document.getElementById("recipe-list");

    let selectedRating = 0;

    // Load saved recipes from localStorage
    function loadRecipes() {
        const savedRecipes = localStorage.getItem("recipes");
        if (savedRecipes) {
            const recipes = JSON.parse(savedRecipes);
            recipes.forEach(recipe => {
                addRecipeToList(recipe.title, recipe.description, recipe.rating);
            });
        }
    }

    // Save recipes to localStorage
    function saveRecipes() {
        const recipes = [];
        recipeList.querySelectorAll("li").forEach(recipeItem => {
            const title = recipeItem.querySelector("h4").textContent;
            const description = recipeItem.querySelector("p").textContent;
            const rating = recipeItem.querySelector(".rating").textContent.split("★").length - 1; // Count filled stars
            recipes.push({ title, description, rating });
        });
        localStorage.setItem("recipes", JSON.stringify(recipes));
    }

    // Add a recipe to the list
    function addRecipeToList(title, description, rating) {
        const recipeItem = document.createElement("li");
        recipeItem.innerHTML = `
            <h4>${title}</h4>
            <p>${description}</p>
            <div class="rating">${"★".repeat(rating)}${"☆".repeat(5 - rating)}</div>
            <button class="delete-button">borrar</button>
        `;

        // Attach delete functionality to the button
        const deleteButton = recipeItem.querySelector(".delete-button");
        deleteButton.addEventListener("click", function () {
            recipeItem.remove();
            saveRecipes(); // Update localStorage after deletion
        });

        recipeList.appendChild(recipeItem);
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
    recipeForm.addEventListener("submit", function (e) {
        e.preventDefault();

        if (selectedRating === 0) {
            alert("Si us plau, selecciona una puntuació.");
            return;
        }

        const recipeTitle = recipeTitleInput.value.trim();
        const recipeDescription = recipeDescriptionInput.value.trim();

        if (!recipeTitle || !recipeDescription) {
            alert("Si us plau, omple el títol i la descripció.");
            return;
        }

        // Add the new recipe to the list and save to localStorage
        addRecipeToList(recipeTitle, recipeDescription, selectedRating);
        saveRecipes();

        // Clear the form
        recipeTitleInput.value = "";
        recipeDescriptionInput.value = "";
        selectedRating = 0;
        starRating.querySelectorAll(".star").forEach(star => {
            star.classList.remove("selected");
        });
    });

    // Load recipes when the page loads
    loadRecipes();
});
