import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import fetchCountryName from './fetchCountries';


const refs = {
    inputElement: document.querySelector('#search-box'),
    listElement: document.querySelector('.country-list'),
    divElement: document.querySelector('.country-info'),
};

let debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;
refs.inputElement.addEventListener('input', debounce(onCountryInput, DEBOUNCE_DELAY));

function onCountryInput(e) {
    let countryName = e.target.value.trim();

    if (countryName === '') {
        if (refs.listElement.innerHTML !== '' || refs.divElement.innerHTML !== '') {
            refs.divElement.innerHTML = '';
            refs.listElement.innerHTML = '';
        };
        return;
    };

    fetchCountryName(countryName)
    .then(data => {
        if (data.length > 10) {
            Notiflix.Notify.success('Too many matches found. Please enter a more specific name.');
        }

        if (data.length >= 2 && data.length <=10) {
            refs.divElement.innerHTML = '';
            refs.listElement.innerHTML = markupForSymbols(data);
        }

        if (data.length === 1) {
            refs.listElement.innerHTML = '';
            console.log(data);
            refs.divElement.innerHTML = markupForCountry(data);
        };
    })
    .catch(error => {
        console.log(error);
        Notiflix.Notify.warning('Oops, there is no country with that name');
    });
};

function markupForCountry(array) {
    return array.map(({name, capital, population, flags, languages}) => {
        return ` <p class = "title"><img src="${flags.svg} alt="flag of ${name.official}" width="70" height="50"> ${name.official}</p>
        <p><span> Capital:</span> ${capital}</p>
        <p><span> Languages:</span> ${Object.values(languages)}</p>`
    })
    .join('');
}
