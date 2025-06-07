import CountryLoad from './CountryLoad';
import Box from '@mui/material/Box';
import { useContext } from 'react';
import { CurrentIso2Context } from '../contexts/CurrentIso2Context';

function Contents() {
  const { currentIso2 } = useContext(CurrentIso2Context);
  if (currentIso2 !== "") {
    return (
      <Box sx={{pl:2, pr:2, pb: {xs:8, sm:0}}}>
        <CountryLoad/>
      </Box>
    )
  } else {
    return <p>Country is not selected. Select a country from sidebar.</p>
  }
}

export default Contents
