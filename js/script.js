"use strict";

let inforamationEl = document.querySelector(".info");
let flagEl = document.querySelector(".flag");
let sideCountriesEl = document.querySelector(".side-country");
let searchContainerEl = document.querySelector(".search-con");
let inputEl = document.querySelector("input");
let searchBtnEl = document.querySelector("#search");
let borders;

searchBtnEl.addEventListener("click", async () => {
  try {
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${inputEl.value}`
    );
    const data = await res.json();
    inforamationEl.innerHTML = `
            <h2>Full Name: ${data[0].name?.official}</h2>
            <p>Country Code: ${data[0]?.cca3}</p>
            <p>Capital: ${data[0]?.capital}</p>
            <p>Region: ${data[0]?.region}</p>
            <p>Languages: ${Object.values(data[0]?.languages)}</p>
            <p>Area: ${data[0]?.area}</p>
            <p>Population: ${data[0]?.population}</p>
            <p>Time Zone: ${data[0]?.timezones}</p>
            <p>Start Of Week: ${data[0]?.startOfWeek}</p>
            
        `;
    flagEl.innerHTML = `<img src='${data[0].flags.svg}' />`;

    borders = data[0].borders;
  } catch (error) {
    console.log(error);
    //alert('Connection Failed please check your Internet or Connect your VPN')
  }

  try {
    const resB = await fetch(
      `https://restcountries.com/v3.1/alpha?codes=${borders}`
    );
    const dataB = await resB.json();
    dataB.map((e) => {
      sideCountriesEl.innerHTML += `   <div class='card'>
                    <img src='${e.flags.svg}'>
                    <p>${e.name.official}</p>
                </div> 
            
            `;
    });
  } catch (error) {
    console.log(error);
  }
  //console.log(inputEl.value);
});
