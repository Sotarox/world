import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { type CountryIso2NameMap } from '../model/CountryIso2NameMap';
import { useNavigate } from 'react-router';

interface SearchResultProps {
  results: CountryIso2NameMap[];
  reset: () => void;
}

function SearchResult(props: SearchResultProps) {
  const { results, reset } = props;
  const navigate = useNavigate();

  if (results.length > 0) {
    return results.map((obj) => (
      <ListItem key={obj.countryIso2} disablePadding>
        <ListItemButton
          onClick={() => {
            navigate(`/countries/${obj.countryIso2.toLowerCase()}`);
            reset();
          }}
        >
          <ListItemIcon>
            <span
              className={`fi fi-${obj.countryIso2.toLowerCase()}`}
              style={{
                height: '24px',
                width: '24px',
                flexShrink: '0',
              }}
            ></span>
          </ListItemIcon>
          <ListItemText primary={obj.countryName} />
        </ListItemButton>
      </ListItem>
    ));
  } else {
    return <></>;
  }
}
export default SearchResult;
