import { useEffect, useState } from 'react';
import api from './axios';

function useApi<Type>(
  url: string | null,
  onSucess?: (data: Type) => void
): Type | null {
  const [data, setData] = useState<Type | null>(null);
  useEffect(() => {
    if (url && url !== '') {
      let ignore = false;
      api
        .get<Type>(url)
        .then((res) => {
          if (!ignore) {
            setData(res.data);
            if (onSucess) {
              onSucess(res.data);
            }
          }
        })
        .catch((error) => console.log(error));
      // Cleanup function to avoid setting state on unmounted component
      return () => {
        ignore = true;
      };
    }
  }, [url]);
  return data;
}
export default useApi;
