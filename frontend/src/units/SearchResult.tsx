import React from 'react';
import { useNavigate } from 'react-router';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { type CountryIso2NameMap } from '../model/CountryIso2NameMap';

interface SearchResultProps {
  results: CountryIso2NameMap[];
}

function SearchResultComponent(props: SearchResultProps) {
  const { results } = props;
  const navigate = useNavigate();

  if (results.length === 0) return null;

  return (
    <>
      {results.map((obj) => (
        <ListItem key={obj.countryIso2} disablePadding>
          <ListItemButton
            onClick={() => {
              navigate(`/countries/${obj.countryIso2.toLowerCase()}`);
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
      ))}
    </>
  );
}

export default React.memo(SearchResultComponent);
