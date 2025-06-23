import { useContext } from 'react';
import Grid, { type GridProps } from '@mui/material/Grid';
import { type Country } from '../model/Country';
import Box from '@mui/material/Box';
import { Item } from '../components/Item';
import InfoCard from '../components/InfoCard';
import '/node_modules/flag-icons/css/flag-icons.min.css';
import {
  convertContinentCodeToName,
  formatCoordinate,
  formatNumberWithComma,
} from '../utils/utils';
import { CurrentTopicContext } from '../contexts/CurrentTopicContext';
import ClickbarInfoCard from '../components/ClickbarInfoCard';
import type { ACCountry } from '../model/ACCountry';
import CountryInfoHeader from './CountryInfoHeader';

interface CountryInfoProps {
  acCountry: ACCountry | undefined;
  country: Country;
  sizeAirports: number;
}
function CountryInfo(props: CountryInfoProps) {
  const { acCountry, country, sizeAirports } = props;
  const { currentTopic, setCurrentTopic } = useContext(CurrentTopicContext);

  return (
    <Box sx={{ mt: 2 }}>
      <Item sx={{ mb: 1 }}>
        <Grid container spacing={0.125}>
          <CountryInfoHeader country={country} />
          <CustomGrid>
            <InfoCard
              title='Coordinate'
              value={acCountry ? formatCoordinate(acCountry.latlng) : 'N/A'}
            />
          </CustomGrid>
          <CustomGrid>
            <InfoCard
              title='Continent'
              value={convertContinentCodeToName(country.continent)}
            />
          </CustomGrid>
          <CustomGrid>
            <InfoCard
              title='Subregion'
              value={acCountry?.subregion.toString() ?? 'N/A'}
            />
          </CustomGrid>
          <CustomGrid>
            <InfoCard title='Capital' value={country.capital} />
          </CustomGrid>
          <CustomGrid>
            <InfoCard title='Country ISO2' value={country.countryIso2} />
          </CustomGrid>
          <CustomGrid>
            <InfoCard title='Currency' value={country.currencyName} />
          </CustomGrid>
          <CustomGrid>
            <InfoCard title='Phone prefix' value={country.phonePrefix} />
          </CustomGrid>
          <CustomGrid>
            <InfoCard
              title='Area'
              value={
                acCountry
                  ? `${formatNumberWithComma(acCountry.area)} \u33A2`
                  : 'N/A'
              }
            />
          </CustomGrid>
        </Grid>
      </Item>
      <Grid container spacing={1.5}>
        <CustomGrid sx={{ display: 'flex' }}>
          <ClickbarInfoCard
            title='Population'
            value={
              country.population
                ? formatNumberWithComma(country.population)
                : 'N/A'
            }
            isSelected={currentTopic === 'population'}
            onClick={() => setCurrentTopic('population')}
          />
        </CustomGrid>
        <CustomGrid sx={{ display: 'flex' }}>
          <ClickbarInfoCard
            title='The number of airports'
            value={sizeAirports.toString()}
            isSelected={currentTopic === 'airports'}
            onClick={() => setCurrentTopic('airports')}
          />
        </CustomGrid>
      </Grid>
    </Box>
  );
}

const CustomGrid: React.FC<GridProps> = (props) => (
  <Grid size={{ xs: 6, md: 3 }} sx={{ p: 1 }} {...props} />
);

export default CountryInfo;
