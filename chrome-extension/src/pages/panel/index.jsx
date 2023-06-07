import { createRoot } from 'react-dom/client'
import App from '../app/app'
import '../../assets/styles.css'

const domNode = document.getElementById('root')
const root = createRoot(domNode)

console.log('panel/index.jsx reached')

root.render(<App />)
