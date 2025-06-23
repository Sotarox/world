import { useContext } from 'react';
import Grid, { type GridProps } from '@mui/material/Grid';
import { type Country } from '../model/Country';
import Box from '@mui/material/Box';
import { Item } from '../components/Item';
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
import GridInfo from '../components/GridInfo';

const gridProps = { size: { xs: 6, md: 3 }, sx: { p: 1 } };
const CustomGrid: React.FC<GridProps> = (props) => (
  <Grid {...gridProps} {...props} />
);

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
          <GridInfo
            gridProps={gridProps}
            title='Coordinate'
            value={acCountry ? formatCoordinate(acCountry.latlng) : 'N/A'}
          />
          <GridInfo
            gridProps={gridProps}
            title='Country ISO3'
            value={country.countryIso3}
          />
          <GridInfo
            gridProps={gridProps}
            title='Continent'
            value={convertContinentCodeToName(country.continent)}
          />
          <GridInfo
            gridProps={gridProps}
            title='Subregion'
            value={acCountry?.subregion.toString() ?? 'N/A'}
          />
          <GridInfo
            gridProps={gridProps}
            title='Capital'
            value={country.capital}
          />
          <GridInfo
            gridProps={gridProps}
            title='Country ISO2'
            value={country.countryIso2}
          />
          <GridInfo
            gridProps={gridProps}
            title='Currency'
            value={country.currencyName}
          />
          <GridInfo
            gridProps={gridProps}
            title='Phone prefix'
            value={country.phonePrefix}
          />
          <GridInfo
            gridProps={gridProps}
            title='Area'
            value={
              acCountry
                ? `${formatNumberWithComma(acCountry.area)} \u33A2`
                : 'N/A'
            }
          />
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

export default CountryInfo;
