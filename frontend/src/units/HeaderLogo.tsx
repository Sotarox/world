import React from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/custom/button';

const HeaderLogo: React.FC = React.memo(() => {
  const navigate = useNavigate();

  return (
    <Button
      variant='ghost'
      onClick={() => navigate('')}
      className='text-lg hidden sm:inline-flex nowrap'
    >
      WORLD
    </Button>
  );
});

HeaderLogo.displayName = 'HeaderLogo';
export default HeaderLogo;
