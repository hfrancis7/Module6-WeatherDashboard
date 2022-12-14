const API_KEY = "861f2cb6b96250af24f566edb2fe2923";
const date = dayjs().format("MM/DD/YY");

//TODO: 
    //5-day forecast

//calls the fetchAPI function and clears the search input
function search(){
    var searchInput = $("#search-input").val();
    fetchAPI(searchInput);
    $("#search-input").val("");
}

//crates a fetch, returning alerts if there are errors, returning API data if status ok, calls functions to display data from API
function fetchAPI(input){
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + input + "&appid=" + API_KEY;
    fetch(queryURL)
        .then(function(response){
            if(response.ok){
                return response.json();
            }else if(response.status == 400){
                alert("HTTP-Error: " + response.status + "\nPlease enter a valid city name in the Search bar.");
            }else if(response.status == 404){
                alert("HTTP-Error: " + response.status + "\nThe city name you entered is not valid.\nPlease enter a valid city name in the Search bar.");
            }else{
                alert("HTTP-Error: " + response.status);
            }
            
        })
        .then(function(data){
            var name = data.name;
            var testKey = "HDF-weatherApp-" + name;
            if(!(localStorage.getItem(testKey))){
                addToList(name);
            }
            displayToday(data);
            
        });
}

//Displays the relevant information using today's date
function displayToday(city){
    $("#today-city-name").text("City: " + city.name + " ("+ date +")");
    $("#today-city-temp").text("Temperature: " + fahrenheit(city.main.temp) + '\u00B0F');
    $("#today-city-wind").text("Wind: " + mph(city.wind.speed) + " MPH");
    $("#today-city-humidity").text("Humidity: " + city.main.humidity + "%");
}

//adds a button for a city to the list. creates an item in local storage containing city name
function addToList(city){
    var key = "HDF-weatherApp-" + city;
    localStorage.setItem(key, city);
    $("#city-list").append("<button type=\"button\" class=\"saved-city\">" + city + "</button>");

}

//cycles through local storage and displays the buttons of previously searched cities on load time
function displayList(){
    Object.keys(localStorage).forEach((key) => {
        if(key.includes("HDF-weatherApp-")){
            var name = localStorage.getItem(key);
            $("#city-list").append("<button type=\"button\" class=\"saved-city\">" + name + "</button>");
        }
    });
}

//converts Kelvin to Fahrenheit
function fahrenheit(kelvin){
    return Math.round(1.8 * (kelvin - 273.15) + 32);
}

//converts m/s to mph
function mph(mps){
    return (mps / 0.44704).toFixed(1);
}

//BUTTONS
$("#search-btn").click(search);
$("#city-list").on("click", ".saved-city", function(){
    fetchAPI($(this).text());
})

displayList();



