import Box from '@mui/material/Box';
import { type Airport } from '../model/Airport';
import AirportInfo from './AirportInfo';
import useApi from '../api/useApi';

interface AirportListProps {
  countryIso2: string | null;
  isVisible: boolean;
}

function AirportList(props: AirportListProps) {
  const { countryIso2, isVisible } = props;
  const airports = useApi<Airport[]>(`/airports/${countryIso2}`);

  if (isVisible && airports) {
    return (
      <Box sx={{ mt: 4 }}>
        {airports.map((airport) => (
          <AirportInfo key={airport.dbId} airport={airport} />
        ))}
      </Box>
    );
  } else return <></>;
}

export default AirportList;
