var bands = [
    "Beyonce", 
    "JAYZ",
    "J. Cole",
    "Nicki Minaj",
    "Ariana Grande",
    "The Weeknd",
    "Spice Girls",
    "Rihanna",
    "NSYNC",
    "Backstreet Boys",
    "A$AP Rocky",
    "Drake"
];

function makeBandButton(band) {
    var button = $('<button>').text(band);
    $('#bandButtons').append(button);
}

for (var index in bands) {
    makeBandButton(bands[index]);  
}

$('#addNew').on('click', function() {
    event.preventDefault();
    var newBand = $('input').val().trim(); 
    makeBandButton(newBand);
    $('input').val('');
});

$(document).on('click', '#bandButtons button', function() {
    var buttonClick = $(this);
    var bandName = buttonClick.text();
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + bandName + "&api_key=GI4ebNfFXrRWvnyKNFJEMy4koZFJZDZ9&limit=10";

    $.ajax({url: queryURL})
    .then(function(response){ 
        for (var i in response["data"]) {
            var stillLink = response["data"][i]["images"]["fixed_width_still"]["url"];
            var animatedLink = response["data"][i]["images"]["fixed_width"]["url"];
            var rating = $('<p>').text("rating: " + response["data"][i]["rating"]);
            var img = $("<img>");

            img.attr({
                src: stillLink,
                class: "giphy",
                "data-state": "still",
                "data-still": stillLink,
                "data-animate": animatedLink,
                "data-rating": response["data"][i]["rating"]
            });
            
            

            $('#displayGifs').prepend(img, rating);
        }
    });   
});

$(document).on("click", ".giphy", function() {
    var gif = $(this);
    var state = gif.attr('data-state');
    var animate = gif.attr('data-animate');
    var still = gif.attr('data-still');

    if (state === "still") {
        gif.attr('src', animate);
        gif.attr('data-state', "animate");
    } else {
        gif.attr('src', still);
        gif.attr('data-state', "still");
    }
});