import {useState, useCallback, useRef, useEffect} from 'react';

export const useFetch = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // useRef: újrarendereléskor megmarad a tartalma
  const activeHttpRequests = useRef([]);

  //useCallback: a hookot használó komponensek ne hozzák létre a függvényt rerenderkor, végtelen ciklust okozva
  const sendRequest = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
    setIsLoading(true);
    //abortcontroller: browser API
    const httpAbortCtrl = new AbortController();
    activeHttpRequests.current.push(httpAbortCtrl);

    try {    
      const response = await fetch(url, {method, body, headers, signal: httpAbortCtrl.signal}); 
      const responseData = response.headers.get('Content-Type').indexOf('application/json') > -1 ? await response.json() : response //ha json, visszaalakítjuk, ha nem, békén hagyjuk
      if (!response.ok) throw new Error(responseData.message);  
      //ha lefut, kivehető a cancelezendő requestek közül
      activeHttpRequests.current = activeHttpRequests.current.filter(reqCtrl => reqCtrl !== httpAbortCtrl);
      setIsLoading(false);
      return responseData;
    } catch (error) {
      setIsLoading(false);
      setError(error.message || 'Kérés sikertelen.');   
      throw error;   
    }
  }, []);

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    //a return clearup függvényt hoz létre, amikor lefut, amikor a komponens unmountol
    return () => {
      activeHttpRequests.current.forEach(AbortController => AbortController.abort());
    };
  }, []);

  return {isLoading, errorResponse: error, sendRequest, clearError}
}