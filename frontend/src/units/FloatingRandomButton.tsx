import React, { useEffect, useState } from 'react';
import { Shuffle as ShuffleIcon } from 'lucide-react';
import { randomCountryIso2 } from '../model/CountryIso2NameMap';
import { Tooltip } from '@mui/material';
import { useNavigate } from 'react-router';
import { Button } from '../components/custom/button';

function FloatingRandomButton() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 10);
    return () => clearTimeout(timer);
  }, []);
  return (
    <Tooltip title='Random Country' placement='left' arrow>
      <Button
        variant='secondary'
        className={`fixed size-12 bottom-[76px] sm:bottom-6 right-6 z-1000 rounded-full drop-shadow-lg/50 drop-shadow-neutral-500 hover:bg-green-700 dark:hover:bg-green-700/60 transition-all duration-500 ease-out transform
          ${show ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
        onClick={() =>
          navigate(`/countries/${randomCountryIso2().toLowerCase()}`)
        }
      >
        <ShuffleIcon className='size-6' />
      </Button>
    </Tooltip>
  );
}

export default FloatingRandomButton;
