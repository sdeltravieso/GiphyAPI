var foods = ["Spaghetti", "Tacos", "Pizza", "Chinese Food"];
var stillImage;
var animatedImage;
var gifImage;
var currentImage;
var state;
var foodDiv;
var rating;

function displayFoods() {
    $('#foods').empty();
    // get value from whichever button is pushed.
    var food = $(this).attr("data-foodName");

    // API Key
    var APIKey = "jK14x657apo3N08hApnlBsGP9eHGYf6m";
    // creating queryURL with APIKey and whatever button was pushed.
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + APIKey + "&q=" + food +
        "&limit=10&offset=0&rating=G&lang=en";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        // $("#movies-view").text(JSON.stringify(response));
        results = response.data;
        
        for (var i = 0; i < response.data.length; i++) {
            
            stillImage = results[i].images.original_still.url;
            // stillImage.attr('data-still', 'still');
            animatedImage = results[i].images.original.url;
            // animatedImage.attr('data-animate');

            foodDiv = $("<div>");

            rating = $("<p>").text("Rating: " + results[i].rating);

            gifImage = $("<img>");

            gifImage.attr('src', stillImage);
            gifImage.attr('data-state', 'still');
            gifImage.addClass('gif');
            // gifImage.attr('value', i);

            foodDiv.append(rating);
            foodDiv.append(gifImage);

            // console.log(gifImage);
            $("#foods").append(foodDiv);



        };
        // when clicking on the gif
        // $('#foods').on('click', '.gif', function () {
        //     currentImage = $(this);
        //     state = $(currentImage).attr('data-state');

        //     // $('.gif').on('click', function() {
        //     if (state === 'still') {
        //         // currentImage.attr('src', currentImage.attr('data-animate'));
        //         currentImage.attr('src', animatedImage);
        //         currentImage.attr('data-state', 'animate');
        //         console.log(currentImage.attr('src', animatedImage));
        //     } else {
        //         currentImage.attr('src', stillImage)
        //         currentImage.attr('data-state', 'still');
        //     }
        //     // $("#foods").append(gifImage);

        // });
        
        
    });
}

// generate the buttons on the screete
function createButtons() {
    $('#foodButtons').empty();
    
    for (var i = 0; i < foods.length; i++) {
        var button = $("<button>");
        
        button.addClass("food-btn");
        button.attr("data-foodName", foods[i]);
        button.text(foods[i]);
        $("#foodButtons").append(button);
    }
}

// add more items to array to make more buttons.
$('#addFood').on("click", function(event) {
    event.preventDefault();
    
    var food = $("#foodInput").val().trim();
    
    foods.push(food);
    
    createButtons();
})
createButtons();

$(document).on("click", ".food-btn", displayFoods);

$('#foods').on('click', '.gif', function () {
    // currentImage = $(this);
    state = $(this).attr('data-state');

    // $('.gif').on('click', function() {
    if (state === 'still') {
        // currentImage.attr('src', currentImage.attr('data-animate'));
        $(this).attr('src', animatedImage);
        $(this).attr('data-state', 'animate');
        console.log($(this).attr('src', animatedImage));
    } else {
        $(this).attr('src', stillImage)
        $(this).attr('data-state', 'still');
    }
    // $("#foods").append(gifImage);

});