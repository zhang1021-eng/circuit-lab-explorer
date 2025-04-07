
// This file is kept for backward compatibility with Vite
// The main entry point is now src/pages/_app.tsx for Next.js
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Only execute in Vite environment
if (!process.env.NEXT_RUNTIME) {
  createRoot(document.getElementById("root")!).render(<App />);
}
