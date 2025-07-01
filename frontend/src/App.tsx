import { CurrentTopicContextProvider } from './contexts/CurrentTopicContext';
import { ThemeProvider } from '@emotion/react';
import appTheme from './theme/appTheme';
import { ErrorBoundary } from './utils/ErrorBoundary';
import { createBrowserRouter, RouterProvider } from 'react-router';
import MainLayout from './MainLayout';
import TopPage from './pages/TopPage';
import CountryLoad from './pages/CountryLoad';

const router = createBrowserRouter([
  {
    Component: MainLayout,
    children: [
      { index: true, Component: TopPage },
      { path: 'countries/:iso2', Component: CountryLoad },
      { path: '*', Component: TopPage },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <CurrentTopicContextProvider>
        <ErrorBoundary>
          <RouterProvider router={router} />
        </ErrorBoundary>
      </CurrentTopicContextProvider>
    </ThemeProvider>
  );
}

export default App;
