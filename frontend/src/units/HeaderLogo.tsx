import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../components/custom/button';

const HeaderLogo: React.FC = React.memo(() => {
  const router = useRouter();

  return (
    <Button
      variant='ghost'
      onClick={() => {
        router.push('/');
      }}
      className='text-lg uppercase hidden sm:inline-flex nowrap'
    >
      World
    </Button>
  );
});

HeaderLogo.displayName = 'HeaderLogo';
export default HeaderLogo;
