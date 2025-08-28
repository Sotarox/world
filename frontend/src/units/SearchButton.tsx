import React, { useEffect, useState } from 'react';
import { Divider, IconButton, InputAdornment, Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import {
  searchCountryName,
  type CountryIso2NameMap,
} from '../model/CountryIso2NameMap';
import SearchResult from './SearchResult';
import { Search as SearchIcon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { useLocation } from 'react-router';

function SearchButton() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const results: CountryIso2NameMap[] =
    query.length > 1 ? searchCountryName(query) : [];
  const location = useLocation();
  // when url changes, close the dialog
  useEffect(() => {
    setOpen(false);
  }, [location]);

  return (
    <>
      <IconButton
        size='large'
        edge='start'
        color='inherit'
        aria-label='open search dialog'
        onClick={() => {
          setQuery('');
          setOpen(true);
        }}
      >
        <SearchIcon />
      </IconButton>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='h-4/5'>
          <DialogHeader>
            <VisuallyHidden>
              <DialogTitle>Search country</DialogTitle>
              <DialogDescription>
                search a country by its name
              </DialogDescription>
            </VisuallyHidden>
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
                <SearchResult results={results} />
              </Stack>
            </Stack>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default SearchButton;
