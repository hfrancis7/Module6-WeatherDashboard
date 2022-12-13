const API_KEY = "861f2cb6b96250af24f566edb2fe2923";

//TODO: When you type a city into search input:
    //add city to existing list, saving data about the city to be referred to later
    //display the information from the weather api

function search(){
    var searchInput = $("#search-input").val();
    addToList(searchInput);
    $("#search-input").val("");
    
    
    

}

function fetchAPI(searchInput){
    fetch("https://api.openweathermap.org/data/2.5/weather?q={" + searchInput  + "}&appid={" + API_KEY + "}")
    
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
    });
}

function addToList(city){
    //TODO: find a way to check to see if it's already on the list
    //likely will use local storage
    $("#city-list").append("<li><button type=\"button\" id=\"" + city + "\">" + city + "</button></li>");

}

$("#search-btn").click(search);



