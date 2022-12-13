const API_KEY = "861f2cb6b96250af24f566edb2fe2923";

//TODO: When you type a city into search input:
    //add city to existing list, saving data about the city to be referred to later
    //display the information from the weather api

function search(){
    var searchInput = $("#search-input").val();
    
    fetch("https://api.openweathermap.org/data/2.5/weather?q={" + searchInput  + "}&appid={" + API_KEY + "}")
    
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
    });

}

$("#search-btn").click(search);

