'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MenuIcon } from 'lucide-react';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../components/custom/button';

const BurgerMenu = React.memo(() => {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon' aria-label='open dropdown menu'>
          <MenuIcon className='size-6' />
        </Button>
      </DropdownMenuTrigger>
      {/* Since AppBar has z-index 1201 */}
      <DropdownMenuContent className='z-[1202]'>
        <DropdownMenuItem
          onClick={() => {
            router.push('/about');
          }}
        >
          About
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push('/inquiry')}>
          Inquiry
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});
BurgerMenu.displayName = 'BurgerMenu';
export default BurgerMenu;
