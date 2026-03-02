import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface CountryShapeProps {
  iso2: string;
  width: number;
  height: number;
  className?: string;
}

// iso2 is small letters e.g. 'us', 'fr', 'jp'
function CountryShape({ iso2, width, height, className }: CountryShapeProps) {
  const [isExist, setExist] = useState(false);
  const path = `/country-shapes/${iso2}/vector.svg`;

  useEffect(() => {
    fetch(path, { method: 'HEAD' }).then((res) => {
      if (res.status === 200 || res.status === 204) {
        setExist(true);
      }
    });
  }, [iso2]);

  if (!isExist) {
    return null;
  }

  return (
    <Image
      src={path}
      alt={iso2}
      width={width}
      height={height}
      className={cn('dark:invert', className)}
    />
  );
}

export { CountryShape };
