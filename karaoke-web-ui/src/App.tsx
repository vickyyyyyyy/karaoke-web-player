import React from 'react';
import './App.css';
import Error from './Error';
import * as api from './api';
import Loading from './Loading';

const App = () => {
  const [ready, setReady] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [data, setData] = React.useState('');

  const getSomeData = async () => {
    try {
      const data = await api.getSomeData();
      setData(data);
    } catch (e) {
      setError(true);
    }
  };

  React.useEffect(() => {
    const waitForData = async () => {
      await getSomeData();

      setReady(true);
    };

    waitForData();
  }, []);

  return (
    <div className='container'>
      <h1>Karaoke</h1>
      {error ? <Error /> : ready ? <span>{data}</span> : <Loading />}
    </div>
  );
};

export default App;
