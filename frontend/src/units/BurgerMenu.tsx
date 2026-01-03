import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IconButton } from '@mui/material';
import { MenuIcon } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router';

const BurgerMenu = React.memo(() => {
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <IconButton
          size='large'
          edge='start'
          color='inherit'
          aria-label='open dropdown menu'
        >
          <MenuIcon />
        </IconButton>
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
  );
});
BurgerMenu.displayName = 'BurgerMenu';
export default BurgerMenu;
