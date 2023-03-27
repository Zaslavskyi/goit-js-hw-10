import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import fetchCountryName from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const refs = {
    inputElement: document.querySelector('#search-box'),
    listElement: document.querySelector('.country-list'),
    divElement: document.querySelector('.country-info'),
};




