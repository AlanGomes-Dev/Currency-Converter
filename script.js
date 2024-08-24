// script.js
document.addEventListener('DOMContentLoaded', () => {
    const fromCurrency = document.getElementById('fromCurrency');
    const toCurrency = document.getElementById('toCurrency');
    const amountInput = document.getElementById('amount');
    const convertBtn = document.getElementById('convertBtn');
    const resultDiv = document.getElementById('result');

    const currencies = [
        { code: "USD", name: "Dólar Americano (USD)" },
        { code: "EUR", name: "Euro (EUR)" },
        { code: "GBP", name: "Libra Esterlina (GBP)" },
        { code: "JPY", name: "Iene Japonês (JPY)" },
        { code: "CAD", name: "Dólar Canadense (CAD)" },
        { code: "CHF", name: "Franco Suíço (CHF)" },
        { code: "AUD", name: "Dólar Australiano (AUD)" },
        { code: "NZD", name: "Dólar Neozelandês (NZD)" },
        { code: "CNY", name: "Yuan Chinês (CNY)" },
        { code: "BRL", name: "Real Brasileiro (BRL)" },
        { code: "INR", name: "Rupia Indiana (INR)" },
        { code: "RUB", name: "Rublo Russo (RUB)" },
        { code: "MXN", name: "Peso Mexicano (MXN)" },
        { code: "KRW", name: "Won Sul-Coreano (KRW)" },
        { code: "ZAR", name: "Rand Sul-Africano (ZAR)" },
        { code: "SGD", name: "Dólar de Singapura (SGD)" },
        { code: "ARS", name: "Peso Argentino (ARS)" },
        { code: "BTC", name: "Bitcoin (BTC)" },
        { code: "ETH", name: "Ethereum (ETH)" },
        { code: "LTC", name: "Litecoin (LTC)" }
    ];

    // Populate "toCurrency" dropdown initially
    function populateToCurrency() {
        toCurrency.innerHTML = currencies.map(currency => {
            return `<option value="${currency.code}">${currency.name}</option>`;
        }).join('');
    }
    
    // Update "toCurrency" dropdown based on "fromCurrency" selection
    fromCurrency.addEventListener('change', () => {
        const selectedFromCurrency = fromCurrency.value;
        toCurrency.innerHTML = currencies.filter(currency => currency.code !== selectedFromCurrency)
            .map(currency => {
                return `<option value="${currency.code}">${currency.name}</option>`;
            }).join('');
    });

    // Conversion function
    async function convertCurrency() {
        const from = fromCurrency.value;
        const to = toCurrency.value;
        const amount = amountInput.value;

        if (amount === "" || isNaN(amount)) {
            resultDiv.textContent = "Please enter a valid amount.";
            return;
        }

        const apiKey = 'YOUR_API_KEY'; // Replace with your API key
        const url = `https://open.exchangerate-api.com/v6/latest?base=${from}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            const rate = data.rates[to];
            const convertedAmount = (amount * rate).toFixed(2);

            resultDiv.textContent = `${amount} ${from} = ${convertedAmount} ${to}`;
        } catch (error) {
            resultDiv.textContent = "Error fetching exchange rates. Please try again later.";
        }
    }

    // Add event listener to the convert button
    convertBtn.addEventListener('click', convertCurrency);

    // Initial population of the "toCurrency" dropdown
    populateToCurrency();
});
