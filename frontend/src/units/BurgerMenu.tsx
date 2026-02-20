import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MenuIcon } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/custom/button';

const BurgerMenu = React.memo(() => {
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon' aria-label='open dropdown menu'>
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
  );
});
BurgerMenu.displayName = 'BurgerMenu';
export default BurgerMenu;
