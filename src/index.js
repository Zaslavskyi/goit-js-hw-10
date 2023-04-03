import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import fetchCountries from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const formInputEl = document.querySelector('[id="search-box"]');
const listEl = document.querySelector('.country-list');
const counrtyInfoEl = document.querySelector('.country-info');
let markup = '';

formInputEl.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));

function onInputSearch(e) {
    e.preventDefault();

    const formValue = formInputEl.value.trim();
    clearHTML();

    if (formValue === '') {
    return;
    }

    fetchCountries(formValue).then(onUpdateUI).catch(showError);
}

function onUpdateUI(countries) {
    if (!countries) {
    return;
    }

    if (countries.length > 10) {
    Notiflix.Notify.info(
        '"Too many matches found. Please enter a more specific name."'
    );
    return;
    }

    if (countries.length > 1 && countries.length < 10) {
    return makeCountriesListUI(countries);
    }

    if (countries.length === 1) {
    return makeCountryInfoUI(countries);
    }
}

function makeCountriesListUI(countries) {
    markup = countries
    .map(country => {
        return `
        <li class='item'>
            <img class="flag" src=${country.flags.svg} width="30"/>
            <p class="country-name--small">${country.name.common}</p>
        </li>`;
    })
    .join('');

    return listEl.insertAdjacentHTML('afterbegin', markup);
}

function makeCountryInfoUI(country) {
    markup = country
    .map(country => {
        return `
            <span>
                <img class="flag" src=${country.flags.svg} width="30"/>
            </span>
            <p class="country-name--big">${country.name.common}</p>
        <ul class="country-list">
            <li class="country-list__item">
                <p class="country-list__text">Capital: ${country.capital}</p>
            </li>
            <li class="country-list__item">
                <p class="country-list__text">Population: ${country.population}</p>
            </li>
            <li class="country-list__item">
                <p class="country-list__text">Languages: ${Object.values(country.languages).join(', ')}</p>
            </li>
        </ul>`;
    })
    .join('');

    return counrtyInfoEl.insertAdjacentHTML('afterbegin', markup);
}

function clearHTML() {
    counrtyInfoEl.innerHTML = '';
    listEl.innerHTML = '';
}

function showError() {
    return Notiflix.Notify.failure('Oops, there is no country with that name');
}
