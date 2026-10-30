import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { content } from './content/rooms'
import { assertUniqueCodes } from './lib/media'

// Fail loudly while editing content if two media items share a code.
assertUniqueCodes(content)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
