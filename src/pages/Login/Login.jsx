import { Form, Input, Button, Checkbox,message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import React, { Component } from 'react'
import {reqLogin} from '../../ajax/index'
import memory from '../../memory'

export default class Login extends Component {
   
    onFinish =async (values) => {
     let response=await reqLogin(values.username,values.password)
     
     if (response.status===0) { // 登陆成功
      
      message.success('登陆成功')
      memory.user=response.data
      localStorage.setItem('user',JSON.stringify(response.data))
      console.log(memory.user)
      this.props.history.push('/')

    } else { // 登陆失败
      message.error(response.msg)
    }
        
    };


    render() {

        
        return (
          <div className='login'>
          <header className='admin-header'>React后台管理</header>
          <section className='admin-login'>
          
          
            <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={this.onFinish}
          >
            <Form.Item
              name="username"
              validateTrigger='onBlur'
              rules={[
                {
                  whitespace:false,
                  required: true,
                  message: '用户名不能为空',
                },
                {
                    max:12,
                    message:"用户名不能大于12位"
                },
                {
                    min:4,
                    message:'用户名不能小于4位'
                },
                {
                    pattern:/^[a-zA-Z0-9]+$/,
                    message:'用户名必须是字母、数字或下划线'
                }
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" style={{color:'#d9d9d9'}} />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              validateTrigger='onBlur'
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!',
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" style={{color:'#d9d9d9'}} />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox className='remeberPassword'>记住密码</Checkbox>
                
              </Form.Item>
      
              <a className="login-form-forgot" href="http://www.baidu.com">
                忘记密码
              </a>
            </Form.Item>
             <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
              Or <a href="http://www.baidu.com">立即注册</a>
            </Form.Item>
          </Form>
          </section>
          </div>
        )
     }
    }
    

