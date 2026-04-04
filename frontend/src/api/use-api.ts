import { useEffect, useRef, useState } from 'react';
import api from './axios';

function useApi<Type>(url: string | null): {
  data: Type | null;
  error: Error | null;
  loading: boolean;
} {
  const [data, setData] = useState<Type | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const controllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!url || url === '') {
      setLoading(false);
      return;
    }

    // If request is duplicated, abort the previous one.
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    const controller = new AbortController();
    controllerRef.current = controller;

    let ignore = false;
    setLoading(true);
    setError(null);

    api
      .get<Type>(url, { signal: controller.signal })
      .then((res) => {
        if (!ignore) {
          setData(res.data);
        }
      })
      .catch((error) => {
        if (!ignore && error.name !== 'CanceledError') {
          setError(error as Error);
        }
      })
      .finally(() => {
        if (!ignore) {
          setLoading(false);
        }
      });

    // Cleanup to avoid setting state on unmounted component
    // and to cancel in-flight request when URL changes.
    return () => {
      ignore = true;
      controller.abort();
    };
  }, [url]);

  return { data, error, loading };
}

export { useApi };
