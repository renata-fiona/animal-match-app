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

});