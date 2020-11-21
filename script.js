'use strict'


const apiKey = "BXyxmWgy71uvR7r25BljW8yshrE23aS7O0HBix0S"

const baseUrl = "https://developer.nps.gov/api/v1/parks"






function formatQueryString(params) {
    const queryItems = Object.keys(params)
        .map(key => {
            if (key === "stateCode") {
                return `${encodeURIComponent(key)}=${params[key]}`
            } else {
                return `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
            }
        });
    return queryItems.join('&');
}

function displayResults(responseJson, maxResults) {
    console.log(responseJson);
    $('#results-list').empty();

    for (let i = 0; i < responseJson.data.length & i < maxResults; i++) {
        $('#results-list').append(`<li><h3><a href="${responseJson.data[i].url}">${responseJson.data[i].fullName}</a></h3>
        <p>${responseJson.data[i].description}</p>
        <p><a href="${responseJson.data[i].directionsUrl}">Get your directions here!</a></p></li>`)
    }
    $('#results').removeClass('hidden');
}



function getParks(query, maxResults = 10) {
    const params = {
        stateCode: query,
        limit: maxResults,
        api_key: apiKey

    };
    const queryString = formatQueryString(params);
    const url = baseUrl + '?' + queryString;

    console.log(url);

    const options = {
        headers: new Headers({
            "X-Api-Key": apiKey
        })
    };

    fetch(url, options)
        .then(response => response.json())
        .then(responseJson => displayResults(responseJson, maxResults))
        .catch(error => {
            console.error('Something went wrong!');
            console.error(error)
        });
}






function watchForm() {
    $('#js-form').submit(e => {
        e.preventDefault();
        const searchState = $('#js-search-state').val();
        const maxResults = $('#js-max-results').val();
        console.log('Adventure Time!');
        getParks(searchState, maxResults);

    })

}

$(watchForm)
