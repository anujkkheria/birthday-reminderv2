import React, { useContext, useState } from 'react'
import { TextField, InputAdornment, Button } from '@mui/material'
import {
  Email,
  Lock,
  VisibilityOff,
  Visibility,
  Person,
} from '@mui/icons-material'
import { userContext } from '../../../context/user'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const { state, setUser } = useContext(userContext)
  const BASE_URL = import.meta.env.VITE_BASE_URL
  const navigate = useNavigate()
  const [signupInfo, setSignupInfo] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const onCredentialchange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSignupInfo((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }
  const onSubmit = () => {
    console.log(signupInfo)
    fetch(`${BASE_URL}/auth/Signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(signupInfo),
    })
      .then((result) => result.json())
      .then((result) => {
        setUser({ ...result?.body })
        console.log(state)
      })
      .then(() => navigate('/dashboard'))
  }

  return (
    <div className='flex flex-col gap-4 p-3'>
      <h2 className=' font-bold self-center'>Signup</h2>
      <TextField
        size='small'
        label={'name'}
        value={signupInfo.name}
        name='name'
        onChange={(event) => onCredentialchange(event)}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <Person />
            </InputAdornment>
          ),
        }}
        type='text'
        fullWidth
      />
      <TextField
        size='small'
        label={'email'}
        value={signupInfo.email}
        name='email'
        onChange={(event) => onCredentialchange(event)}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <Email />
            </InputAdornment>
          ),
        }}
        type='text'
        fullWidth
      />
      <div className='flex flex-col size-full justify-between gap-5'>
        <TextField
          size='small'
          label={'password'}
          name='password'
          value={signupInfo.password}
          onChange={(event) => onCredentialchange(event)}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Lock />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment
                position='end'
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </InputAdornment>
            ),
          }}
          fullWidth
        />
        <TextField
          size='small'
          label={'confirmPassword'}
          name='confirmPassword'
          value={signupInfo.confirmPassword}
          onChange={(event) => onCredentialchange(event)}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Lock />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment
                position='end'
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </InputAdornment>
            ),
          }}
          fullWidth
        />
      </div>
      <Button
        variant='contained'
        sx={{ bgcolor: 'black', borderRadius: 15, padding: '10px 30px' }}
        onClick={() => onSubmit()}
      >
        Signup
      </Button>
    </div>
  )
}

export default Signup
