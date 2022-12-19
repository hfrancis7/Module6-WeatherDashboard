const API_KEY = "861f2cb6b96250af24f566edb2fe2923";

//calls the fetchWeatherAPI function and clears the search input
function search(){
    var searchInput = $("#search-input").val();
    fetchWeatherAPI(searchInput);
    $("#search-input").val("");
}

//crates a fetch for weather, returning alerts if there are errors, returning API data if status ok, calls functions to display data from API
function fetchWeatherAPI(input){
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + input + "&appid=" + API_KEY +"&units=imperial";
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
            fetchForecastAPI(name);
            displayToday(data);
            
        });
}

//creates a fetch for 5day forecast, returns alerts if there are errors, returning API data if status ok, calls functions to display 5-day forecast
function fetchForecastAPI(input){
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + input + "&appid=" + API_KEY +"&units=imperial&";
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
            display_5day(data);
        });
    
}

//builds an array of forecast objects that can used to display the average 5-day forecast weather info
function buildForecast(city){
    //API returns 40 forecasts, 3 hour increments.
    console.log(city); 
    var API_forecastList = city.list;
    var today = dayjs().format("MM/DD/YY");
    console.log("today",today)
    var forecasts = [];
    var temp_high = -1000;
    var temp_low = 1000;
    var prevDate = today;
    var curDate = today;
    var avg_windSpeed = 0;
    var avg_humidity = 0;
    var dataPts = 0;

    //get date from each object
    for(i = 0; i < API_forecastList.length; i++){
       //save the date of the current forecast in the list and the date of the forecast before it
       //if we are at i=0, then we just save the current date.
       //if the prevDate doesn't equal the current date, then we save the results and reset the process
        var dateUnix = API_forecastList[i].dt;
        curDate = dayjs.unix(dateUnix).format("MM/DD/YY");
        if(i != 0){
            var prevDateUnix = API_forecastList[i-1].dt;
            prevDate = dayjs.unix(prevDateUnix).format("MM/DD/YY");
        }else{
            prevDate = curDate;
        }
        //if the date is today, then we move on to the next iteration of the loop
        console.log("i",i);
        console.log("curDate",curDate);
        console.log("today",today);

        if(curDate == today){
            console.log("continue", true)
            continue;
        }

        //if the dates have transitioned to the next day, save the previous date's data and reset
        if((curDate != prevDate) && (prevDate != today)){
            var newForecast = {
                date: prevDate,
                highTemp: temp_high,
                lowTemp: temp_low,
                windSpeed: (avg_windSpeed / dataPts).toFixed(2), //find the mean wind speed to 2 decimal places
                //humidity: (avg_humidity / dataPts).toFixed(0), //finds the mean humidity
                
            }
            console.log("newForecast", newForecast)
            forecasts.push(newForecast);
            temp_high = -1000;
            temp_low = 1000;
            avg_windSpeed = 0;
            //avg_humidity = 0;
            dataPts = 0;
        }

        if(temp_high < city.list[i].main.temp_max){
            temp_high = city.list[i].main.temp_max;
        }
        if(temp_low > city.list[i].main.temp_min){
            temp_low = city.list[i].main.temp_min;
        }
        avg_windSpeed += city.list[i].wind.speed; //adding up all wind speeds of current day
        //avg_humidity += city.list[i].main.humidity; //adding up all humidity
        dataPts++; //getting data points for current day to later divide by
    }

    return forecasts;

    

}


//Displays the relevant information using today's date
function displayToday(city){
    var dateTest = dayjs.unix(city.dt).format("MM/DD/YY");
    $("#today-city-name").text(city.name + " ("+ dateTest +") ");
    $("#icon").attr("src","http://openweathermap.org/img/w/" + city.weather[0].icon + ".png")
    $("#today-city-temp").text("Temperature: " + city.main.temp + "\u00B0F");
    $("#today-city-wind").text("Wind: " + city.wind.speed + " MPH");
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


function display_5day(city){
    var forecastList = buildForecast(city);
    console.log(forecastList);
    $(".forecast-day-container").show();

    var i = 0;
    $(".forecast-day-container").each(function(){
        $(this).children(".current-forecast-date").text(forecastList[i].date);
        //$(this).children("img").attr(attr("src","http://openweathermap.org/img/w/" + city.weather[0].icon + ".png");)
        $(this).children(".high").text("High: " + forecastList[i].highTemp + "\u00B0F");
        $(this).children(".low").text("Low: " + forecastList[i].lowTemp + "\u00B0F");
        $(this).children(".wind").text("Avg Wind: " + forecastList[i].windSpeed + " MPH");
        //$(this).children(".humidity").text("Avg Humidity: " + forecastList[i].humidity + "%");
        i++;
    })
    
    console.log(city);
}

//BUTTONS
$("#search-btn").click(search);
$("#city-list").on("click", ".saved-city", function(){
    fetchWeatherAPI($(this).text());
})

displayList();
