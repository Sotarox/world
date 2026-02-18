import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ACCountryNav } from '@/model/ACCountry';
import { useRegionFilter } from '@/store/RegionFilterStore';
import { CountryFilter } from './CountryFilter';
import { useCountryNav } from '@/store/CountryNavStore';
import api from '../api/axios';
import { Button } from '@/components/ui/button';
import { ArrowDownUpIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/custom/sidebar';

const sidebarColor = 'bg-sidebar dark:bg-gt-subtle text-sidebar-foreground';

export function AppSidebar() {
  const navigate = useNavigate();
  const filteredRegions = useRegionFilter((s) => s.regions);
  const countryNavs = useCountryNav((s) => s.countries);
  const setCountryNavs = useCountryNav((s) => s.setCountries);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    api
      .get<ACCountryNav[]>(`/accountries/nav`)
      .then((res) => {
        const filteredNavs = res.data.filter((obj) =>
          filteredRegions.includes(obj.region)
        );
        if (reverse) {
          filteredNavs.reverse();
        }
        setCountryNavs(filteredNavs);
      })
      .catch((error) => {
        if (error.name !== 'CanceledError') {
          console.error(error);
        }
      });
  }, [filteredRegions, setCountryNavs, reverse]);

  return (
    <Sidebar className={cn('pb-15 sm:pt-15 sm:pb-0', sidebarColor)}>
      <SidebarHeader className={cn('flex-row')}>
        <CountryFilter />
        <Button variant='ghost' onClick={() => setReverse(!reverse)}>
          <ArrowDownUpIcon className='size-5' />
          <span className='text-base'>Reverse</span>
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {countryNavs.map((obj) => (
              <SidebarMenuItem key={obj.name}>
                <SidebarMenuButton
                  asChild
                  onClick={() =>
                    navigate(`/countries/${obj.alpha2Code.toLowerCase()}`)
                  }
                >
                  <div className={cn('flex gap-2')}>
                    <span
                      className={`fi fi-${obj.alpha2Code.toLowerCase()}`}
                      style={{ height: '24px', width: '24px', flexShrink: '0' }}
                    />
                    <span>{obj.name}</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
