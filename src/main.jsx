import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ContextCountProvider from './ContextAPI/ContextCount.jsx'

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// Create a client
const queryClient = new QueryClient()




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextCountProvider>
      <QueryClientProvider client={queryClient}>
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    
    </ContextCountProvider>
 
 
  
  
  </StrictMode>,
)
