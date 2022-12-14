const API_KEY = "861f2cb6b96250af24f566edb2fe2923";

//TODO: When you type a city into search input:
    //add city to existing list, saving data about the city to be referred to later
    //display the information from the weather api

function search(){
    var searchInput = $("#search-input").val();
    addToList(searchInput);
    fetchAPI(searchInput);
    $("#search-input").val("");
}

function fetchAPI(input){
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + input + "&appid=" + API_KEY;
    fetch(queryURL)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
            displayToday(data);
        });
}

function displayToday(city){
    $("#today-city-name").text("City: " + city.name + " (date)");
    $("#today-city-temp").text("Temperature: " + fahrenheit(city.main.temp) + '\u00B0F');
    $("#today-city-wind").text("Wind: " + city.wind.speed);
    $("#today-city-humidity").text("Humidity: " + city.main.humidity);
    console.log("yes");
}

function addToList(city){
    //TODO: find a way to check to see if it's already on the list
    //likely will use local storage
    $("#city-list").append("<li><button type=\"button\" id=\"" + city + "\">" + city + "</button></li>");

}

function fahrenheit(kelvin){
    return Math.round(1.8 * (kelvin - 273.15) + 32);
}

$("#search-btn").click(search);



