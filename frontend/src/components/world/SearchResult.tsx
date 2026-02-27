import React from 'react';
import { type CountryIso2NameMap } from '../../model/CountryIso2NameMap';
import { KeyboardNavigableList } from '@/components/custom/keyboard-navigable-list';
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
        <span>{result.countryName}</span>
      </>
    ),
    onClick: () => push(`/countries/${result.countryIso2.toLowerCase()}`),
  };
};

interface SearchResultProps {
  results: CountryIso2NameMap[];
}

function SearchResult(props: SearchResultProps) {
  const { results } = props;
  const router = useRouter();

  if (results.length === 0) return null;
  const resultItems = results.map((result) => resultItem(result, router.push));
  return <KeyboardNavigableList items={resultItems} />;
}

export default React.memo(SearchResult);
