import type { Metadata } from 'next';
import '@/styles/globals.css';
import LayoutHelper from './layout-helper';
import { Geist } from 'next/font/google';

export const metadata: Metadata = {
  title: 'World',
  description:
    'Explore countries, airports, and more with World - your gateway to global information.',
};

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={geist.className}>
      <body>
        <div id='root'>
          <LayoutHelper>{children}</LayoutHelper>
        </div>
      </body>
    </html>
  );
}
