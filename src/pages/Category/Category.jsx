import React, { Component } from 'react'
import { Card,Table,Button,Modal,Form,Select,Input } from 'antd';
import { reqCategorys, reqAddCategory} from '../../ajax/index'
import { PlusCircleOutlined } from '@ant-design/icons';


const { Option } = Select;


export default class Category extends Component {
  formRef = React.createRef();
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
      this.formRef.current.resetFields()
      this.setState({showStatus:0})
      this.formRef.current.resetFields()
    }


  
    handleOk=async()=>{
      const results=this.formRef.current.getFieldsValue()
      console.log(results)
      this.formRef.current.resetFields()
      await reqAddCategory(results.custom,results.parentId)
      
       
        if(results.parentId===this.state.parentId) {
         
          this.getCategorys()
        } else if (results.parentId==='0'){ 
          this.getCategorys('0')
        }
        this.setState({showStatus:0})
  }

  onFinish=(value)=>{
    console.log(value)
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
                      {this.state.parentId==='0' ? <Button type="primary" style={{marginRight:'20px'}} 
                       onClick={() => this.showSubCategorys(categorys)}>查看子分类</Button> : null}
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
                 </>)} extra={<Button type="primary" onClick={this.addNew} ><PlusCircleOutlined />添加分类</Button>}
                  style={{height:'100%'}}>
                 





       <Table dataSource={this.state.parentId==='0' ? this.state.categorys : this.state.subCategorys}
                    columns={columns} rowKey='_id' pagination={{pageSize:5}} 
                    loading={this.state.loading}/>;



        <Modal title="添加新分类" visible={this.state.showStatus===1} onOk={()=>this.handleOk} 
        onCancel={this.handleCancel}  destroyOnClose={true}>
          <Form ref={this.formRef} name="control-ref" >
            <Form.Item name='parentId' initialValue={this.state.parentId==='0'?'一级分类':this.state.parentName} >
             <Select   >
                           <Option key='0'  value='0'>一级分类</Option>
                           {
                                this.state.categorys.map(c => <Option key={c._id}  value={c.id}>{c.name}</Option>)
                           }
                           
                            </Select>
                           


                        </Form.Item>
                        <Form.Item name='custom'>
                            <Input placeholder="请输入分类名称" />
                        </Form.Item>
            </Form>
                  </Modal>
               </Card>
                    
            </div>
        )
    }
}
