import React, { Component } from 'react'
import { Card,Table,Button } from 'antd';
import { reqCategorys} from '../../ajax/index'


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
            console.log('parentName', this.state.parentName) 
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

    componentDidMount(){
        this.getCategorys()
        
    }


    render() {

       
          
          const columns = [
            {
              title: '商品分类',
              dataIndex: 'name',
              key: 'name',
              width:1000,
              
            },
           
            {
                title: '',
                dataIndex: '',
                key: 'x',
                render: (categorys) => ( 
                    <>
                      <Button onClick={() => this.showUpdate(categorys)}  style={{marginRight:'20px'}} type="primary" >修改分类</Button>
                     
                      {this.state.parentId==='0' ? <Button type="primary" onClick={() => this.showSubCategorys(categorys)}>查看子分类</Button> : null}
                   </>)
              },
          ];

        return (
            <div style={{height:'100%'}}>
               <Card title={this.state.parentId==='0'?'品类管理':(
                   <>
               <Button onClick={this.showCategorys} style={{marginRight:400}} type="primary">返回上一级</Button>
                {this.state.parentName}
                 </>)} extra={<button>添加分类</button>} style={{height:'100%'}}>
                 
               <Table dataSource={this.state.parentId==='0' ? this.state.categorys : this.state.subCategorys}
                    columns={columns} rowKey='_id' pagination={{pageSize:5}} 
                    loading={this.state.loading}/>;
               </Card>
                    
            </div>
        )
    }
}
