const API_KEY = "861f2cb6b96250af24f566edb2fe2923";
const date = dayjs().format("MM/DD/YY");

//TODO: When you type a city into search input:
    //add city to existing list, saving data about the city to be referred to later
    //display the information from the weather api

function search(){
    var searchInput = $("#search-input").val();
    fetchAPI(searchInput);
    $("#search-input").val("");
}

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

function displayToday(city){
    $("#today-city-name").text("City: " + city.name + " ("+ date +")");
    $("#today-city-temp").text("Temperature: " + fahrenheit(city.main.temp) + '\u00B0F');
    $("#today-city-wind").text("Wind: " + mph(city.wind.speed) + " MPH");
    $("#today-city-humidity").text("Humidity: " + city.main.humidity + "%");
}

function addToList(city){
    var key = "HDF-weatherApp-" + city;
    localStorage.setItem(key, city);
    $("#city-list").append("<button type=\"button\" class=\"saved-city\">" + city + "</button>");

}

function displayList(){
    Object.keys(localStorage).forEach((key) => {
        if(key.includes("HDF-weatherApp-")){
            var name = localStorage.getItem(key);
            $("#city-list").append("<button type=\"button\" class=\"saved-city\">" + name + "</button>");
        }
    });
}

function fahrenheit(kelvin){
    return Math.round(1.8 * (kelvin - 273.15) + 32);
}

function mph(mps){
    return (mps / 0.44704).toFixed(1);
}

displayList();
$("#search-btn").click(search);
$("#city-list").on("click", ".saved-city", function(){
    fetchAPI($(this).text());
})



