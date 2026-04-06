import React from 'react';
import { type CountryIso2NameMap } from '../../model/country-iso2-name-map';
import { KeyboardNavigableList } from '@/components/world/keyboard-navigable-list';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import 'flag-icons/css/flag-icons.min.css';

const resultItem = (
  result: CountryIso2NameMap,
  push: (path: string) => void
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
        <span>
          {result.countryName} ({result.countryIso2})
        </span>
      </>
    ),
    onClick: () => push(`/countries/${result.countryIso2.toLowerCase()}`),
  };
};

interface SearchResultProps {
  results: CountryIso2NameMap[];
}

const SearchResult = React.memo((props: SearchResultProps) => {
  const { results } = props;
  const router = useRouter();

  if (results.length === 0) return null;
  const resultItems = results.map((result) => resultItem(result, router.push));
  return <KeyboardNavigableList items={resultItems} />;
});

SearchResult.displayName = 'SearchResult';
export { SearchResult };
