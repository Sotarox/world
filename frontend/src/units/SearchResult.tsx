import React from 'react';
import { useNavigate } from 'react-router';
import { type CountryIso2NameMap } from '../model/CountryIso2NameMap';
import { KeyboardNavigableList } from '@/components/custom/keyboard-navigable-list';
import { cn } from '@/lib/utils';

const resultItem = (
  result: CountryIso2NameMap,
  navigate: (path: string) => void
) => {
  return {
    node: (
      <>
        <span
          className={cn(
            `fi fi-${result.countryIso2.toLowerCase()}`,
            'size-6 shrink-0'
          )}
        />
        <span>{result.countryName}</span>
      </>
    ),
    onClick: () => navigate(`/countries/${result.countryIso2.toLowerCase()}`),
  };
};

interface SearchResultProps {
  results: CountryIso2NameMap[];
}

function SearchResultComponent(props: SearchResultProps) {
  const { results } = props;
  const navigate = useNavigate();

  if (results.length === 0) return null;

  const resultItems = results.map((result) => resultItem(result, navigate));

  return <KeyboardNavigableList items={resultItems} />;
}

export default React.memo(SearchResultComponent);
