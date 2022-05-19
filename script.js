
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
    })
 }
 