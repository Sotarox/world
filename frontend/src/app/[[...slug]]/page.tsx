// import { ClientOnly } from './client';

export function generateStaticParams() {
  // Only generate the root path as a static param
  // All other routes will be handled client-side by React Router
  return [{ slug: [] }];
}

export default function Page() {
  // return <ClientOnly />;
  return null;
}
