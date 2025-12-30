import { createBrowserRouter } from 'react-router';
import AppLayout from './AppLayout';
import TopPage from '../pages/TopPage';
import CountryLoad from '../pages/CountryLoad';
import Inquiry from '../pages/Inquiry';

const AppRouter = createBrowserRouter([
  {
    Component: AppLayout,
    children: [
      { index: true, Component: TopPage },
      { path: 'countries/:iso2', Component: CountryLoad },
      { path: 'inquiry', Component: Inquiry },
      { path: '*', Component: TopPage },
    ],
  },
]);

export default AppRouter;
