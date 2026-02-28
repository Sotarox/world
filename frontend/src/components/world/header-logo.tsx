import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../custom/button';
import Image from 'next/image';

const HeaderLogo: React.FC = React.memo(() => {
  const router = useRouter();

  return (
    <>
      <Button
        variant='ghost'
        onClick={() => {
          router.push('/');
        }}
        className='text-lg uppercase hidden sm:inline-flex nowrap'
      >
        <Image src='/world-logo.svg' alt='World Logo' width={128} height={32} />
      </Button>
    </>
  );
});

HeaderLogo.displayName = 'HeaderLogo';
export default HeaderLogo;
