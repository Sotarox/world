'use client';

import { type Country } from '@/model/country';
import { IconButton } from '@mui/material';
import { ArrowLeft, ArrowRight } from '@mui/icons-material';
import {
  previousCountryNav,
  nextCountryNav,
} from '@/model/country-iso2-name-map';
import { CircleFlag } from 'react-circle-flags';
import 'flag-icons/css/flag-icons.min.css';
import { useApi } from '@/api/use-api';
import { useCountryNav } from '@/store/country-nav-store';
import { useRouter } from 'next/navigation';

function PrevNext({ iso2 }: { iso2: string }) {
  const currentIso2 = iso2.toUpperCase();

  const { data: country } = useApi<Country>(`/countries/${currentIso2}`);
  const countryNavs = useCountryNav((s) => s.countries);

  const previousNav = previousCountryNav(currentIso2, countryNavs);
  const nextNav = nextCountryNav(currentIso2, countryNavs);
  const router = useRouter();

  if (country) {
    return (
      <div className='pb-2 sm:pb-0 flex flex-col gap-3'>
        <div className='flex w-full justify-center'>
          {previousNav && (
            <IconButton
              onClick={() =>
                router.push(
                  `/countries/${previousNav.alpha2Code.toLowerCase()}`
                )
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
  } else {
    return <></>;
  }
}

export { PrevNext };
