import * as React from 'react';
import { CurrentIso2ContextProvider } from './contexts/CurrentIso2Context';
import { CurrentTopicContextProvider } from './contexts/CurrentTopicContext';
import { ThemeProvider } from '@emotion/react';
import appTheme from './theme/appTheme';
import { ErrorBoundary } from './utils/ErrorBoundary';
import { createBrowserRouter, RouterProvider } from 'react-router';
import Frame from './Frame';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Frame,
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
