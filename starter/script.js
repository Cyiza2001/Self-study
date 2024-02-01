// 'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
//render a country using a template literal
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
//a function that will dislay a message on the UI whenever there is a fetching error
const renderError = function(msg){
  countriesContainer.insertAdjacentText("beforeend",msg);
  countriesContainer.style.opacity= 1;
}
//getjson function is in charge of throwing errors
const getJson = function(url,errormsg="something went wrong"){
  return fetch(url).then((response) =>{
    //if country is not found throw an error to display that the country is not found
  if(!response.ok)
    throw new Error(`${errormsg} (${response.status})`);
  return response.json()
 
})

}
const getCountryAndNeighbour= function(country){
    getJson(`https://restcountries.com/v2/name/${country}`,'country not found')
    .then( (data) =>{
    
        renderCountry(data[0])
        //check if there is a neigbouring country if not caught the error
         if(!data[0].borders)
          {
             throw new Error('there is no neighbour')};
     
        //destructure all the neighbouring countries in an arrray
        const [...neighbour]=data[0].borders;
     
        //push each neighbour country that has already been fetched into an array
      let neighbouringCountries = [];
//loop over the array of the neighbouring countries
         neighbour.forEach(neigh => {   
        neighbouringCountries.push(getJson(`https://restcountries.com/v2/alpha/${neigh}`,'country not found'));
      
      });
      //neighbouring countries are json promises i will just call a then method after 
      return neighbouringCountries;
       }).then((neighbouringCountries) => {neighbouringCountries.forEach( (response)=>{
        response.then( data2=> renderCountry(data2,'neighbour'))
        } )}).catch( err=> renderError(`sorry something went wrong ${err.message}`))
        //
      }
     btn.addEventListener('click',function(){
      getCountryAndNeighbour('usa');
     })
     
    







