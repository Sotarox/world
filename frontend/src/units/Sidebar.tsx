import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
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

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: () => void;
}

const Sidebar = React.memo((props: SidebarProps) => {
  const { isOpen, setIsOpen } = props;
  const navigate = useNavigate();
  const filteredRegions = useRegionFilter((s) => s.regions);
  const countryNavs = useCountryNav((s) => s.countries);
  const setCountryNavs = useCountryNav((s) => s.setCountries);

  useEffect(() => {
    api
      .get<ACCountryNav[]>(`/accountries/nav`)
      .then((res) => {
        const filteredNavs = res.data.filter((obj) =>
          filteredRegions.includes(obj.region)
        );
        setCountryNavs(filteredNavs);
      })
      .catch((error) => {
        if (error.name !== 'CanceledError') {
          console.error(error);
        }
      });
  }, [filteredRegions, setCountryNavs]);

  const renderList = () => (
    <Box
      sx={{ width: { xs: '250px', sm: '300px' } }}
      role='presentation'
      onClick={setIsOpen}
    >
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
    </Box>
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
          },
        },
      }}
    >
      <CountryFilter />
      {renderList()}
    </SwipeableDrawer>
  );
});
Sidebar.displayName = 'Sidebar';
export default Sidebar;
