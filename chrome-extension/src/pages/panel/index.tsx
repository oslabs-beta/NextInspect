import { createRoot } from 'react-dom/client'
import App from '../app/app.tsx'
// import '../../assets/styles.css'


const domNode: HTMLElement = document.getElementById('root')!
const root = createRoot(domNode)

// console.log('panel/index.jsx reached')

root.render(<App/>)
