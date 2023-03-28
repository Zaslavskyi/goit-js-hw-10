import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import fetchCountries from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const inputElement = document.querySelector('[id = "search-box"]');
const listElement = document.querySelector('.country-list');
const divElement = document.querySelector('.country-info');

let markup = '';


inputElement.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));

function onInputSearch(e) {
    e.preventDefault();

    const formValue = inputElement.value.trim();
    clearHTML();

    if (formValue === '') {
        return;
    }

    fetchCountries(formValue).then(onUpdateUi).catch(showError);
}

function onUpdateUi(countries) {
    if (!countries) {
        return;
    }

    if (countries.length > 10) {
        Notiflix.Notify.info('"Too many matches found. Please enter a more specific name." ');
        return;
    };

    if (countries.length > 1) {
        return makeCountriesList(countries);
    };

    if (countries.length === 1) {
        return makeCountriesInfo(countries);
    };
};

function makeCountriesList(countries) {
    markup = countries
    .map(country => {
        return `<li class="item"><img class="flag" src=${country.flag.svg} width="30"/><p class="country-name--small">${country.name.common}</p></li>`;
    })
    .join('');

    return listElement.insertAdjacentHTML('afterbegin', markup);
}

function makeCountriesInfo(country) {
    markup = country
    .map(country => {
        return `
        <div class="country"> <span><img class"flag" src=${country.flags.svg} width="30"/></span>
        <p class="country-name--big">${country.name.common}</p>
        <ul class="country-list">
        <li class="country-list__item"><p class="country-list__text"> Capital:${country.capital}</p></li>
        <li class="country-list__item"><p calss="country-list__text">Population:${country.population}</p></li>
        <li class="country-list__item"><p class="country-list__text">Languages:${Object.values(country.languages).join(',')}</p></li></ul></div>`;
    })
    .join('');
    return divElement.insertAdjacentHTML('afterbegin', markup);
};

function clearHTML() {
    divElement.innerHTML = '';
    listElement.innerHTML = '';
};

function showError() {
    return Notiflix.Notify.failure('Oops, there is no country with that name...');
}
