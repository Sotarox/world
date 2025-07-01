import React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { countryIso2NameMap } from '../model/CountryIso2NameMap';
import { useNavigate } from 'react-router';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: () => void;
}

const Sidebar = React.memo((props: SidebarProps) => {
  const { isOpen, setIsOpen } = props;
  const navigate = useNavigate();

  const list = () => (
    <Box
      sx={{ width: { xs: '250px', sm: '300px' } }}
      role='presentation'
      onClick={setIsOpen}
    >
      <List>
        {countryIso2NameMap
          .sort((a, b) => (a.countryName < b.countryName ? -1 : 1))
          .map((obj) => (
            <ListItem key={obj.countryIso2} disablePadding>
              <ListItemButton
                onClick={() =>
                  navigate(`/countries/${obj.countryIso2.toLowerCase()}`)
                }
              >
                <ListItemIcon>
                  <span
                    className={`fi fi-${obj.countryIso2.toLowerCase()}`}
                    style={{ height: '24px', width: '24px', flexShrink: '0' }}
                  ></span>
                </ListItemIcon>
                <ListItemText primary={obj.countryName} />
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
      {list()}
    </SwipeableDrawer>
  );
});
export default Sidebar;
