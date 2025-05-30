import CountryLoad from './CountryLoad';
import Box from '@mui/material/Box';

interface ContentsProps {
  selectedCountry: string;
}
function Contents(props: ContentsProps) {
  const {selectedCountry} = props;

  return (
    <Box sx={{pl:2, pr:2}}>
      <CountryLoad selectedCountry={selectedCountry}/>
    </Box>
  )
}

export default Contents
