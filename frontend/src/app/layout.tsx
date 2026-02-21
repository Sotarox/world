import type { Metadata } from 'next';
import '../../public/globals.css';

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
        <div id='root'>{children}</div>
      </body>
    </html>
  );
}
