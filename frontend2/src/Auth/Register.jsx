import React from 'react'
import {Alert, Card, Flex, Typography, Form, Input, Button, Spin} from 'antd'
import { Link } from 'react-router-dom'
import registerImage from '../assets/register.png'
import useSignUp from '../hooks/useSignUp'


function Register() {
 
  const {loading, error, registerUser} = useSignUp();
 
  const handleRegister = async(values) => {
    //const res = await axios.post('https://localhost:9000/api/v1/users/register', values);
//console.log("Response :",res);

    registerUser(values)
  }
  
  return (
   <Card className='form-container'>
    <Flex gap='large' align='center'>
      <Flex vertical flex={1}>
        <Typography.Title level={3} strong className="title" >
          Create an account
        </Typography.Title>
        <Typography.Text type="secondary" strong className="slogan">
          Join for getting your comrade
        </Typography.Text>
        <Form 
            layout='vertical' 
            onFinish={handleRegister}
            autoComplete="off" 
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required:true,
                message:'Please enter your full name!'
              }
            ]}
          >
            <Input size='small' placeholder="Enter your full name" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required:true,
                message:'Please enter your Email !'
              },
              {
                type:'email',
                message:"The input is not valid Email !"
              }
            ]}
          >

            <Input size='small' placeholder="Enter your Email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required:true,
                message:'Please enter your password!'
              },
            ]}
          >
          <Input.Password size='small' placeholder="Enter your password" />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="passwordConfirm"
            rules={[
              {
                required:true,
                message:'Please enter your password again to confirm!'
              },
            ]}
          >
          <Input.Password size='small' placeholder="Re-enter your password" />
          </Form.Item>

            {
              error && <Alert 
              description={error} 
              type='error'
              showIcon
              closable
              className='alert'  />
            }

          <Form.Item>
            <Button
            type={`${loading? '':"primary"}`}
            htmlType="submit"
            size='small'
            className="btn"
            >
               {`${loading? <Spin/>:"Create Account"}`} 
              
            </Button>
          </Form.Item>
          <Form.Item>
            <Link to='/login'>
            <Button  className="btn">Sign In</Button>
          </Link>
          </Form.Item> 
        </Form>
      </Flex>

      {/* Image */}
      <Flex flex={1}>
        <img src={registerImage} className="auth-Image" />
      </Flex>
    </Flex>
   </Card>
  )
}

export default Register
