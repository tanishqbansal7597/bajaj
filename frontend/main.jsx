import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [input, setInput] = useState('');
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const jsonData = JSON.parse(input);
      const response = await axios.post('https://<backend-app>.herokuapp.com/bfhl', jsonData);
      setResponse(response.data);
      setError(null);
    } catch (error) {
      setError('Invalid JSON input');
    }
  };

  const handleSelectChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
    setSelectedOptions(selectedOptions);
  };

  const filteredResponse = () => {
    if (!response) return null;
    const filteredData = {};
    selectedOptions.forEach((option) => {
      if (option === 'Alphabets') {
        filteredData.alphabets = response.alphabets;
      } else if (option === 'Numbers') {
        filteredData.numbers = response.numbers;
      } else if (option === 'Highest Alphabet') {
        const highestAlphabet = response.alphabets.sort((a, b) => b.localeCompare(a))[0];
        filteredData.highestAlphabet = highestAlphabet;
      }
    });
    return filteredData;
  };

  return (
    <div>
      <h1>70</h1>
      <form onSubmit={handleSubmit}>
        <textarea value={input} onChange={(event) => setInput(event.target.value)} />
        <button type="submit">Submit</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
      {response && (
        <div>
          <select multiple value={selectedOptions} onChange={handleSelectChange}>
            <option value="Alphabets">Alphabets</option>
            <option value="Numbers">Numbers</option>
            <option value="Highest Alphabet">Highest Alphabet</option>
          </select>
          <pre>{JSON.stringify(filteredResponse(), null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;