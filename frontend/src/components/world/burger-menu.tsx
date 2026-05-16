'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/shadcn/dropdown-menu';
import {
  MenuIcon,
  HomeIcon,
  UserRoundIcon,
  MessageCircleHeartIcon,
} from 'lucide-react';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../custom/button';

const iconStyle = 'size-5 mr-2';
const textStyle = 'text-lg';

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
      <DropdownMenuContent className='z-[1202] w-50 flex flex-col gap-3 sm:gap-0'>
        <DropdownMenuItem
          onClick={() => {
            router.push('/');
          }}
          className={textStyle}
        >
          <HomeIcon className={iconStyle} />
          Home
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            router.push('/author');
          }}
          className={textStyle}
        >
          <UserRoundIcon className={iconStyle} />
          Author
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push('/inquiry')}
          className={textStyle}
        >
          <MessageCircleHeartIcon className={iconStyle} />
          Inquiry
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});
BurgerMenu.displayName = 'BurgerMenu';
export default BurgerMenu;
