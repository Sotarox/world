import { HomePageContent } from './home-page-content';

export function generateStaticParams() {
  // Only generate the root path as a static param
  // All other routes will be handled client-side by React Router
  return [{ slug: [] }];
}

function HomePage() {
  return <HomePageContent />;
}

export default HomePage;
