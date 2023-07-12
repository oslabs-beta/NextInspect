import { createRoot } from 'react-dom/client'
import App from '../app/app.tsx'

const domNode: HTMLElement = document.getElementById('root')!
const root = createRoot(domNode)

root.render(<App/>)
