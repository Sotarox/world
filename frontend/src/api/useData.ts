import { useEffect, useState } from 'react';
import api from '../api/axios';

function useData<Type>(url: string | null) {
  const [data, setData] = useState<Type | null>(null);
  useEffect(() => {
    if (url && url !== '') {
      let ignore = false;
      api
        .get<Type>(url)
        .then((res) => {
          if (!ignore) {
            setData(res.data);
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
export default useData;
