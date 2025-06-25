import type * as React from 'react';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    fatValue: React.CSSProperties;
  }

  // allow configuration using `createTheme()`
  interface TypographyVariantsOptions {
    fatValue?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    fatValue: true;
  }
}
