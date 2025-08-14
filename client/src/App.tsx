import React from 'react';
import { CurrentTopicContextProvider } from './contexts/CurrentTopicContext';
import { ThemeContextProvider } from './contexts/ThemeContext';
import { ErrorBoundary } from './utils/ErrorBoundary';
import { RouterProvider } from 'react-router';
import AppRouter from './router/AppRouter';

function App() {
  return (
    <ThemeContextProvider>
      <CurrentTopicContextProvider>
        <ErrorBoundary>
          <RouterProvider router={AppRouter} />
        </ErrorBoundary>
      </CurrentTopicContextProvider>
    </ThemeContextProvider>
  );
}

export default App;
