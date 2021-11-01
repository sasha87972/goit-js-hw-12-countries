import './sass/main.scss';
import fetchCountries from './js/fetchCountries';
import countryCard from './templates/country-card.hbs';
import countryList from './templates/country-list.hbs';
import { error } from '@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/BrightTheme.css';



const debounce = require('lodash.debounce');
const refs = {
    searchInput: document.querySelector('.search__input'),
    countryOutput: document.querySelector('.country__wrapper')
}

refs.searchInput.addEventListener('input', debounce(searchCountry, 500));

function searchCountry() {
    let searchQuery = refs.searchInput.value;
    fetchCountries(searchQuery).then(render);
    
}
    

function render(searchResult) {
    refs.countryOutput.innerHTML = '';
    if (searchResult.length === 1) {
        refs.countryOutput.insertAdjacentHTML('beforeend', countryCard(searchResult));
        refs.searchInput.value = '';
    }
    else if (searchResult.length <= 10) {
        refs.countryOutput.insertAdjacentHTML('beforeend', countryList(searchResult));
    }
    else if (searchResult.length > 10){
        error({
            title: false,
            text: 'Too many matches found. Please enter a more spesific query!',
            closer: false,
            sticker: false,
            hide: true,
            delay: 500,
            remove: true,
        });
    }
    else refs.countryOutput.innerHTML = 'No matches found.';
    }    
            
            
  


