



























import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [amount, setAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);

  useEffect(() => {
    const fetchCurrencies = async () => {
      const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
      const data = response.data;

      setCurrencies(Object.keys(data.rates));
    };

    fetchCurrencies();
  }, []);

  const handleConvert = async (e) => {
    e.preventDefault();
    const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
    const data = response.data;

    const rate = data.rates[toCurrency];
    const convertedValue = amount * rate;
    setConvertedAmount(convertedValue.toFixed(2));
  };

  return (
    <div className="wrapper">
      <header>Currency Converter</header>
      <form>
        <p>From:</p>
        <div className="drop-list"   style={{display: "flex"}}       >
          <div className="select-box">
            <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
              <option value="">Select currency</option>
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
          <p>To:</p>
          <div className="select-box">
            <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
              <option value="">Select currency</option>
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
          
        </div>

        <p style={{marginTop:"10px"}}>Amount:</p>
        <input type="number" value={amount} onChange={(e) => setAmount(parseFloat(e.target.value))} />

        <p className="exchange-rate">Converted Amount: {convertedAmount}</p>

        <button onClick={handleConvert}>Convert</button>
      </form>
    </div>
  );
};

export default CurrencyConverter;
