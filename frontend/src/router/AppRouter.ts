import { createBrowserRouter } from 'react-router';
import AppLayout from './AppLayout';
import TopPage from '../pages/TopPage';
import CountryLoad from '../pages/CountryLoad';

const AppRouter = createBrowserRouter([
  {
    Component: AppLayout,
    children: [
      { index: true, Component: TopPage },
      { path: 'countries/:iso2', Component: CountryLoad },
      { path: '*', Component: TopPage },
    ],
  },
]);

export default AppRouter;
