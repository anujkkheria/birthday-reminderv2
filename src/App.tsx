import React from 'react'
import Router from './components/Router'
import {UserProvider} from "./context/user"
import './index.css'
const App:React.FC = () => {
  return (
    <div className='w-screen h-screen'>
      <UserProvider>
      <Router />
    </UserProvider>
    </div>
  )
}

export default App
