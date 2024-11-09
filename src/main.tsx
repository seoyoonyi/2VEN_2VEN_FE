import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';

import App from './App.tsx';

const initMocks = async (): Promise<void> => {
  if (process.env.NODE_ENV === 'development') {
    const { worker } = await import('./mocks/browser');
    worker.start({
      onUnhandledRequest: 'bypass',
    });
  }
  return Promise.resolve();
};
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Failed to find the root element');
}

const root = createRoot(rootElement);
initMocks().then(() => {
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
});
