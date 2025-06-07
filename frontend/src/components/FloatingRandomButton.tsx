import { useContext } from 'react';
import Fab from '@mui/material/Fab';
import { Autorenew } from '@mui/icons-material';
import { SetCurrentIso2Context } from '../contexts/CurrentIso2Context';
import { randomCountryIso2 } from '../model/CountryIso2NameMap';
import Zoom from '@mui/material/Zoom';

const timeoutMillisec = 500;

function FloatingRandomButton() {
    const { setCurrentIso2 } = useContext(SetCurrentIso2Context);

    return (
        <Zoom in={true} timeout={timeoutMillisec} unmountOnExit>
            <Fab color="secondary" aria-label="add"
                onClick={() => setCurrentIso2(randomCountryIso2())}
                sx={{
                    position: 'fixed', display: 'relative',
                    bottom: { xs: '100px', sm: '16px' },
                    right: { xs: '24px', sm: '16px' },
                    zIndex: 1000
                }}
            >
                <Autorenew />
            </Fab>
        </Zoom>
    )
}

export default FloatingRandomButton;;