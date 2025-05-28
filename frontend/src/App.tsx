import * as React from 'react';
import BottomBar from './components/BottomBar';
import HeaderBar from './components/HeaderBar';
import Contents from './pages/Contents';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

function App() {
  const [state, setState] = React.useState(false);
  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={()=> setState(false)}
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <HeaderBar toggleDrawer={()=>setState(!state)}/>
        <SwipeableDrawer
              anchor={"left"}
              open={state}
              onClose={()=>{}} // NOP
              onOpen={()=>{}}  // NOP
              slotProps={{
                // TODO: Set Height of HeaderBar and BottomBar programatically
                paper: { sx: {mt: {xs: '0px', sm: '64px'}, 
                              mb: {xs: '80px', sm: '0px'},
                              bottom: 0,
                              height: 'auto' 
                              },
                        }
              }}
            >
              {list()}
        </SwipeableDrawer>
        <Contents/>
      <BottomBar/>
    </>
  )
}

export default App
