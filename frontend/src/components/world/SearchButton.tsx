import React, { useEffect, useMemo, useState } from 'react';
import { searchCountryName } from '../../model/CountryIso2NameMap';
import SearchResult from './SearchResult';
import { SearchIcon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/custom/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { usePathname } from 'next/navigation';
import { Button } from '../custom/button';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/shadcn/input-group';
import { Separator } from '@/components/shadcn/separator';

function SearchButton() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const results = useMemo(
    () => (query.length > 1 ? searchCountryName(query) : []),
    [query]
  );

  const pathname = usePathname();
  // when url changes, close the dialog
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

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
            <div className='flex justify-center px-1'>
              <div className='flex flex-col px-2 h-full overflow-y-auto pt-1 basis-4/5'>
                <InputGroup>
                  <InputGroupAddon>
                    <SearchIcon className='h-4 w-4 text-muted-foreground' />
                  </InputGroupAddon>
                  <InputGroupInput
                    placeholder='Country Name'
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </InputGroup>
                <Separator className='my-2' />
                <SearchResult results={results} />
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default SearchButton;
