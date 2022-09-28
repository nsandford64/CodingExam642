import React from 'react';
import { Button, Intent } from '@blueprintjs/core';

const App = React.memo(() => {

  const [ state, setState ] = React.useState( "" );

  const callApi = React.useCallback( async () => {
    const res = await fetch( "http://localhost:9000/api/test" );

    const text = await res.text();

    setState( text );
  }, [] )

  return (
    <div className="App">
      <Button intent={Intent.PRIMARY} minimal onClick={callApi} text="Click me!" />
    </div>
  );
} )

export default App;
