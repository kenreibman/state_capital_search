const search = document.querySelector('#search');
const matchList = document.querySelector('#match-list');
let states;

// Get States
const getStates = async() => {
    const res = await fetch('public/states.json');
    states = await res.json();
};

// Filter States
const searchStates = searchText => {
    // Get Matches to Current Text Input
    let matches = states.filter(state => {
        const regex = new RegExp(`^${searchText}`, 'gi');
        return state.name.match(regex) || state.abbr.match(regex);
    });

    // Clear when input or matches are empty
    if (searchText.length === 0) {
        matches = [];
        matchList.innterHTML = '';
    }

    outputHtml(matches);
};

// Show results in HTML
const outputHtml = matches => {
    if(matches.length > 0) {
        const html = matches.map(
            match => `<div class="card card-body mb-1">
            <h4>${match.name} (${match.abbr})
            <span class="text-primary>${match.capital}</span>
            </h4>
            <small>Lat: ${match.lat} / Long: ${match.long}</small>
            </div>
            `
        )
        .join('');
        matchList.innerHTML = html;
    }
};

window.addEventListener('DOMContentLoaded', getStates);
search.addEventListener('input', () => searchStates(search.value));

// const search = document.querySelector('#search');
// const matchList = document.querySelector('#match-list');

// // Search states.json and filters
// const searchStates = async searchText => { // Using Fetch API to bring in JSON data
//     const res = await fetch('public/states.json');
//     const states = await res.json();

//     // Get matches to current text input
//     let matches = states.filter(state => {
//         const regex = new RegExp(`^${searchText}`, 'gi'); // Start with (^) searchText variable 
//         return state.name.match(regex) || state.abbr.match(regex);
//     });

//     // Prevent all states from appearing if input is empty
//     if(searchText.length === 0) {
//         matches = [];
//         // Clear innerHTML array
//         matchList.innerHTML = '';
//     }
    
//     outputHtml(matches);
// };

// // Show results in HTML
// const outputHtml = matches => {
//     if(matches.length > 0) {
//         const html = matches.map(match => `
//         <div class="card card-body mb-4">
//             <h4>${match.name} (${match.abbr}) <span class="text-primary">${match.capital}</span></h4>
//             <small>Lat: ${match.lat} / Long: ${match.long}</small>
//         </div>
//         `
//         )
//         .join('');

//         console.log(html);

//         matchList.innerHTML = html;
//     }
// }

// search.addEventListener('input', () => {
//     searchStates(search.value)
// });