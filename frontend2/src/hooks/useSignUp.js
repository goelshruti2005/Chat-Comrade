import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { message } from 'antd'
import axios from "axios"

const useSignUp = () => {
const {login} = useAuth()
const [error, setError] = useState(null)
const [loading, setLoading] = useState(null)

const registerUser =async(values)=>{
  if(values.password !== values.passwordConfirm){
    return setError('Password are not the same')
  }

  try {
    setError(null)
    setLoading(false)
    const res = await axios.post('https://localhost:8000/api/v1/users/register', values);
    // const res = await fetch('https://localhost:8000/api/v1/users/register', {
    //   method:'POST',
    //   body: JSON.stringify(values)
    // })

    const data = await res.json();
    if(res.status === 201){
      message.success(data.message)
      login(data.token, data.user)
    }else if(res.status === 4000){
      setError(data.message)
    }else{
      message.error('Registration failed')
    }

  } catch (error) {
    message.error(error)
  }finally{
    setLoading(false)
  }
}

  return {loading, error, registerUser}
}

export default useSignUp
