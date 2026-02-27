import React from 'react';
import { type Airport } from '../../../model/Airport';
import AirportInfo from './airport-info';
import useApi from '../../../api/useApi';

interface AirportListProps {
  countryIso2: string | null;
  isVisible: boolean;
}

function AirportList(props: AirportListProps) {
  const { countryIso2, isVisible } = props;
  const airports = useApi<Airport[]>(`/airports/${countryIso2}`);

  if (isVisible && airports) {
    return (
      <div className='mt-4 space-y-3'>
        {airports.map((airport) => (
          <AirportInfo key={airport.dbId} airport={airport} />
        ))}
      </div>
    );
  } else return <></>;
}

export { AirportList };
