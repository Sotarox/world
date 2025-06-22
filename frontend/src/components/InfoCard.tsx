import Typography from '@mui/material/Typography';

interface InfoCardProps {
  title: string | null;
  value: string | null;
}

function InfoCard(props: InfoCardProps) {
  const { title, value } = props;
  return (
    <>
      <Typography variant='h6' style={{ fontWeight: 50 }}>
        {title}
      </Typography>
      <Typography variant='body1' style={{ fontWeight: 500 }}>
        {value}
      </Typography>
    </>
  );
}

export default InfoCard;
