import * as React from 'react';
import { Button } from '@/components/custom/button';

interface KeyboardNavigableListProps {
  items: {
    node: React.ReactNode;
    onClick?: () => void;
  }[];
}

const KeyboardNavigableList = (props: KeyboardNavigableListProps) => {
  const { items } = props;
  return (
    <ul className='w-full flex flex-col p-1'>
      {items.map((item, idx) => (
        <li key={idx} className='w-full'>
          <Button
            variant='ghost'
            onClick={item?.onClick}
            className='w-full h-10 justify-start text-secondary-foreground focus:bg-primary focus:text-white truncate font-normal'
          >
            {item.node}
          </Button>
        </li>
      ))}
    </ul>
  );
};

export { KeyboardNavigableList };
