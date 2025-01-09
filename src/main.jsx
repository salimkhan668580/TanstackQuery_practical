import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import ContextCountProvider from './ContextAPI/ContextCount.jsx';

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Import Highlight.run for H and ErrorBoundary
import { H } from 'highlight.run';
import { ErrorBoundary } from '@highlight-run/react';

// Initialize Highlight.run
// H.init('zg0ypp0d', {
//   serviceName: 'frontend-app',
//   tracingOrigins: true,
//   networkRecording: {
//     enabled: true,
//     recordHeadersAndBody: true,
//     urlBlocklist: [
//       // URLs to block
//       'https://www.googleapis.com/identitytoolkit',
//       'https://securetoken.googleapis.com',
//     ],
//   },
// });

// zg0ypp0d  -- is project key==
H.init('zg0ypp0d', {
  serviceName: "frontend-app",
  tracingOrigins: true,
  networkRecording: {
      enabled: true,
      recordHeadersAndBody: true,
  },
});



const queryClient = new QueryClient();

// Render the application with Highlight ErrorBoundary
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextCountProvider>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary>
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
        </ErrorBoundary>
      </QueryClientProvider>
    </ContextCountProvider>
  </StrictMode>
);
