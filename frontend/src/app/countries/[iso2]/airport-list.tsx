import { type Airport } from '@/model/airport';
import { AirportInfo } from './airport-info';
import { useQuery } from '@tanstack/react-query';
import api from '@/api/axios';

interface AirportListProps {
  iso2: string;
}

function AirportList(props: AirportListProps) {
  const { iso2 } = props;
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['airports'],
    queryFn: () =>
      api.get<Airport[]>(`/airports/${iso2}`).then((res) => res.data),
  });

  return (
    <div className='mt-1 space-y-3'>
      {isPending ? (
        <span className='pl-2'>Loading...</span>
      ) : isError ? (
        <span className='pl-2'>
          Error loading airport data. {error?.message}
        </span>
      ) : data && data.length > 0 ? (
        data.map((airport) => (
          <AirportInfo key={airport.dbId} airport={airport} />
        ))
      ) : (
        <span className='pl-2'>No airports data is available</span>
      )}
    </div>
  );
}

AirportList.displayName = 'AirportList';
export { AirportList };
