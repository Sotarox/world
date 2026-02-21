import { createBrowserRouter } from 'react-router';
import AppLayout from './AppLayout';
import TopPage from '../old-pages/TopPage';
import CountryLoad from '../old-pages/CountryLoad';
import Inquiry from '../old-pages/Inquiry';
import About from '@/old-pages/About';

const AppRouter = createBrowserRouter([
  {
    Component: AppLayout,
    children: [
      { index: true, Component: TopPage },
      { path: 'countries/:iso2', Component: CountryLoad },
      { path: 'about', Component: About },
      { path: 'inquiry', Component: Inquiry },
      { path: '*', Component: TopPage },
    ],
  },
]);

export default AppRouter;
