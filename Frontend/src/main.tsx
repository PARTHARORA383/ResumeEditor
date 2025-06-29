import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ParsedStateProvider } from './context/Parsecontent.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ParsedStateProvider>
    <App />
    </ParsedStateProvider>
  </StrictMode>,
)
