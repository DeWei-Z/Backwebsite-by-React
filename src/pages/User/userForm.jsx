import React, { Component } from 'react'
import {
    Form,
    Input,
    Select
  } from 'antd'

const Option = Select.Option

export default class UserForm extends Component {
   
    render() {


        const {roles} = this.props

        return (
            <Form
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="horizontal"
            initialValues={{
             
            }}
           ref={c=>this.FormNode=c}
            onFinish={this.onFinish}
          >
            
            <Form.Item label="用户名" name='username'  >
               <Input placeholder='请输入用户名'/>
            </Form.Item>
           
            <Form.Item label="密码" name='password' >
               <Input type='password' placeholder='请输入密码'/>
            </Form.Item>
           
            <Form.Item label="手机号" name='phone' >
                <Input placeholder='请输入手机号'/>
            </Form.Item>

            <Form.Item  label="邮箱" name='email'>
               <Input placeholder='请输入邮箱'/>
            </Form.Item>
          
            <Form.Item  label='角色' name='role_id'>
            <Select>
                {
                  roles.map(role => <Option key={role._id} value={role._id}>{role.name}</Option>)
                }
              </Select>
            </Form.Item>
          </Form>
        )
    }
}
