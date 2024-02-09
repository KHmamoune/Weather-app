const country = document.querySelector(".country")
const btn = document.querySelector(".btn")
const dataHolder = document.querySelector(".data")
const unit = document.querySelector(".unit")

btn.addEventListener("click", () => {
  getWeather(country.value)
})

async function getWeather(country){
  try {
    let load = document.createElement("div")
    load.textContent = "Loading"
    dataHolder.appendChild(load)

    let response = await fetch("https://api.weatherapi.com/v1/forecast.json?key=c878d4b57cb24a55833203857240802&q=" + country + "&days=3", {mode : "cors"})
    let data = await response.json()

    logData(data)
    displayData(data)
  } catch(err) {
    console.log("error: " + err)
  }
}

function logData(data){
  let arr = [data.forecast.forecastday["0"], data.forecast.forecastday["1"], data.forecast.forecastday["2"]]

  for(let i = 0; i < arr.length; i++){
    console.log(arr[i].date)

    for(let j = 0; j < 24; j++){
      let forecast = arr[i].hour[j.toString()]

      console.log(forecast.time.split(" ")[1])
      console.log(forecast.temp_c)
      console.log(forecast.temp_f)
      console.log(forecast.condition.text)
      console.log(forecast.condition.icon)
    }
    console.log("===========================================")
  }
}

function displayData(data){
  dataHolder.innerHTML = ""
  let arr = [data.forecast.forecastday["0"], data.forecast.forecastday["1"], data.forecast.forecastday["2"]]

  for(let i = 0; i < arr.length; i++){
    let elem = document.createElement("div")
    elem.innerHTML = `<p>${arr[i].date}</p>`

    for(let j = 0; j < 24; j++){
      let forecast = arr[i].hour[j.toString()]

      elem.innerHTML += `<p>time: ${forecast.time.split(" ")[1]}<br>`

      if(unit.value == "C"){
        elem.innerHTML += `celcius: ${forecast.temp_c} C</p>`
      }else{
        elem.innerHTML += `farenheit: ${forecast.temp_f} F</p>`
      }

      elem.innerHTML += `<div class="weather">
          <img src="${forecast.condition.icon.substring(21)}" width="25px" height="25px">
          <p>${forecast.condition.text}</p>
        </div>`
    }
    dataHolder.appendChild(elem)
  }
}
