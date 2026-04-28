// Format a number with commas as thousands separators e.g. 1234567 -> 1,234,567
export const formatNumberWithComma = (num: number) => {
  const numStr = num.toString();
  return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const formatCoordinate = (coordinate: number[] | null) => {
  if (!coordinate || coordinate.length !== 2) {
    return 'N/A';
  }
  const [lat, lng] = coordinate;
  const latDirection = lat >= 0 ? 'N' : 'S';
  const lngDirection = lng >= 0 ? 'E' : 'W';
  return `${Math.abs(lat).toFixed(2)}° ${latDirection}, ${Math.abs(lng).toFixed(2)}° ${lngDirection}`;
};

export const concatStringsWithComma = (values: string[] | undefined) => {
  if (!values || values.length === 0) {
    return 'N/A';
  } else {
    return values.join(', ');
  }
};

export const formatGdpValue = (
  value: number,
  showUnitShort: boolean = true
): string => {
  if (value >= 1_000_000_000_000) {
    return `${Math.round(value / 1_000_000_000_000).toFixed(1)} ${showUnitShort ? 'T' : 'Trillion'}`;
  } else if (value >= 1_000_000_000) {
    return `${Math.round(value / 1_000_000_000)} ${showUnitShort ? 'B' : 'Billion'}`;
  } else if (value >= 1_000_000) {
    return `${Math.round(value / 1_000_000)} ${showUnitShort ? 'M' : 'Million'}`;
  } else if (value >= 1_000) {
    return `${Math.round(value / 1_000)} ${showUnitShort ? 'K' : 'Thousand'}`;
  }
  return `${Math.round(value)}`;
};

export const formatRankInfo = (
  rank: number,
  countCountries: number
): string => {
  const order =
    rank === 1 ? 'st' : rank === 2 ? 'nd' : rank === 3 ? 'rd' : 'th';
  return `${rank}${order} in ${countCountries} countries`;
};
