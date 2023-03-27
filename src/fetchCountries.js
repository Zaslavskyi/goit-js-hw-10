export default function fetchCountryName(countryName) {
    const URL = `https://restcountries.com/v3.1/name/${countryName} ? fields = name, capital, population, flags, languages`;

    return fetch(URL).then(response => {
        if (!responcse.ok) {
            throw new Error(response.status);
        };
        return response.json();
    });
};