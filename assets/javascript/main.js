$(document).ready(function() {

    $("button").on("click", function() {
        var APIKey = "PEfiIATLPiakr520Rsy2ZAz4UaOZafG2";
        var animal = "bird";
        var queryURL ="https://api.giphy.com/v1/gifs/search?q="+ animal + "&api_key=" + APIKey+ "&limit=10";
        
        $.ajax({
              url: queryURL,
              method: "GET"
            }).then(function(response) {
                console.log(response)
                //var result = response.data;
              for (let i in response.data) {
                $("#new-div-goes-here").text("Rating: "+ response.data[i].rating)
                $("#new-div-goes-here").append("<img src='" + response.data[i].images.original.url + "'/>");
              }
            });//closes ajax request
    });


})
