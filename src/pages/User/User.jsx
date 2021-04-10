import React, { Component } from 'react'
import {
    Card,
    Button,
    Table,
    Modal,
    message
  } from 'antd'
  import {reqUsers,reqAddOrUpdateUser} from '../../ajax/index'
  import UserForm from '../User/userForm'

export default class User extends Component {
    formRef = React.createRef();
    state = {
        users: [], 
        roles: [], 
        isShow: false, 
      }


      showAdd = () => {
       
        this.setState({isShow: true})
      }

    formateDate(time) {
        if (!time) return ''
        let date = new Date(time)
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
          + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
      }
  

    columns = [
        {
          title: '用户名',
          dataIndex: 'username'
        },
        {
          title: '邮箱',
          dataIndex: 'email'
        },
  
        {
          title: '电话',
          dataIndex: 'phone'
        },
        {
          title: '注册时间',
          dataIndex: 'create_time',
          render: this.formateDate
        },
        {
          title: '所属角色',
          dataIndex: 'role_id',
          render: (role_id) => this.roleNames[role_id]
        },
        {
          title: '操作',
          render: (user) => (
            <span>
              <Button onClick={() => this.showUpdate(user)}>修改</Button>
              <Button onClick={() => this.deleteUser(user)}>删除</Button>
            </span>
          )
        },
      ]

      initRoleNames = (roles) => {
        const roleNames = roles.reduce((pre, role) => {
          pre[role._id] = role.name
          return pre
        }, {})
        
        this.roleNames = roleNames
      }


      addOrUpdateUser = async () => {

        this.setState({isShow: false})
    
       
        const user = this.formRef.current.FormNode.getFieldsValue()
       
        this.formRef.current.FormNode.resetFields()
      
        const result = await reqAddOrUpdateUser(user)
      
        if(result.status===0) {
          message.success(`${this.user ? '修改' : '添加'}用户成功`)
          this.getUsers()
        }
      }

      getUsers = async () => {
        const result = await reqUsers()
        
        if (result.status===0) {
          const {users, roles} = result.data
          this.initRoleNames(roles)
          this.setState({
            users,
            roles
          })
        }
      }

      componentDidMount () {
        this.getUsers()
      }

    render() {


        const title = <Button type='primary' onClick={this.showAdd}>创建用户</Button>
        const user = this.user || {}
        return (
            <Card title={title} style={{height:'575px'}}>
                <Table
                bordered
                rowKey='_id'
                dataSource={this.state.users}
                columns={this.columns}
                pagination={{defaultPageSize: 5}}
                />

                <Modal
                title={user._id ? '修改用户' : '添加用户'}
                visible={this.state.isShow}
                onOk={this.addOrUpdateUser}
                onCancel={() => {
                    this.formRef.current.FormNode.resetFields()
                    this.setState({isShow: false})
                }}
                >
                
                <UserForm  roles={this.state.roles}  user={user} ref={this.formRef} />
               
                </Modal>

      </Card>
        )
    }
}
