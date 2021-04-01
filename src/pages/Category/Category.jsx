import React, { Component } from 'react'
import { Card,Table,Button,Modal,Form,Select,Input } from 'antd';
import { reqCategorys} from '../../ajax/index'
import { PlusCircleOutlined } from '@ant-design/icons';

const { Option } = Select;

export default class Category extends Component {

    state={
        loading:false,
        categorys:[],
        subCategorys: [], 
        parentId: '0', 
        parentName: '', 
        showStatus: 0, 
    }
     

    getCategorys=async()=>{

        this.setState({loading:true})
        const result=await reqCategorys(this.state.parentId)
        console.log('parentId', this.state.parentId) 
        if(this.state.parentId==='0') {

            this.setState({categorys:result.data})
          } else {
            this.setState({subCategorys: result.data})
          }
          this.setState({loading:false})
    }

    showSubCategorys = (category) => {
        
        this.setState({
          parentId: category._id,
          parentName: category.name
        }, () => {
            
          this.getCategorys()
        })
    }
      
    showCategorys = () => {
      
        this.setState({
          parentId: '0',
          parentName: '',
          subCategorys: []
        })
      }



    addNew=()=>{
         this.setState({showStatus:1})
      }

    handleCancel=()=>{
      this.setState({showStatus:0})
    }

    componentDidMount(){
        this.getCategorys()
        
    }


    render() {

       
          
          const columns = [
            {
              title: '商品分类',
              dataIndex: 'name',
              key: 'name',
              width:'80%',
              
            },
           
            {
                title: '',
                dataIndex: '',
                key: 'x',
                render: (categorys) => ( 
                    <>
                      {this.state.parentId==='0' ? <Button type="primary" style={{marginRight:'20px'}} onClick={() => this.showSubCategorys(categorys)}>查看子分类</Button> : null}
                      <Button    type="primary" >修改分类</Button>
                   </>)
              },
          ];

        return (
            <div style={{height:'100%'}}>
               <Card title={this.state.parentId==='0'?'品类管理':(
                   <>
               <Button onClick={this.showCategorys} style={{marginRight:400}} type="primary">返回上一级</Button>
                {this.state.parentName}
                 </>)} extra={<Button type="primary" onClick={this.addNew} ><PlusCircleOutlined />添加分类</Button>} style={{height:'100%'}}>
                 
               <Table dataSource={this.state.parentId==='0' ? this.state.categorys : this.state.subCategorys}
                    columns={columns} rowKey='_id' pagination={{pageSize:5}} 
                    loading={this.state.loading}/>;

                  <Modal title="Basic Modal" visible={this.state.showStatus===1} onOk={this.handleOk} onCancel={this.handleCancel}>
                        <Form.Item >
                           <Select defaultValue={this.state.parentName}   onChange={this.handleChange}>
                           <Option value='0'>一级分类</Option>
                           {
                                this.state.categorys.map(c => <Option value={c._id}>{c.name}</Option>)
                           }
                           
                            </Select>
                           
                        </Form.Item>
                        <Form.Item>
                            <Input placeholder="请输入分类名称" />
                        </Form.Item>
                  </Modal>
               </Card>
                    
            </div>
        )
    }
}
