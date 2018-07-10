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
    var button = $('<button>').text(band).addClass("bandButton");
    $('#bandButtonsDiv').append(button);
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


$(document).on('click', '.bandButton', function() {
    var bandName = $(this).text();
    
    getGiphy(bandName);
    getBandsInTown(bandName);

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

$(document).on("click", ".goToArtist", function() {
    window.open($(this).attr("data-url"));
});