import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {
  const [shortUrl, setShortUrl] = React.useState('');
  const [error, setError] = React.useState('');

  const ref = React.useRef<HTMLInputElement>(null);

  const handleCreate = async () => {
    const res = await axios.post(window.origin + '/api', {
      url: ref.current?.value
    })
    const { code, error } = res.data;
    
    if(error) {
      setError(error);
    }
    else {
      setShortUrl(window.origin + '/' + code)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>URL Shortener</h2>
      </header>
      <br />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <input 
          ref={ref}
          type="text" 
          style={{ 
            width: 800,
            font: '17px lato,arial', 
            height: 60, 
            backgroundColor: 'lightblue', 
            padding: 16,
            border: '1px solid #bbb',
            boxSizing: 'border-box'
          }} 
          placeholder="Insert URL"
        />
        <button onClick={handleCreate} style={{ border: '1px solid black', borderRadius: 0, height: 60, width: 300 }}>Create</button>
      </div>
      <br />
      <div>
        {
          shortUrl ? <span>Generated URL: <a href={shortUrl}>{ shortUrl }</a></span> : <></>
        }
        {
          error ? <span>Error: { error } </span> : <></>
        }
      </div>
    </div>
  );
}

export default App;
