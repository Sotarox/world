import React from 'react';
import AppBar from '@mui/material/AppBar';
import { Box, IconButton, Toolbar } from '@mui/material';
import { List as ListIcon, MenuIcon } from 'lucide-react';
import ThemeSwitch from './ThemeSwitch';
import SearchButton from './SearchButton';
import HeaderLogo from './HeaderLogo';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';
import { CountryFilter } from './CountryFilter';

interface HeaderBarProps {
  toggleDrawer: () => void;
}

const HeaderBar = React.memo((props: HeaderBarProps) => {
  const { toggleDrawer } = props;
  const navigate = useNavigate();

  return (
    <>
      <AppBar
        position='sticky'
        sx={{
          display: { xs: 'none', sm: 'block' },
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='open drawer'
            onClick={toggleDrawer}
          >
            <ListIcon />
          </IconButton>
          <HeaderLogo />
          <Box sx={{ flexGrow: '1' }} />
          <SearchButton />
          <Box sx={{ flexGrow: '1' }} />
          <ThemeSwitch />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size='icon' variant='ghost'>
                <MenuIcon className='size-6' />
              </Button>
            </DropdownMenuTrigger>
            {/* Since AppBar has z-index 1201 */}
            <DropdownMenuContent className='z-[1202]'>
              <DropdownMenuItem onClick={() => navigate('/about')}>
                About
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/inquiry')}>
                Inquiry
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <CountryFilter />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Toolbar>
      </AppBar>
    </>
  );
});
HeaderBar.displayName = 'HeaderBar';
export default HeaderBar;
