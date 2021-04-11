import React, { Component } from 'react'
import {
    Card,
    Select,
    Input,
    Button,
    Table,
    message,
  } from 'antd'
  import {Link} from 'react-router-dom'
  import { PlusCircleOutlined } from '@ant-design/icons';
  import {reqProducts,reqSearchProducts,reqUpdateStatus} from '../../ajax/index'
  const Option = Select.Option


export default class ProductHome extends Component {

    state = {
        total: 0, 
        products: [], 
        loading: false,
        searchName: '', 
        searchType: 'productName',
      }

    columns = [
        {
          title: '商品名称',
          dataIndex: 'name',
        },
        {
          title: '商品描述',
          dataIndex: 'desc',
        },
        {
          title: '价格',
          dataIndex: 'price',
          render: (price) => '¥' + price  // 当前指定了对应的属性, 传入的是对应的属性值
        },
        {
          width: 100,
          title: '状态',
          render: (product) => {
            const {status, _id} = product
            const newStatus = status===1 ? 2 : 1
            return (
              <span>
                <Button
                  type='primary'
                  onClick={() => this.updateStatus(_id, newStatus)}
                >
                  {status===1 ? '下架' : '上架'}
                </Button>
                <span>{status===1 ? '在售' : '已下架'}</span>
              </span>
            )
          }
        },
        {
          width: 100,
          title: '操作',
          render: (product) => {
            return (
              <>
            
               <Link to={{pathname:'/product/detail',state:{product}}} >
                   <Button>详情</Button>
               </Link> <br/>
               <Link to={{pathname:'/product/addupdate',state:{product}}} >
                <Button>修改</Button>
                </Link>
              </>
            )
          }
        },
      ];




      getProducts = async (pageNum) => {
        this.pageNum = pageNum // 保存pageNum, 让其它方法可以看到
        this.setState({loading: true}) 

        const {searchName, searchType} = this.state
    // 如果搜索关键字有值, 说明我们要做搜索分页
    let result
    if (searchName) {
      result = await reqSearchProducts({pageNum, pageSize:4, searchName, searchType})
    } else { // 一般分页请求
      result = await reqProducts(pageNum,4)
    }

        
          const {total, list} = result.data
          this.setState({
            total,
            products: list
          })
        
        this.setState({loading: false}) 
      }


      updateStatus = async (productId, status) => {
        this.setState({loading:true})
        const result = await reqUpdateStatus(productId, status)
        this.setState({loading:false})
        if(result.status===0) {
          message.success('更新商品成功')
          this.getProducts(this.pageNum)
        }
      }


    componentDidMount(){
        this.getProducts(1)
    }

    render() {

        const title = (
            <span>
              <Select
                 value= {this.state.searchType}
                 style={{width: 150}}
                 onChange={value => this.setState({searchType:value})}
              >
                <Option value='productName'>按名称搜索</Option>
                <Option value='productDesc'>按描述搜索</Option>
              </Select>
              <Input
                placeholder='关键字'
                style={{width: 150, margin: '0 15px'}}
                value={this.state.searchName}
                onChange={event => this.setState({searchName:event.target.value})}
               
              
              />
              <Button type='primary'  onClick={() => this.getProducts(1)}  >搜索</Button>
            </span>
          )
      
          const extra = (
            <Link to='/product/addupdate'>
            <Button type='primary'>
            <PlusCircleOutlined/>
              添加商品
            </Button>
            </Link>
          )



        return (
            
                <Card  title={title} extra={extra} style={{height:'590px'}}>
                    <Table
                        bordered
                        rowKey='_id'
                        pagination={{total:this.state.total,
                            onChange: this.getProducts}}
                        dataSource={this.state.products}
                        columns={this.columns}
                        loading={this.state.loading}
                        />
                </Card>
            
        )
    }
}
