// Initial array of animals
var animals = ["dog", "cat", "bird", "fish", "pig", "bear", "tiger"]; 


// displayGifInfo function re-renders the HTML to display the appropriate content
function displayGifInfo() {
  var animal = $(this).attr("data-animal"); 

  var APIKey = "75iukG2rY9lYz0IMDzgKCKeXmcDork08";
  var queryURL ="https://api.giphy.com/v1/gifs/search?q="+ animal + "&api_key=" + APIKey+ "&limit=10&rating=G";

  // Creates AJAX call for the specific gif button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {

    // data is an object, print each value
    const result = response.data;

    for (var i = 0; i < result.length; i++) {
      var mainDiv = $("<div>");
      mainDiv.addClass('floatDiv');
      var rating = $("<p>").text("Rating: " + result[i].rating);
      rating.css('color', 'rgb(72,142,148)');
      var animalImage = $("<img>");
      animalImage.addClass('gif fixedHeight ');
      animalImage.attr("src", result[i].images.original_still.url);

      //assign data-attributes to each gif.  Each gif needs a still image and an animated gif
      animalImage.attr("data-still", result[i].images.original_still.url);
      animalImage.attr("data-animated", result[i].images.original.url);
      animalImage.attr("data-state", "still");
      mainDiv.append(rating);
      mainDiv.append(animalImage);

      $("#gifs-view").prepend(mainDiv);   //prepend puts the new mainDive ontop of the old mainDiv

      // Check the state of the data-stat.  Once click, if the stat is still then change it to animated and vis versa
      $('.gif').on('click', function(){
        var status = $(this).attr('data-state');
      
        if(status === 'still') {
          var url = $(this).attr('data-animated');

          $(this).attr('src', url)
          $(this).attr('data-state', 'animated')
        }
        else if (status === 'animated') {
          var url = $(this).attr('data-still');

          $(this).attr('src', url)
          $(this).attr('data-state', 'still')
        };
      });
    }; //ENDS the For Loop
  });
}; //ENDS displayGifInfo function


// Turn the elements in the array into buttons and print them on DOM
function renderButtons() {
  $("#buttons-view").empty();

  for (var i = 0; i < animals.length; i++) {
    var button = $("<button>");
    button.addClass("gifButton prettyBtn")
    button.attr("data-animal", animals[i])
    button.text(animals[i])

    $("#buttons-view").append(button);
  }
};


// When this button is click, add the animal in the input feild
$("#add-gif").on("click", function(event) {
  //prevents the submit button from submiting its default action to submit the form
  event.preventDefault();

  var newAnimal = $("#gif-input").val().trim();
 
  animals.push(newAnimal);

  renderButtons();
});


// click on the clearBtn to clear all gif
$('#clearBtn').on('click', function() {
  $('#gifs-view').empty()
})

// when any class of gifButton is click
$(document).on("click", ".gifButton", displayGifInfo);
renderButtons();
