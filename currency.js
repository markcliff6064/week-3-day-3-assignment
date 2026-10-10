// ==========================================
// TASK 1: CURRENCY CONVERTER
// ==========================================

// This API provides exchange rates based on KES.
// It does not require an API key.
const API_URL = "https://open.er-api.com/v6/latest/KES";

// Store the exchange rates after downloading them.
// This prevents us from requesting the API every time
// the user clicks the Convert button.
let rates = {};

// Get the HTML elements we need to work with.
const amountInput = document.getElementById("amount");
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");

const convertBtn = document.getElementById("convertBtn");
const swapBtn = document.getElementById("swapBtn");

const loading = document.getElementById("loading");
const error = document.getElementById("error");
const result = document.getElementById("result");


// ==========================================
// GET EXCHANGE RATES
// ==========================================

async function getRates() {

    // Tell the user that the application is contacting the API.
    loading.textContent = "Loading exchange rates...";
    error.textContent = "";

    try {

        // fetch() sends a request to the exchange-rate API.
        const response = await fetch(API_URL);

        // If the server returns an unsuccessful status,
        // we stop and show an error.
        if (!response.ok) {
            throw new Error("Could not fetch exchange rates.");
        }

        // Convert the API response from JSON into a JavaScript object.
        const data = await response.json();

        // The API stores the currency rates inside the "rates" property.
        rates = data.rates;

        loading.textContent = "";

    } catch (err) {

        // Display a simple message instead of showing
        // technical error information to the user.
        loading.textContent = "";
        error.textContent =
            "Sorry, we could not load the exchange rates. Please try again.";

        console.error(err);
    }
}


// ==========================================
// CONVERT CURRENCY
// ==========================================

function convertCurrency() {

    // Remove any previous error message.
    error.textContent = "";

    // Convert the input value from text into a number.
    const amount = Number(amountInput.value);

    const from = fromCurrency.value;
    const to = toCurrency.value;

    // Make sure the user entered a valid amount.
    if (!amount || amount <= 0) {
        error.textContent = "Please enter an amount greater than 0.";
        return;
    }

    // Make sure the rates have already been downloaded.
    if (Object.keys(rates).length === 0) {
        error.textContent = "Exchange rates are not available yet.";
        return;
    }

    /*
        The API gives us rates based on KES.

        Example:

        If:
        KES -> USD = 0.0077
        KES -> EUR = 0.0065

        To convert from one currency to another:

        amount × rate(to) ÷ rate(from)
    */

    const convertedAmount =
        amount * rates[to] / rates[from];

    // Display the result with two decimal places.
    result.textContent =
        `${from} ${amount.toLocaleString()} = ${to} ${convertedAmount.toFixed(2)}`;
}


// ==========================================
// SWAP CURRENCIES
// ==========================================

function swapCurrencies() {

    // Save the current "From" currency.
    const oldFrom = fromCurrency.value;

    // Put the "To" currency into "From".
    fromCurrency.value = toCurrency.value;

    // Put the old "From" currency into "To".
    toCurrency.value = oldFrom;

    // Clear the previous result because the direction changed.
    result.textContent = "";
}


// ==========================================
// BUTTON EVENTS
// ==========================================

// Run the conversion when the Convert button is clicked.
convertBtn.addEventListener("click", convertCurrency);

// Swap the currencies when the Swap button is clicked.
swapBtn.addEventListener("click", swapCurrencies);


// ==========================================
// START APPLICATION
// ==========================================

// Download exchange rates when the page loads.
getRates();