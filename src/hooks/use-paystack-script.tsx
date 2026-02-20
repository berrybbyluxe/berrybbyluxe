'use client';

import { useState, useEffect } from 'react';

export const usePaystackScript = () => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;

    const onScriptLoad = () => setLoaded(true);
    const onScriptError = () => setError(true);

    script.addEventListener('load', onScriptLoad);
    script.addEventListener('error', onScriptError);

    document.body.appendChild(script);

    return () => {
      script.removeEventListener('load', onScriptLoad);
      script.removeEventListener('error', onScriptError);
      document.body.removeChild(script);
    };
  }, []);

  return [loaded, error];
};
