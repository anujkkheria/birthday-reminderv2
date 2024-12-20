import React, { ChangeEvent, useEffect, useState, useContext } from 'react'
import { userContext } from '../../../context/user'
import { Button, IconButton, TextField } from '@mui/material'
import { Add, Close, Camera, Delete } from '@mui/icons-material'
// import data from '../../../assets/data'

interface FriendData {
  id?: string
  name: string
  age: string
  image: File | null
}

const Dashboard: React.FC = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL
  const { state } = useContext(userContext)
  const ButtonStyle = {
    height: '65px',
    bgcolor: 'orange',
    '&:hover': { bgcolor: 'orange', opacity: '0.9' },
  }

  const [Data, setData] = useState<any>([])

  const [addNew, setAddNew] = useState<boolean>(false)

  const [newFriend, setNewFriend] = useState<FriendData>({
    name: '',
    age: '',
    image: null,
  })

  const [imagePreview, setImagePreview] = useState<string>('')

  useEffect(() => {
    fetch(`${BASE_URL}/friends/${state.id}`)
      .then((res) => res.json())
      .then((result) => setData(result.data))
  }, [])

  useEffect(() => {
    console.log(Data)
  }, [Data])

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview)
      }
    }
  }, [imagePreview])

  const click_Image = () => {
    const avatar_img = document.querySelector('#image') as HTMLInputElement
    avatar_img.click()
  }

  const fileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file')
        return
      }

      const objectUrl = URL.createObjectURL(file)
      setImagePreview(objectUrl)
      setNewFriend((prev) => ({ ...prev, image: file }))
    }
  }

  const friendInfoChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setNewFriend({ ...newFriend, [e.target.name]: e.target.value })
    console.log(newFriend)
  }
  const addingNewFriend = async () => {
    if (!newFriend.name || !newFriend.age || !newFriend.image) {
      alert('Please fill all fields including image')
      return
    }

    try {
      const formData = new FormData()
      formData.append('userID', state.id)
      formData.append('name', newFriend.name)
      formData.append('age', newFriend.age)
      formData.append('image', newFriend.image)

      const response = await fetch(`${BASE_URL}/friends/createnew`, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to upload')
      }

      const result = await response.json()

      setData((prev: any) => [
        ...prev,
        {
          id: result.id,
          name: newFriend.name,
          age: newFriend.age,
          image: imagePreview,
        },
      ])

      setNewFriend({
        name: '',
        age: '',
        image: null,
      })
      setImagePreview('')
      setAddNew(false)
    } catch (error) {
      console.error('Upload failed:', error)
      alert('Failed to add friend. Please try again.')
    }
  }

  const Deletefriend = (id: string) => {
    const newData = Data.filter((item: any) => item.id !== id)
    setData(newData)
    console.log(id, newData)
    // fetch(`http://127.0.0.1:3000/friends/friend=${id}`,{
    //   method:"DELETE"
    // })
  }

  return (
    <div className='w-full h-full flex justify-center items-center bg-orange-200 p-4'>
      <div className='w-full md:w-[600px] lg:w-[800px] flex flex-col bg-slate-50 shadow-md shadow-gray-500 items-center gap-2 justify-center p-4 rounded-lg'>
        <div className='w-full max-h-[60vh] overflow-y-auto overflow-x-hidden'>
          {Data.map((item: any) => (
            <article
              key={item.id}
              className='w-full flex items-center gap-4 p-2 hover:bg-gray-50'
            >
              <div className='w-20 flex-shrink-0'>
                <img
                  src={item.image}
                  alt={item.name}
                  className='w-20 h-20 rounded-[50%] object-cover shadow-sm shadow-orange-500'
                />
              </div>
              <div className='flex-grow'>
                <h4 className='text-lg font-medium mb-1'>{item.name}</h4>
                <p className='text-gray-600'>{item.age} years</p>
              </div>
              <div className='flex-shrink-0'>
                <Button
                  sx={{ color: 'orangered' }}
                  onClick={() => Deletefriend(item.id)}
                >
                  <Delete />
                </Button>
              </div>
            </article>
          ))}
        </div>
        <div className='w-full flex flex-col gap-2 px-2'>
          {addNew ? (
            <article className='w-full flex flex-col sm:flex-row items-center gap-4 p-2'>
              <div
                className='relative w-20 h-20 rounded-[50%] bg-gray-200 flex-shrink-0 cursor-pointer hover:bg-gray-300'
                onClick={() => click_Image()}
              >
                <input
                  className='hidden'
                  type='file'
                  id='image'
                  accept='image'
                  onChange={(e) => fileChange(e)}
                />
                {!newFriend.image ? (
                  <IconButton
                    aria-describedby='image'
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '100%',
                      height: '100%',
                    }}
                  >
                    <Camera />
                  </IconButton>
                ) : (
                  <img
                    src={imagePreview}
                    alt='Preview'
                    className='h-full w-full rounded-[50%] object-cover'
                  />
                )}
              </div>
              <div className='flex flex-col gap-2 w-full sm:w-auto flex-grow'>
                <TextField
                  placeholder='name'
                  size={'small'}
                  name='name'
                  value={newFriend.name}
                  onChange={(e) => friendInfoChange(e)}
                  type={'text'}
                  fullWidth
                />
                <TextField
                  placeholder='age'
                  size='small'
                  name='age'
                  value={newFriend.age}
                  onChange={(e) => friendInfoChange(e)}
                  type={'number'}
                  fullWidth
                />
              </div>
              <div className='flex gap-2 mt-2 sm:mt-0'>
                <Button
                  variant='contained'
                  sx={{
                    bgcolor: 'orange',
                    borderRadius: '50%',
                    minWidth: { xs: '48px', sm: '40px' },
                    width: { xs: '48px', sm: '40px' },
                    height: { xs: '48px', sm: '40px' },
                    padding: 0,
                    '&:hover': { bgcolor: 'orange', opacity: '0.9' },
                  }}
                  onClick={() => addingNewFriend()}
                >
                  <Add />
                </Button>
                <IconButton
                  sx={{
                    color: 'orangered',
                    width: { xs: '48px', sm: '40px' },
                    height: { xs: '48px', sm: '40px' },
                  }}
                  onClick={() => setAddNew((prev) => !prev)}
                >
                  <Close />
                </IconButton>
              </div>
            </article>
          ) : (
            <Button
              variant='contained'
              sx={{
                ...ButtonStyle,
                height: { xs: '48px', sm: '65px' },
              }}
              fullWidth
              onClick={() => setAddNew((prev) => !prev)}
            >
              Add new
            </Button>
          )}
          <Button
            variant='contained'
            sx={{
              ...ButtonStyle,
              height: { xs: '48px', sm: '65px' },
            }}
            fullWidth
          >
            Delete All
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
