class Recipe { //class that models a recipe 
    constructor(id, name, image, instructions) {
        this.id = id;//unqiue identifier for recipe
        this.name = name;//name of recipe
        this.image = image;// url of image
        this.instructions = instructions;//recipe details
    }
}

class RecipeManager {//manages api calls and user interactions
    constructor() {
        this.recipes = [];//array to store recipes from the api
        this.favorites = JSON.parse(localStorage.getItem('favorites')) || [];//loads favs from local storage or starts an empty array
    }

    async searchRecipes(ingredient) {//gets the recipes based on user-inputed ingredient
        try {//try catch for error handling
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);//response is a varible that stores the recipes based on input
            if (!response.ok) throw new Error(`Failed to fetch recipes: ${response.statusText}`);//if doesn't work say this
            const data = await response.json();//new variable that that is response in json
            this.recipes = data.meals.map(meal => new Recipe(meal.idMeal, meal.strMeal, meal.strMealThumb, 'Click for details'));//data.meals is an array of objects from api, map() converts each meal object into an instance of recipe, parameters are passed that correspond to the id, name, image, and instructions properties of the recipe class. This is all assigned to this.recipes which is a transformed array and property of recipemanager class
            this.displayRecipes();
        } catch (error) {
            alert(error.message);
        }
    }

    async getRecipeDetails(id) {//for the details of the recipe 
        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);//gets the id this time
            if (!response.ok) throw new Error(`Failed to fetch recipe details: ${response.statusText}`);//same as before
            const data = await response.json();//same as before
            const recipe = data.meals[0];//recipe is now first meal in json object data
            alert(recipe.strInstructions);
        } catch (error) {
            alert(error.message);
        }
    }

    saveToFavorites(recipe) {
        if (this.favorites.some(fav => fav.id === recipe.id)) {//if recipe is already in favs then display message below
            alert('Recipe already in favorites');
            return;
        }
        this.favorites = [...this.favorites, recipe];//Spread operator to add to favorites
        localStorage.setItem('favorites', JSON.stringify(this.favorites));//Save to localStorage
        this.displayFavorites();//Update the favorites section
    }
    

    displayRecipes() {
        const recipeList = document.getElementById('recipeList');//gets the id recipeList from index.html
        recipeList.innerHTML = '';
        this.recipes.forEach(recipe => {//basically creates the content takes the api info and puts it where it needs to be
            const card = document.createElement('div');
            card.className = 'recipe-card';
            card.innerHTML = `
                <h3>${recipe.name}</h3>
                <img src="${recipe.image}" alt="${recipe.name}" style="width:100px;">
                <p>${recipe.instructions}</p>
                <button onclick="recipeManager.getRecipeDetails('${recipe.id}')">View Details</button>
            `;
            
            //Creates the "Add to Favorites" button dynamically
            const addToFavoritesButton = document.createElement('button');
            addToFavoritesButton.textContent = "Add to Favorites";
            addToFavoritesButton.addEventListener('click', () => {
                recipeManager.saveToFavorites(recipe); //Passes the recipe object directly
            });
            
            card.appendChild(addToFavoritesButton);
            recipeList.appendChild(card);
        });
    }
    

    displayFavorites() {//creates content for favs very similar to before
        const favoriteList = document.getElementById('favoriteList');
        favoriteList.innerHTML = '';//Clear the current favorites
    
        this.favorites.forEach((recipe, index) => {
            const card = document.createElement('div');
            card.className = 'recipe-card';
            card.innerHTML = `
                <h3>${recipe.name}</h3>
                <img src="${recipe.image}" alt="${recipe.name}" style="width:100px;">
            `;
    
            //"View Details" Button
            const viewDetailsButton = document.createElement('button');
            viewDetailsButton.textContent = "View Details";
            viewDetailsButton.addEventListener('click', () => {
                this.getRecipeDetails(recipe.id);
            });
    
            //"Remove" Button
            const removeButton = document.createElement('button');
            removeButton.textContent = "Remove";
            removeButton.addEventListener('click', () => {
                this.removeFromFavorites(index);//Remove the recipe at the given index
            });
    
            card.appendChild(viewDetailsButton);
            card.appendChild(removeButton);
            favoriteList.appendChild(card);
        });
    }

    removeFromFavorites(index) {
        this.favorites.splice(index, 1); // Remove the recipe from the array
        localStorage.setItem('favorites', JSON.stringify(this.favorites)); // Update localStorage
        this.displayFavorites(); // Re-render the favorites list
    }
    
    
}

const recipeManager = new RecipeManager();//instance of recipemanger
recipeManager.displayFavorites();//calls the displayfavs method so that whenever a user re-opens the program their favs are still there and not lost

document.getElementById('searchButton').addEventListener('click', () => {//waits for click on search button then grabs the content
    const ingredient = document.getElementById('ingredientInput').value;
    recipeManager.searchRecipes(ingredient);
});

document.addEventListener('DOMContentLoaded', () => {//event listener waiting for html to fully load before doing anything
    console.log('Application initialized');
});
