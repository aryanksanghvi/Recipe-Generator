document.getElementById('searchboxinput').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    var ing = document.getElementById("ing").value;
    var apiUrl = "https://api.edamam.com/api/recipes/v2?app_id=7d62a2ad&app_key=027a572577940d760b09fcb3798c2388&q=" + ing + "&type=public";
    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        const recipes = data.hits.map(hit => hit.recipe);
    // Create condensed versions for all recipes
        const condensedResults = recipes.map(recipe => `
            <div class="recipe">
                <img src="${recipe.image}" alt="${recipe.label}" style="max-width: 100%">
                <h2>${recipe.label}</h2>
                <p>Source: ${recipe.source}</p>
                <button class="expandBtn">View Full Recipe</button>
            </div>
        `).join('');

            // Display all condensed results in the 'container' div
        document.getElementById('result').innerHTML = condensedResults;

            // Add click event listeners to all "View Full Recipe" buttons
        const expandButtons = document.querySelectorAll('.expandBtn');
        expandButtons.forEach((button, index) => {
            button.addEventListener('click', function () {
                    // Display the full recipe details for the corresponding index
                displayFullRecipe(recipes[index], condensedResults);
            });
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
});
function displayFullRecipe(recipe, condensedResults) {
    document.getElementById('result').style.flexDirection = 'column';
    const resultContainer = document.getElementById('result');
    subbtn = document.getElementById('submitbtn')
    subbtn.addEventListener('click', function () {
        // Set the flexDirection to 'row' when going back
        resultContainer.innerHTML = condensedResults;
        resultContainer.style.flexDirection = 'row';});
        
        // Display the condensed search results again
    // Extract more information from the recipe
    const recipeUrl = recipe.url;
    const recipeIngredients = recipe.ingredients.map(ingredient => ingredient.text);
    const recipeInstructions = recipe.ingredientLines;
    const recipeHealth = recipe.healthLabels;

    // Create a formatted full recipe string
    const fullRecipe = `
        <img src="${recipe.image}" alt="${recipe.label}" style="max-width: 100%">
        <h2>${recipe.label}</h2>
        <p>Source: ${recipe.source}</p>
        <h3>Ingredients:</h3>
        <ul>
            ${recipeIngredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
        </ul>
        <h3>Instructions:</h3>
        <ol>
            ${recipeInstructions.map(instruction => `<li>${instruction}</li>`).join('')}
        </ol>
        <h3>Health Labels:</h3>
        <p>${recipeHealth.join(', ')}</p>
    `;

    // Display the full recipe in the 'container' div
    // document.getElementById('result').innerHTML = fullRecipe;
    resultContainer.innerHTML = fullRecipe;
    resultContainer.appendChild(backButton);
}
document.getElementById('searchboxinput').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Display loading spinner
    var loadingSpinner = document.querySelector('.loading-spinner');
    loadingSpinner.style.display = 'block';

    // Simulate asynchronous operation (replace this with your actual search logic)
    setTimeout(function () {
        // Hide loading spinner
        loadingSpinner.style.display = 'none';

        // Display search results (replace this with your actual result handling logic)
        var finalDiv = document.getElementById('final');
        finalDiv.innerHTML = '<p>Search results go here!</p>';
    }, 2000); // Simulating a delay of 2 seconds, replace with your actual delay
});