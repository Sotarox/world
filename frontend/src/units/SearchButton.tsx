import React, { useEffect, useMemo, useState } from 'react';
import { Divider, InputAdornment, Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import { searchCountryName } from '../model/CountryIso2NameMap';
import SearchResultComponent from './SearchResult';
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
import { Button } from '../components/custom/button';

function SearchButton() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const results = useMemo(
    () => (query.length > 1 ? searchCountryName(query) : []),
    [query]
  );

  const location = useLocation();
  // when url changes, close the dialog
  useEffect(() => {
    setOpen(false);
  }, [location]);

  return (
    <>
      <Button
        variant='ghost'
        onClick={() => {
          setQuery('');
          setOpen(true);
        }}
        aria-label='open search dialog'
      >
        <SearchIcon className='size-6' />
      </Button>
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
                <SearchResultComponent results={results} />
              </Stack>
            </Stack>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default SearchButton;
