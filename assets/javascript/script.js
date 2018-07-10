//array list of bands
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

//function to make buttons for the bands
function makeBandButton(band) {
    var button = $('<button>').text(band).addClass("bandButton");
    $('#bandButtonsDiv').append(button);
}

//loop over the bands array and call the makeBandButton to make the buttons
for (var index in bands) {
    makeBandButton(bands[index]);  
}

//when you click the add button, it takes the input and creates a button with the makeBandButton function
$('#addNew').on('click', function() {
    event.preventDefault();
    var newBand = $('input').val().trim(); 
    makeBandButton(newBand);
    $('input').val('');
});

//function to get the data from the Giphy API
function getGiphy(band) {
    var giphyQueryURL = "https://api.giphy.com/v1/gifs/search?q=" + band + "&api_key=GI4ebNfFXrRWvnyKNFJEMy4koZFJZDZ9&limit=10";

    $.ajax({url: giphyQueryURL})
    .then(function(giphyResponse) { 
        $('#displayGifs').empty();

        for (var i in giphyResponse["data"]) {
            var stillLink = giphyResponse["data"][i]["images"]["fixed_width_still"]["url"];
            var animatedLink = giphyResponse["data"][i]["images"]["fixed_width"]["url"];
            var rating = $('<p>').text("rating: " + giphyResponse["data"][i]["rating"]);
            var img = $("<img>");
            
            //adding the attributes to the img to be able to use them for the still and animate urls
            img.attr({
                src: stillLink,
                class: "giphy",
                "data-state": "still",
                "data-still": stillLink,
                "data-animate": animatedLink,
                "data-rating": giphyResponse["data"][i]["rating"]
            });

            var imgDiv = $('<div>').append(img, rating).addClass("imgDiv"); 
            $('#displayGifs').prepend(imgDiv);
        }
    });
}

//function to get data from the Bands In Town API
function getBandsInTown(band) {
    var bitQueryUrl = "https://rest.bandsintown.com/artists/" + band + "?app_id=codingbootcamp";

    $.ajax({url: bitQueryUrl})
    .then(function(bitResponse) { 
        var artistName = $("<h2>").text(bitResponse.name);
        var artistImage = $("<img>").attr("src", bitResponse.thumb_url);
        var trackerCount = $("<p>").text(bitResponse.tracker_count + " fans tracking this artist");
        var upcomingEvents = $("<p>").text(bitResponse.upcoming_event_count + " upcoming events");

        var goToArtist = $("<button>").attr("data-url", bitResponse.url);
        goToArtist.text("See Tour Dates").addClass("goToArtist");

        $('#bandInfo').empty();
        $('#bandInfo').append(artistName, artistImage, trackerCount, upcomingEvents, goToArtist);

    });
}

//when you click on the band button, you execute the getGiphy and getBandsInTown functions by using the button's text as the band name for the argument
$(document).on('click', '.bandButton', function() {
    var bandName = $(this).text();
    
    getGiphy(bandName);
    getBandsInTown(bandName);

});

//when you click on a gif, it will animate when it is still and vice versa
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

//function for the "See Tour Dates" button to open the link to the artists info in bandsintown.com
$(document).on("click", ".goToArtist", function() {
    window.open($(this).attr("data-url"));
});