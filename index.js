//I will have to redo this whole code cause it really doesn't work
//declaration of variables
const digit = 0.0001;
let val;
let rates;
let valTimer;
let ratesTimer;

const ratesElements = {
    eurToUsd: document.getElementById('eurToUsd'),
    eurToAud: document.getElementById('eurToAud'),
    eurToCad: document.getElementById('eurToCad'),
    eurToBgn: document.getElementById('eurToBgn')
}

//here we take the data from the currency file 
fetch('http://localhost:8080/currencies.json', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    //parsing json to js obj
    .then(raw => raw.json())
    .then(init)
    .catch(err => console.log(err)); //err catcher

function init(data) {
    rates = data.rates;
     updateView();
    valTimer = setInterval(toggleDirection, 60 * 1000);
    ratesTimer = setInterval(updateRates, 5 * 1000);
    setTimeout(stopUpdating, 5 * 60 * 1000);
}
function toggleDirection() {
    if (val === 'UP') val = 'DOWN';
    else val = 'UP';
}
function updateRates() {
    if (!val) val = 'UP';
    if (val === 'UP') {
        increaseRates(rates);
    } else { // DOWN
        decreaseRates(rates);
    }
}
function stopUpdating() {
    clearInterval(valTimer);
    clearInterval(ratesTimer);
}
function increaseRates(data) {
    Object.keys(rates).forEach((currency) => rates[currency] += digit);
    updateView();
}function decreaseRates(data) {
    
    Object.keys(rates).forEach((currency) => rates[currency] -= digit);
    updateView();
}

function updateView() {
    ratesElements.eurToUsd.textContent = rates.USD.toFixed(4);
    ratesElements.eurToAud.textContent = rates.AUD.toFixed(4);
    ratesElements.eurToCad.textContent = rates.CAD.toFixed(4);
    ratesElements.eurToBgn.textContent = rates.BGN.toFixed(4);

    let bcgColor;
    switch (val) {
        case 'UP':
            bcgColor = 'green';
            break;
        case 'DOWN':
            bcgColor = 'red';
            break;
        default:
            bcgColor = 'none';
    }

    Object.keys(ratesElements).forEach((item) => {
        ratesElements[item].style.backgroundColor = bgColor;
    });
}
