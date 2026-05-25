import { useCallback, useEffect, useMemo, useState } from 'react';
import { searchCountryName } from '../../model/country-iso2-name-map';
import { SearchResult } from './search-result';
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
import { Kbd } from '@/components/shadcn/kbd';

const SEARCH_KEYBOARD_SHORTCUT = 'k';

function getSearchShortcutLabel(): string {
  if (typeof navigator === 'undefined') {
    return 'Ctrl+K';
  }
  return /Mac|iPhone|iPad|iPod/.test(navigator.platform) ? '⌘K' : 'Ctrl+K';
}

function SearchButton() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const results = useMemo(
    () => (query.length > 1 ? searchCountryName(query) : []),
    [query]
  );
  const shortcutLabel = useMemo(() => getSearchShortcutLabel(), []);

  const pathname = usePathname();

  const openSearch = useCallback(() => {
    setQuery('');
    setOpen(true);
  }, []);

  // when url changes, close the dialog
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key.toLowerCase() === SEARCH_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault();
        openSearch();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [openSearch]);

  return (
    <>
      <Button
        variant='ghost'
        onClick={openSearch}
        aria-label='open search dialog'
        aria-keyshortcuts='Control+K Meta+K'
        className='rounded-xl sm:border sm:border-muted/50 sm:dark:border-white/50'
      >
        <SearchIcon className='size-5' />
        <span
          className='hidden sm:inline text-xs text-muted-foreground ml-1'
          data-testid='search-button-keyboard-shortcut'
        >
          <Kbd className='bg-transparent dark:text-white/50'>
            {shortcutLabel}
          </Kbd>
        </span>
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
