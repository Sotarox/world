import React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router';
import { ACCountryNav } from '@/model/ACCountry';
import useApi from '@/api/useApi';
import { useRegionFilter } from '@/store/RegionFilterStore';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: () => void;
}

const Sidebar = React.memo((props: SidebarProps) => {
  const { isOpen, setIsOpen } = props;
  const navigate = useNavigate();
  const navs: ACCountryNav[] | null =
    useApi<ACCountryNav[]>(`/accountries/nav`);
  const regions = useRegionFilter((s) => s.regions);

  const renderList = (navs: ACCountryNav[]) => (
    <Box
      sx={{ width: { xs: '250px', sm: '300px' } }}
      role='presentation'
      onClick={setIsOpen}
    >
      <List>
        {navs
          .filter((obj) => regions.includes(obj.region))
          .sort((a, b) => (a.name < b.name ? -1 : 1))
          .map((obj) => (
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
      {renderList(navs || [])}
    </SwipeableDrawer>
  );
});
Sidebar.displayName = 'Sidebar';
export default Sidebar;
