// Vite stays intentionally thin here: React handles rendering and Tailwind
// handles styling, so the config only wires the two together.
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
