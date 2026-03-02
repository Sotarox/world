import type { Metadata } from 'next';
import '@/styles/globals.css';
import LayoutHelper from './layout-helper';

export const metadata: Metadata = {
  title: 'World',
  description:
    'Explore countries, airports, and more with World - your gateway to global information.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <div id='root'>
          <LayoutHelper>{children}</LayoutHelper>
        </div>
      </body>
    </html>
  );
}
