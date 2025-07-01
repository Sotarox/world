import * as React from 'react';
import { CurrentIso2ContextProvider } from './contexts/CurrentIso2Context';
import { CurrentTopicContextProvider } from './contexts/CurrentTopicContext';
import { ThemeProvider } from '@emotion/react';
import appTheme from './theme/appTheme';
import { ErrorBoundary } from './utils/ErrorBoundary';
import { createBrowserRouter, RouterProvider } from 'react-router';
import Contents from './pages/Contents';
import MainLayout from './MainLayout';
import TopPage from './pages/TopPage';

const router = createBrowserRouter([
  {
    Component: MainLayout,
    children: [
      { index: true, Component: Contents },
      { path: 'countries', Component: Contents },
      { path: 'top', Component: TopPage },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <CurrentIso2ContextProvider>
        <CurrentTopicContextProvider>
          <ErrorBoundary>
            <RouterProvider router={router} />
          </ErrorBoundary>
        </CurrentTopicContextProvider>
      </CurrentIso2ContextProvider>
    </ThemeProvider>
  );
}

export default App;
