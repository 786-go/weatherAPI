
let submit = document.getElementById("theButton")
let API = "1648bacc19c6e7e16cc0433fba4bc9ca"
 submit.addEventListener("click", function(event){
     event.preventDefault()
     let cityName = document.getElementById("areaName").value
     getCoordinates(cityName)
 }
 )

 function getCoordinates(cityName){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API}`)
    .then(Response => Response.json())
    .then(data => {
        console.log(data)
        let lat = data.coord.lat
        let lon = data.coord.lon
        getForecast(lat,lon,cityName)
        let newDiv = document.createElement("div")
        let cityHeader = document.createElement("h3")
        cityHeader.textContent = data.name
        let dataDiv = document.createElement("div")
        dataDiv.textContent = JSON.stringify(data)
        newDiv.append(cityHeader, dataDiv)
        document.querySelector("#weatherdata").appendChild(newDiv)
    })
 }
 
 function getForecast(lat,lon,city){
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API}&units=imperial`)
    .then(Response => Response.json())
    .then(data => {
        console.log(data)
        document.getElementById("weatherdata").innerHTML=`<div class="card" style="width: 18rem;">
        <h5 class="card-title">${city}'s forecast for today</h5>
        <img src="http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png" class="card-img-top" alt="...">

        <div class="card-body">
          <h5 class="card-title">Temp: ${data.current.temp} Kelvin</h5>
          <p class="card-text">Wind Speed: ${data.current.wind_speed}</p>
          <p class="card-text">Humidity: ${data.current.humidity}</p>
          <p class="card-text">UV Index: ${data.current.uvi}</p>
          <p class="card-text">Description: ${data.current.weather[0].description}</p>


        
      
      </div>`
      let fivedayHTML = ""
      for(i=0; i<5; i++) {
            fivedayHTML+= `<div class="card" style="width: 14rem;">
            <h5 class="card-title">Day ${i+1}</h5>
            <img src="http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png" class="card-img-top" alt="...">
    
            <div class="card-body">
              <h5 class="card-title">Temp: ${data.daily[i].temp.day} Kelvin</h5>
              <p class="card-text">Wind Speed: ${data.daily[i].wind_speed}</p>
              <p class="card-text">Humidity: ${data.daily[i].humidity}</p>
              <p class="card-text">UV Index: ${data.daily[i].uvi}</p>
              <p class="card-text">Description: ${data.daily[i].weather[0].description}</p>
    
    
            
            </div>
          </div>`
      }
      document.getElementById("fiveday").innerHTML= fivedayHTML
 })
}