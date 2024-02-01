// 'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const renderCountry= function(data, className=''){
  const html=
  `<article class="country ${className}">
  <img class="country__img" src="${data.flag}" />
  <div class="country__data">
    <h3 class="country__name">${data.name}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(data.population/1000000).toFixed(1)}M people</p>
    <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
    <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
  </div>
</article>`

countriesContainer.insertAdjacentHTML('beforeend',html);
countriesContainer.style.opacity=1;

}
const renderError = function(msg){
  countriesContainer.insertAdjacentText("beforeend",msg);
  countriesContainer.style.opacity= 1;
}

const getCountryAndNeighbour= function(country){

    const request = fetch(`https://restcountries.com/v2/name/${country}`).then(response => 
      response.json()).then( data =>{
        renderCountry(data[0])
        const [...neighbour]=data[0].borders;
      let neighbouringCountries = [];
         neighbour.forEach(neigh => {  
        neighbouringCountries.push(fetch(`https://restcountries.com/v2/alpha/${neigh}`).then( response => response.json())); 
      
      });
      return neighbouringCountries;
       }).then((neighbouringCountries) => {neighbouringCountries.forEach( (response)=>{
        response.then( data2=> renderCountry(data2,'neighbour'))
        } )}).catch( err=> renderError(`sorry something went wrong ${err.message}`))
        //
      }
     btn.addEventListener('click',function(){
      getCountryAndNeighbour('rwanda');
     })
     
    







