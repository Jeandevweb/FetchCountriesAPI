//https://restcountries.com/v2/all?fields=name,population,flag
let countries;
let searchTerms = '';
const searchInput = document.getElementById('search');
const results = document.getElementById('results');

const fetchCountries = async()=>{
    countries = await fetch('https://restcountries.com/v2/all?fields=name,population,flag')
        .then(res => res.json())
};

const showCountries = async()=>{ 
    await fetchCountries();

    results.innerHTML = (
        countries
            .filter(country => country.name.toLowerCase().includes(searchTerms.toLowerCase()))
            .map(country => (

                `<li class="country-item">
                    <img class="country-flag" src="${country.flag}"/>
                    <h3 class="country-name"/>${country.name}</h3>
                    <div class="country-info">
                        <h2 class="country-population">${numberWithSpace(country.population)}</h2>
                        <h5 class="country-population-text">Habitants</h5>
                    </div>
                </li>`
            )).join('')
    )
}

showCountries();

function numberWithSpace(x){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '); 
}

searchInput.addEventListener('input', (e)=>{
    searchTerms = e.target.value;
    showCountries();
})