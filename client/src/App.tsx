import React from 'react';
import logo from './logo.svg';
import './App.css';

const App = React.memo(() => {

  const [ state, setState ] = React.useState( "" );

  const callApi = React.useCallback( async () => {
    const res = await fetch( "http://localhost:9000/api/test" );

    const text = await res.text();

    setState( text );
  }, [] )

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {state}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={callApi}>Click me!</button>
      </header>
    </div>
  );
} )

export default App;
