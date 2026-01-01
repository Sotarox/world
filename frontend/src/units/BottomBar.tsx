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

interface BottomBarProps {
  toggleDrawer: () => void;
}

export default function BottomBar(props: BottomBarProps) {
  const { toggleDrawer } = props;
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position='fixed'
        sx={{
          top: 'auto',
          bottom: 0,
          height: '80px',
          display: { xs: 'block', sm: 'none' },
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
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
            </DropdownMenuContent>
          </DropdownMenu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
