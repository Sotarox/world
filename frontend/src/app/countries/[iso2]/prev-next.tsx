'use client';

import {
  nextCountryNav,
  previousCountryNav,
} from '@/model/country-iso2-name-map';
import { useCountryNav } from '@/store/country-nav-store';
import { ArrowLeft, ArrowRight } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import 'flag-icons/css/flag-icons.min.css';
import { useRouter } from 'next/navigation';
import { CircleFlag } from 'react-circle-flags';

function PrevNext({ iso2 }: { iso2: string }) {
  const currentIso2 = iso2.toUpperCase();

  const countryNavs = useCountryNav((s) => s.countries);
  if (countryNavs.length === 0) {
    return <></>;
  }

  const previousNav = previousCountryNav(currentIso2, countryNavs);
  const nextNav = nextCountryNav(currentIso2, countryNavs);
  const router = useRouter();

  return (
    <div className='pb-2 sm:pb-0 flex flex-col gap-3'>
      <div className='flex w-full justify-center'>
        {previousNav && (
          <IconButton
            onClick={() =>
              router.push(`/countries/${previousNav.alpha2Code.toLowerCase()}`)
            }
          >
            <CircleFlag
              countryCode={previousNav.alpha2Code.toLowerCase() || ''}
              height='20'
              width='20'
              title={previousNav.name || ''}
            />
            <ArrowLeft />
          </IconButton>
        )}
        {nextNav && (
          <IconButton
            onClick={() =>
              router.push(`/countries/${nextNav.alpha2Code.toLowerCase()}`)
            }
          >
            <ArrowRight />
            <CircleFlag
              countryCode={nextNav.alpha2Code.toLowerCase() || ''}
              height='20'
              width='20'
              title={nextNav.name || ''}
            />
          </IconButton>
        )}
      </div>
    </div>
  );
}

PrevNext.displayName = 'PrevNext';
export { PrevNext };
