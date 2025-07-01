import Fab from '@mui/material/Fab';
import { Autorenew } from '@mui/icons-material';
import { randomCountryIso2 } from '../model/CountryIso2NameMap';
import { Tooltip, Zoom } from '@mui/material';
import { useNavigate } from 'react-router';

const timeoutMillisec = 500;

function FloatingRandomButton() {
  const navigate = useNavigate();
  const onClick = () => {
    navigate(`/countries/${randomCountryIso2().toLowerCase()}`);
  };
  return (
    <Zoom in={true} timeout={timeoutMillisec} unmountOnExit>
      <Tooltip title='Random Country' placement='left' arrow>
        <Fab
          color='secondary'
          aria-label='add'
          onClick={onClick}
          sx={{
            position: 'fixed',
            display: 'relative',
            bottom: { xs: '100px', sm: '16px' },
            right: { xs: '24px', sm: '16px' },
            zIndex: 1000,
          }}
        >
          <Autorenew />
        </Fab>
      </Tooltip>
    </Zoom>
  );
}

export default FloatingRandomButton;
