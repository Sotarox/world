import { useEffect, useRef, useState } from 'react';
import api from './axios';

function useApi<Type>(url: string | null): Type | null {
  const [data, setData] = useState<Type | null>(null);
  const controllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (url && url !== '') {
      // If request is duplicated, abort the previous one
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
      const controller = new AbortController();
      controllerRef.current = controller;

      let ignore = false;
      api
        .get<Type>(url, { signal: controller.signal })
        .then((res) => {
          if (!ignore) {
            setData(res.data);
          }
        })
        .catch((error) => {
          if (error.name !== 'CanceledError') {
            console.error(error);
          }
        });
      // Cleanup function to avoid setting state on unmounted component
      return () => {
        ignore = true;
      };
    }
  }, [url]);
  return data;
}
export default useApi;
