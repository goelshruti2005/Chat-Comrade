import React from 'react'
import {Alert, Card, Flex, Typography, Form, Input, Button, Spin} from 'antd'
import { Link } from 'react-router-dom'
import loginImage from '../assets/login.png'



const Login = ()=>{

const handleLogin = ()=>{

}

  return (
    <Card className='form-container'>
    <Flex gap='large' align='center'>
      {/* Image */}
      <Flex flex={1}>
        <img src={loginImage} className="auth-Image" />
      </Flex>
      {/* Form */}
      <Flex vertical flex={1}>
        <Typography.Title level={3} strong className="title" >
          Sign In
        </Typography.Title>
        <Typography.Text type="secondary" strong className="slogan">
            Unlock your world
        </Typography.Text>
        <Form 
            layout='vertical' 
            onFinsish={handleLogin}
            autoComplete="off" 
        >
          
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

            <Input  placeholder="Enter your Email" />
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
          <Input.Password  placeholder="Enter your password" />
          </Form.Item>
          {/* {
              error && <Alert 
              description={error} 
              type='error'
              showIcon
              closable
              className='alert'  />
            } */}

          <Form.Item>
            <Button
            //type={`${loading? '':"primary"}`}
            htmlType="submit"
            size='small'
            className="btn"
            >
              {/* {`${loading? <Spin/>:"Create Account"}`} */}
              Sign In
            </Button>
          </Form.Item>
          <Form.Item>
            <Link to='/register'>
            <Button  className="btn">Create an account</Button>
          </Link>
          </Form.Item> 
        </Form>
      </Flex>

      
    </Flex>
   </Card>
  )
}

export default Login
