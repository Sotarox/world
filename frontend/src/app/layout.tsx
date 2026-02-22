import type { Metadata } from 'next';
import '../../public/globals.css';
import LayoutHelper from './layout-helper';

export const metadata: Metadata = {
  title: 'World',
  description: 'Web site created with Next.js.',
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
