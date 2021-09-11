window.addEventListener("load", ()=> {
    let long;
    let lat;

    temperature = document.querySelector('#temperature');
    feelslike = document.querySelector('#feelslike');
    citytext = document.querySelector('#city');
    weathertext = document.querySelector('#weather');
    webtitle = document.querySelector('title');
    icon = document.getElementById("icon");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position);
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/'
            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=50a7aa80fa492fa92e874d23ad061374`;
            console.log(api);
            fetch(api)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    let {temp, feels_like} = data.main;
                    let city = data.name;
                    let country = data.sys.country;
                    let weather = data.weather[0].main;
                    temp = (temp - 273).toFixed(0);
                    feels_like = (feels_like - 273).toFixed(0);

                    //console.log(temp);
                    //console.log(feels_like);
                    //console.log(city, country);
                    //console.log(weather);

                    temperature.textContent = temp + ' \u00B0C' ;
                    feelslike.textContent = "Feels Like: " + feels_like + ' \u00B0C';
                    citytext.textContent = city + ", " + country;
                    weathertext.textContent = weather;
                    webtitle.textContent = "Weather " + temp + ' \u00B0C ';

                    if (weather.includes('Cloud')) {
                        icon.src="animated/cloudy.svg";
                    }

                    if (weather.includes('Clear')) {
                        icon.src="animated/day.svg";
                    }

                    if (weather.includes('Snow')) {
                        icon.src="animated/snowy-1.svg";
                    }

                    if (weather.includes('Thunderstorm')) {
                        icon.src="animated/thunder.svg";
                    }

                    if (weather.includes('Rain')) {
                        icon.src="animated/rainy-1.svg";
                    }

                    if (weather.includes('Drizzle')) {
                        icon.src="animated/rainy-2.svg";
                    }

                });
            
        });
    }
});
