import { CurrentTopicContextProvider } from './contexts/CurrentTopicContext';
import { ThemeProvider } from '@emotion/react';
import appTheme from './theme/appTheme';
import { ErrorBoundary } from './utils/ErrorBoundary';
import { RouterProvider } from 'react-router';
import AppRouter from './router/AppRouter';

function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <CurrentTopicContextProvider>
        <ErrorBoundary>
          <RouterProvider router={AppRouter} />
        </ErrorBoundary>
      </CurrentTopicContextProvider>
    </ThemeProvider>
  );
}

export default App;
