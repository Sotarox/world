import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Divider } from '@mui/material';
import TextField from '@mui/material/TextField';
import {
  searchCountryName,
  type CountryIso2NameMap,
} from '../model/CountryIso2NameMap';

function SearchButton() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<CountryIso2NameMap[]>([]);

  useEffect(() => {
    if (query.length > 1) {
      const results = searchCountryName(query);
      setResults(results);
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <>
      <Button color='inherit' onClick={() => setOpen(true)}>
        Search
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <StyledPaper>
          <TextField
            id='outlined-controlled'
            label='Country Name'
            value={query}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setQuery(event.target.value);
            }}
          />
          <Divider sx={{ mt: 1, mb: 2 }} />
          {results.length > 0 ? (
            results.map((country) => (
              <Typography key={country.countryIso2} variant='body1'>
                {country.countryName} ({country.countryIso2})
              </Typography>
            ))
          ) : (
            <Typography variant='body1'>No results found</Typography>
          )}
        </StyledPaper>
      </Modal>
    </>
  );
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  maxHeight: '80%',
  overflowY: 'auto',
  boxShadow: theme.shadows[24],
  padding: '16px',
}));

export default SearchButton;
