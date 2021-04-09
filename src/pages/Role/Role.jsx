import React, { Component } from 'react'
import {
    Card,
    Button,
    Table,
    Modal,
    Form,
    Input,
    message,
    Tree
  } from 'antd'
import { reqRoles,reqAddRole} from '../../ajax/index'




export default class Role extends Component {
     
    state={
        roles:[],
        role:{},
        showAdd:false,
        showAU:false
    }


    onRow = (role) => {
        return {
          onClick: event => { 
            this.setState({
                role
              })
           
          },
        }
      }

      handleOk=async()=>{
        const results=this.formRef.getFieldValue()
       
        this.formRef.resetFields()
        const result = await reqAddRole(results.roleName)
       
        if (result.status===0) {
          message.success('添加角色成功')
          const role = result.data
    
          this.setState(state => ({
            roles: [...state.roles, role],
            showAdd:false
          }))

        } else {
          message.success('添加角色失败')
        }

      }
   
     


    getRoles = async () => {
        const result = await reqRoles()
        if (result.status===0) {
          const roles = result.data
          this.setState({
            roles
          })
        }
      }

    componentDidMount () {
        this.getRoles()
      }

    render() {

        const columns = [
            {
              title: '角色名称',
              dataIndex: 'name'
            },
            {
              title: '创建时间',
              dataIndex: 'create_time',
             
            },
            {
              title: '授权时间',
              dataIndex: 'auth_time',
              
            },
            {
              title: '授权人',
              dataIndex: 'auth_name'
            },
          ]


          const treeData =[
            {
              title: '平台权限',
              key: '0-0',
              children: [
                {
                  title: '首页',
                  key: '/home',
                  
                },
                {
                  title: '商品',
                  key: '/products',
                  children: [
                    {
                      title: '品类管理',
                      key: '/category',
                    },
                    {
                      title: '商品管理',
                      key: '/product',
                    },
                  ]
                },
                {
                  title: '用户管理',
                  key: '/user',
                  
                },
                {
                  title: '角色管理',
                  key: '/role',
                  
                },
              ]
            }
            ]
        const title = (
            <>
              <Button type='primary' disabled={!this.state.role._id}
               onClick={()=>{this.setState({showAU:true})}} >设置角色权限</Button>
            </>
          )

        const extra=(
            <>
            <Button type='primary' onClick={()=>{this.setState({showAdd:true})}}>创建角色</Button>
            </>
        )
        return (
            <Card title={title}  extra={extra}   style={{height:'580px'}}>
                <Table bordered
                    rowKey='_id'
                    dataSource={this.state.roles}
                    columns={columns}
                    rowSelection={{
                        type: 'radio',
                        selectedRowKeys:[this.state.role._id]
            
                      }}
                      pagination={{defaultPageSize: 7}}
                      onRow={this.onRow}
                    />

              <Modal title="创建角色" visible={this.state.showAdd} onOk={this.handleOk} 
                     onCancel={() => {this.setState({showAdd: false})}}  destroyOnClose={true}>
                  <Form ref={c=>this.formRef=c} name="control-ref" >
                        <Form.Item name='roleName'>
                          <Input placeholder='请输入角色名称'   />
                        </Form.Item>
                  </Form>
              </Modal>

              <Modal title='设置角色权限' visible={this.state.showAU} onOk={this.onAuOk} 
                     onCancel={() => {this.setState({showAU: false})}}  destroyOnClose={true}>
           
                  
                    <Input value={this.state.role.name} disabled  />
                 
                  <Tree
                    checkable
                    defaultExpandAll={true}
                    treeData={treeData}
    />
              </Modal>
            </Card>
        )
    }
}
