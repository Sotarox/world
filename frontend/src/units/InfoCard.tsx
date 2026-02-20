import React from 'react';

interface InfoCardProps {
  title: string | null;
  value: string | null;
}

function InfoCard(props: InfoCardProps) {
  const { title, value } = props;
  return (
    <div className='flex flex-col p-2'>
      <span className='text-lg font-extralight'>{title}</span>
      <span className='text-base'>{value}</span>
    </div>
  );
}

export default InfoCard;
export type { InfoCardProps };
