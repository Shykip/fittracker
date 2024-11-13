import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './assets/styles/App.css'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import Home from './pages/Home'

function App() {

  const router = createBrowserRouter([
    {path: '/home', element: <Home/>},
    {path: '/login', element: <Login />},
    {path: '/signup', element: <Signup />}
  ])

  return ( <><RouterProvider router={router} /></> )
}

export default App
