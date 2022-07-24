import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController()
    setTimeout(() => {
      fetch(url,{signal:abortCont.signal})
      .then(res => {
        if (!res.ok) { // error coming back from server
          throw Error('could not fetch the data for that resource');
        } 
        return res.json();
      })
      .then(data => {
        setIsPending(false);
        setData(data);
        setError(null);
      })
      .catch(err => {
        // auto catches network / connection error
        if(err.name==="AbortError"){
            console.log("Fetch Abort")
        }
        else{
        setIsPending(false);
        setError(err.message);
        }  
    })
    }, 1000);
    return ()=>abortCont.abort()
  },[url])

  return { error, isPending, data };
}
 
export default useFetch;