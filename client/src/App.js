import React, {useState} from 'react';
import './App.css';

function App() {

  const [country, setCountry] = useState('');
  const [countryData, setCountryData] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Input validation
    if (!country) {
      setError('Please enter a country name.');
      return;
    }

    // Check for malicious input
    const regex = /^[a-zA-Z\s]*$/;
    if (!regex.test(country)) {
      setError('Invalid input. Please enter a valid country name.');
      return;
    }

    // Send a GET request to the Express server
    fetch(`https://pleasant-lamb-lab-coat.cyclic.app/country/${country}`)
        .then(response => response.json())
        .then(data => {
          // Store the data in the component's state
          setCountryData(data[0]);
          setError(null);  // Clear any previous errors
        })
        .catch(error => {
          console.error('Error:', error);
          setError('An error occurred while fetching country data.');
        });
  };

  return (<div className="App">
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="country-input">
          Country Name:
        </label>
        <input
            id="country-input"
            type="text"
            value={country}
            onChange={(event) => setCountry(event.target.value)}
        />
        <input type="submit" value="Submit"/>
      </form>

      {/* Render any error messages */}
      {error && (<div className="error-message">
        {error}
      </div>)}

      {/* Render the country data */}
      {countryData && (<div className="country-data">
        <h2><strong>{countryData.name.common}</strong></h2>
        <p><strong>Official Name:</strong> {countryData.name.official}</p>
        <p><strong>Region:</strong> {countryData.region}</p>
        <p><strong>Subregion:</strong> {countryData.subregion}</p>
        <p><strong>Population:</strong> {countryData.population}</p>
        <img src={countryData.flags.png} alt={countryData.flags.alt}/>
      </div>)}
    </div>
  </div>);
}

export default App;
