import React from 'react';
import { type Airport } from '@/model/airport';
import { AirportInfo } from './airport-info';
import { useApi } from '@/api/use-api';

interface AirportListProps {
  iso2: string;
}

function AirportList(props: AirportListProps) {
  const { iso2 } = props;
  const { data, error, loading } = useApi<Airport[]>(`/airports/${iso2}`);

  return (
    <div className='mt-1 space-y-3'>
      {loading ? (
        <span className='pl-2'>Loading...</span>
      ) : error ? (
        <span className='pl-2'>Error loading airport data</span>
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
