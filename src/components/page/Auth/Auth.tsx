import React from 'react'
import { Outlet } from 'react-router-dom'
const Auth: React.FC = () => {
  return (
    <div className='w-full h-full bg-orange-100 flex flex-col items-center justify-center mb-3'>
      <div>
        <h1 className=' text-3xl font-semibold'>The People List</h1>
        <h6 className=' text-sm text-center'>For people who forget faces</h6>
      </div>
      <div className=' w-11/12 h-3/4 md:w-1/2 md:h-1/2  bg-white m-5 shadow-md shadow-orange-400 box-border '>
        <Outlet />
      </div>
    </div>
  )
}

export default Auth
