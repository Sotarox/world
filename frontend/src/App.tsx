import React from 'react';
import { CurrentTopicContextProvider } from './contexts/CurrentTopicContext';
import { ErrorBoundary } from './utils/ErrorBoundary';
import { RouterProvider } from 'react-router';
import AppRouter from './router/AppRouter';
import { ThemeProvider } from '@/theme/theme-provider';

function App() {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <CurrentTopicContextProvider>
        <ErrorBoundary>
          <RouterProvider router={AppRouter} />
        </ErrorBoundary>
      </CurrentTopicContextProvider>
    </ThemeProvider>
  );
}

export default App;
