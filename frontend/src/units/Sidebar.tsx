import React, { useEffect, useState } from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router';
import { ACCountryNav } from '@/model/ACCountry';
import { useRegionFilter } from '@/store/RegionFilterStore';
import { CountryFilter } from './CountryFilter';
import { useCountryNav } from '@/store/CountryNavStore';
import api from '../api/axios';
import { Button } from '@/components/ui/button';
import { ArrowDownUpIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: () => void;
}

const sidebarColor = 'bg-sidebar dark:bg-gt-subtle text-sidebar-foreground';

const Sidebar = React.memo((props: SidebarProps) => {
  const { isOpen, setIsOpen } = props;
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

  const renderList = () => (
    <div
      className={cn('w-[250px] sm:w-[300px]', sidebarColor)}
      role='presentation'
    >
      <button onClick={setIsOpen}>
        <List>
          {countryNavs.map((obj) => (
            <ListItem key={obj.alpha2Code} disablePadding>
              <ListItemButton
                onClick={() =>
                  navigate(`/countries/${obj.alpha2Code.toLowerCase()}`)
                }
              >
                <ListItemIcon>
                  <span
                    className={`fi fi-${obj.alpha2Code.toLowerCase()}`}
                    style={{ height: '24px', width: '24px', flexShrink: '0' }}
                  ></span>
                </ListItemIcon>
                <ListItemText primary={obj.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </button>
    </div>
  );

  const iOS =
    typeof navigator !== 'undefined' &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);

  return (
    <SwipeableDrawer
      anchor={'left'}
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
      disableSwipeToOpen={false}
      open={isOpen}
      onClose={() => {
        setIsOpen();
      }}
      onOpen={() => {}} // NOP
      slotProps={{
        paper: {
          sx: {
            mt: { xs: '0px', sm: 'var(--header-bar-height)' },
            mb: { xs: 'var(--bottom-bar-height)', sm: '0px' },
            bottom: 0,
            height: 'auto',
            backgroundColor: 'var(--sidebar-bg)',
          },
        },
      }}
    >
      <div className={cn('flex gap-2', sidebarColor)}>
        <CountryFilter />
        <Button variant='ghost' onClick={() => setReverse(!reverse)}>
          <ArrowDownUpIcon className='size-5' />
          <span className='text-base'>Reverse</span>
        </Button>
      </div>
      {renderList()}
    </SwipeableDrawer>
  );
});
Sidebar.displayName = 'Sidebar';
export default Sidebar;
