import React, { useEffect, useState } from 'react';
import { giphyKey } from 'root/keys';

function SearchGifs() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    console.log('SEARCH EFFECT RUNNING');
    async function getGifs() {
      const baseUrl = 'http://api.giphy.com/v1/gifs/';
      const numberOfResults = 3;
      const response = await fetch(`${baseUrl}search?q=${query}&api_key=${giphyKey}&limit=${numberOfResults}`);
      const json = await response.json();
      console.log('RESULTS:', json.data);
      setResults(json.data);
    }
    getGifs();
  }, [query]);

  function submit(value) {
    console.log('SUBMIT:', value);
    setQuery(value);
  }

  function handleChange(e) {
    console.log('VALUE:', e.target.value);
    // TODO Could debounce hitting the API here,
    // so we get results after we stop typing.
  }

  function handleKeyPress(e) {
    return e.keyCode === 13 ? submit(e.target.value) : null;
  }

  return (
    <div>
      <form onSubmit={e => e.preventDefault()}>
        <input
          type="text"
          onChange={handleChange}
          onKeyDown={handleKeyPress}
        />
      </form>
      <div>
        {results.map(res => (
          <div key={res.id}><img src={res.images.original.url} alt="" /></div>
        ))}
      </div>
    </div>
  );
}

export default SearchGifs;
