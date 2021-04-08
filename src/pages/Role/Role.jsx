import React, { Component } from 'react'
import {
    Card,
    Button,
    Table,
    
  } from 'antd'
  import { reqRoles} from '../../ajax/index'

export default class Role extends Component {
     
    state={
        roles:[],
        role:{}
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

        const title = (
            <>
              <Button type='primary' disabled={!this.state.role._id}>设置角色权限</Button>
            </>
          )

        const extra=(
            <>
            <Button type='primary' >创建角色</Button>
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

            </Card>
        )
    }
}
