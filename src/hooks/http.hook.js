import {useState, useCallback} from 'react';

const useHttp = () => {
  const [itemLoadingStatus, setItemLoadingStatus] = useState('idle');

  const request = useCallback(async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {

    setItemLoadingStatus('loading');

    try {
      const response = await fetch(url, {method, body, headers});

      if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
      }

      const data = await response.json();
      setItemLoadingStatus('idle');
      return data;
    } catch (e) {
      setItemLoadingStatus('error');
      throw e;
    }
  }, []);

  return {itemLoadingStatus, request}
}

export default useHttp;
