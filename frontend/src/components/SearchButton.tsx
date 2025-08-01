import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {
  Divider,
  IconButton,
  InputAdornment,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import {
  searchCountryName,
  type CountryIso2NameMap,
} from '../model/CountryIso2NameMap';
import { useNavigate } from 'react-router';
import SearchIcon from '@mui/icons-material/Search';

function SearchButton() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<CountryIso2NameMap[]>([]);
  const navigate = useNavigate();
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
        <StyledPaper>
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
          />
          <Divider sx={{ mt: 1, mb: 2 }} />
          {results.length > 0 ? (
            results.map((obj) => (
              <ListItem key={obj.countryIso2} disablePadding>
                <ListItemButton
                  onClick={() => {
                    navigate(`/countries/${obj.countryIso2.toLowerCase()}`);
                    reset();
                  }}
                >
                  <ListItemIcon>
                    <span
                      className={`fi fi-${obj.countryIso2.toLowerCase()}`}
                      style={{ height: '24px', width: '24px', flexShrink: '0' }}
                    ></span>
                  </ListItemIcon>
                  <ListItemText primary={obj.countryName} />
                </ListItemButton>
              </ListItem>
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
