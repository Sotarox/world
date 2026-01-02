import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';
import { MenuIcon } from 'lucide-react';

const BurgerMenu = React.memo(() => {
  const navigate = useNavigate();

  return (
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
  );
});
BurgerMenu.displayName = 'BurgerMenu';
export default BurgerMenu;
