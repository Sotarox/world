import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Modal from '@mui/material/Modal';
import { Divider, IconButton, InputAdornment, Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import {
  searchCountryName,
  type CountryIso2NameMap,
} from '../model/CountryIso2NameMap';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import SearchResult from './SearchResult';

function SearchButton() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<CountryIso2NameMap[]>([]);
  const reset = () => {
    setQuery('');
    setResults([]);
    setOpen(false);
  };

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
      <IconButton
        size='large'
        edge='start'
        color='inherit'
        aria-label='open search modal'
        onClick={() => setOpen(true)}
      >
        <SearchIcon />
      </IconButton>
      <Modal disableRestoreFocus={true} open={open} onClose={() => reset()}>
        <StyledPaper sx={{ height: '80vh' }}>
          <Stack direction='row' sx={{ justifyContent: 'flex-end' }}>
            <IconButton
              size='large'
              edge='end'
              color='inherit'
              aria-label='close search modal'
              onClick={() => reset()}
            >
              <CloseIcon />
            </IconButton>
          </Stack>
          <Stack direction='row' sx={{ justifyContent: 'center' }}>
            <Stack
              direction='column'
              spacing={2}
              sx={{
                flexBasis: '80%',
                height: '100%',
                overflowY: 'auto',
                pt: 1,
              }}
            >
              <TextField
                id='outlined-controlled'
                autoFocus
                label='Country Name'
                value={query}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setQuery(event.target.value);
                }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position='start'>
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{ width: '100%' }}
              />
              <Divider />
              <SearchResult results={results} reset={reset} />
            </Stack>
          </Stack>
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
