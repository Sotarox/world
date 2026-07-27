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
  LogOutIcon,
  LogInIcon,
} from 'lucide-react';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../custom/button';
import { useAuthStore } from '@/store/auth-store';
import { toast } from 'sonner';
import api from '@/api/axios';

const iconStyle = 'size-5 mr-2';
const textStyle = 'text-lg';

const BurgerMenu = React.memo(() => {
  const router = useRouter();
  const { isLoggedIn, logout } = useAuthStore();

  function onLogout() {
    api
      .post('/auth/logout')
      .then(() => {
        toast.success('Logout successful');
        logout();
        router.push('/'); // Redirect to home page after logout
      })
      .catch((error) => {
        toast.error(`Failed to logout: ${error.message}`);
      });
  }

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
        {isLoggedIn && (
          <DropdownMenuItem onClick={onLogout} className={textStyle}>
            <LogOutIcon className={iconStyle} />
            Logout
          </DropdownMenuItem>
        )}
        {!isLoggedIn && (
          <DropdownMenuItem
            onClick={() => {
              router.push('/login');
            }}
            className={textStyle}
          >
            <LogInIcon className={iconStyle} />
            Login
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
});
BurgerMenu.displayName = 'BurgerMenu';
export default BurgerMenu;
