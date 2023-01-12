//Create a namespace object
const animalApp = {};
//Create a formSubmit variable & use it to select our form.
animalApp.formSubmit = document.querySelector('form');

// Create a setupEventListener function to reference in our init function.
animalApp.setupEventListener = function () {
    //Add event listener for form submit
    animalApp.formSubmit.addEventListener('submit', function (event) {
        // Prevent default behavior (page refresh)
        event.preventDefault();

        // ------------Loading Animation-------------
        // Make a variable called loaderAnimation and set it to a string that includes an an icon with the class "loader". The icon will show up as we wait for our API call to return.
        animalApp.loaderAnimation = '<i class="fa-solid fa-paw loader"></i>';
        // Select our .img-container and change the innerHTML to be the icon that we outlined in our loaderAnimation variable.
        document.querySelector('.img-container').innerHTML = animalApp.loaderAnimation;
        // ------------------------------------------------

        // Get the value of the inputs the user has selected:
        // Targeting Activity Input
        animalApp.activityInput = document.querySelector('input[name=favorite-activity]:checked');
        animalApp.logActivity = animalApp.activityInput.value;
        // Targeting Animal Input
        animalApp.animalInput = document.querySelector('input[name="animal-type"]:checked');
        animalApp.logAnimal = animalApp.animalInput.value;
        // Construct the URL
        const url = new URL('https://api.pexels.com/v1/search/')
        url.search = new URLSearchParams({
            query: `${animalApp.logActivity}, ${animalApp.logAnimal}`
        })
        animalApp.key = '563492ad6f91700001000001fd299bcaf3464911914c8f15b188651a';
        // Fetch from URL
        fetch(url, {
            headers: {
                Authorization: animalApp.key
            }
        })
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('This call was unsuccessful!');
                }
            })
            .then(function (jsonData) {
                displayPhotos(jsonData)
            })
            .catch((err) => {
                if (err.message === 'Not Found') {
                    alert('We could not find your image, try a different combo!')
                } else {
                    alert('Sorry, something unusual happened & I am not sure what.')
                }
            })

        //Create function to display photos from search query in our HTML 
        function displayPhotos(jsonData) {
            // Choose a random photo from those returned to jsonData
            animalApp.random = Math.floor(Math.random() * jsonData.photos.length);

            // ------------Loading Animation Edits-------------
            // Select our .img-container (which now contains our loading animation) and replace its innerHTML with an <img> element with the class of "result-image"
            document.querySelector('.img-container').innerHTML = '<img class="result-image"></img>';
            // ------------------------------------------------

            //Select an the <img> element where we want our image to show up.
            animalApp.imgElement = document.querySelector('.result-image');
            //Update <img> source with url & size
            animalApp.imgElement.src = jsonData.photos[animalApp.random].src.large;
            //Update <img> alt tag
            animalApp.imgElement.alt = jsonData.photos[animalApp.random].alt;
            // Selecting h3 (type of animal) & adding it's text content
            animalApp.animalDescription = document.querySelector('.animal-description');
            // Selecting the type of animal from user's input and display it
            animalApp.animalDescription.textContent = `${animalApp.logAnimal}`;
            // Display border around animal type once answer has loaded
            animalApp.animalDescription.style.display = 'grid';
            // Adding photographer credit below image:
            // Select <p class='photographer-credit'>
            animalApp.photographerCredit = document.querySelector('.photographer-credit');
            // Append 'Photography by:' to the <p> tag
            animalApp.photographerCredit.textContent = 'Photography by:';
            // Select <a class=photographer-link'>
            animalApp.photographerName = document.querySelector('.photographer-link');
            // Append photographer's name to the <a> tag
            animalApp.photographerName.textContent = jsonData.photos[animalApp.random].photographer;
            // Append the href attribute to the <a> tag so it link's to the photographer's profile.
            animalApp.photographerName.href = jsonData.photos[animalApp.random].photographer_url;
            //Smooth scroll for mobile on submit button
            //Select the ID for the position we want the page to scroll to
            animalApp.scrollToResult = document.querySelector('#scroll-to-result');
            // Use scrollIntoView() to scroll down to our ID
            animalApp.scrollToResult.scrollIntoView();
        } /* End of displayPhotos function */
    }); /* End of addEventListener for form submit */
}/* End of setupEventListener function */

// Initialization function:
animalApp.init = () => {
    animalApp.setupEventListener();
}
// Calling the init function:
animalApp.init();
