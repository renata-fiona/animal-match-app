//Create a namespace object
const animalApp = {};
//Grab our form with JS
animalApp.formSubmit = document.querySelector('form');
//Add event listener which listens for form submit
animalApp.formSubmit.addEventListener('submit', function (event) {

    // Prevent default behavior (Page refresh)
    event.preventDefault();

    // Get the value of the inputs the user has selected:

    // Targeting Activity Input
    animalApp.activityInput = document.querySelector('input[name=favorite-activity]:checked');
    animalApp.logActivity = animalApp.activityInput.value;
    console.log(animalApp.logActivity);

    // Targeting Animal Input
    animalApp.animalInput = document.querySelector('input[name="animal-type"]:checked');
    animalApp.logAnimal = animalApp.animalInput.value;
    console.log(animalApp.logAnimal);

    // construct the URL
    const url = new URL("https://api.pexels.com/v1/search/")
    url.search = new URLSearchParams({
        query: `animal, ${animalApp.logActivity}, ${animalApp.logAnimal}`
        // query: `animal, ${logActivity}, ${logAnimal}`
    })
    const key = `563492ad6f91700001000001fd299bcaf3464911914c8f15b188651a`;

    // fetch from URL
    fetch(url, {
        headers: {
            Authorization: key
        }

    })
        .then(function (response) {
            // convert to json
            return response.json();
        })
        .then(function (jsonData) {
            console.log(jsonData);
            displayPhotos(jsonData)
        })

    //display photos   
    function displayPhotos(jsonData) {
        // choose a random photo from jsonData
        animalApp.random = Math.floor(Math.random() * jsonData.photos.length);
        console.log(animalApp.random);
        //select an image element
        animalApp.imgElement = document.querySelector('.result-image');

        //update image element with data from photos
        animalApp.imgElement.src = jsonData.photos[animalApp.random].src.large;
        animalApp.imgElement.alt = jsonData.photos[animalApp.random].alt;

        // Selecting h3 & adding it's text content: the restaurant NAME
        animalApp.animalDescription = document.querySelector('.animal-description');
        animalApp.animalDescription.textContent = jsonData.photos[animalApp.random].alt;
    }

});