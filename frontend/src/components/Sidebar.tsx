import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { countryIso2NameMap } from '../model/CountryIso2NameMap';

interface SidebarProps {
    isOpen: boolean;
    setIsOpen: () => void;
}

function Sidebar(props: SidebarProps) {
    const { isOpen, setIsOpen } = props;

    const list = () => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={setIsOpen}
        >
            <List>
                {countryIso2NameMap
                .sort((a, b) => (a.countryName < b.countryName ? -1 : 1))
                .map((obj) => (
                    <ListItem key={obj.countryIso2} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary={obj.countryName} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <SwipeableDrawer
            anchor={"left"}
            open={isOpen}
            onClose={() => {setIsOpen()}}
            onOpen={() => { }}  // NOP
            slotProps={{
                // TODO: Set Height of HeaderBar and BottomBar programatically
                paper: {
                    sx: {
                        mt: { xs: '0px', sm: '64px' },
                        mb: { xs: '80px', sm: '0px' },
                        bottom: 0,
                        height: 'auto'
                    },
                }
            }}
        >
            {list()}
        </SwipeableDrawer>
    )
}

export default Sidebar
