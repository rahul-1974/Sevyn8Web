import './tokens.css'
import './styles.css'
import { ViteReactSSG } from 'vite-react-ssg'
import { routes } from './App.jsx'

export const createRoot = ViteReactSSG({ routes })
