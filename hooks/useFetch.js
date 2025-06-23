import { useState, useEffect } from 'react';
import axios from 'axios';

function useFetch(url) {
  const [data, setData] = useState(null);        // Data state
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);      // Error state

  useEffect(() => {
    const source = axios.CancelToken.source();
    setLoading(true);
    setError(null);

    axios.get(url, {
      cancelToken: source.token
    })
    .then(res => {
      setData(res.data);       
      setLoading(false);      
    })
    .catch(err => {
      if (axios.isCancel(err)) {
        console.log('Request cancelled:', err.message);
      } else {
        setError(err);   
        setLoading(false);
      }
    });
    return () => {
      source.cancel('Operation cancelled by the user.');
    };

  }, [url]);

  return { data, loading, error };
}

export default useFetch;
