# Module6-WeatherDashboard
Using the weather API provided, this week's challenge was to build a weather application that allows the user to search for cities, provide the current weather of the city, and give a 5 day forecast. Cities that have already been searched are saved in a list that the user can use to display information on cities they've searched before, utilizing local storage.

## Deployed Link
TBA

## Description
- Entering in a city name will give you a response.
  - There are no checks for latitude and longitude-- the query for the API just uses the city's name.
- The weather information includes the temperature, icon for the weather, wind speed, and humidity levels
  - for the 5-day forecast, averages were taken based on the 5-day 3-hour response gotten from the OpenWeather API. For example, whichever weather icon appeared the most frequently was the one used, the mean wind speeds and humidity levels per day were calculated, and the high and low temperatures per day are displayed.

## Installation
N/A

## Usage
- Enter in a city name and click "search" to get the current weather and 5 day forecast
- Once you've entered a valid city name, a button will be created with the name of the button. Clicking on this button pulls up the weather information on that city.

## Tools/APIs used
- [jQuery](https://api.jquery.com/)
- [Bootstrap](https://getbootstrap.com/docs/5.2/getting-started/introduction/)
- [Open Weather Map](https://openweathermap.org/)
