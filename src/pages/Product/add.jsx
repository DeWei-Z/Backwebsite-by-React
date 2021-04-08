import React, { Component } from 'react'
import {
    Card,
    Form,
    Input,
    Cascader,
    Button,
    InputNumber,
    message
  } from 'antd'
import {reqCategorys,reqAddOrUpdateProduct} from '../../ajax/index'

import Picture from './picture'

export default class Add extends Component {

    state={
        options: [],
       
       
    }

    onFinish=async(values)=>{
     
      const {name, desc, price, productCategory} = values
      const pCategoryId =productCategory[0]
      const categoryId = productCategory[1]
      const imgs = this.picNode.getImgs()

      const product = {name, desc, price, imgs,pCategoryId,categoryId}

      if(this.props.location.state){
        product._id=this.props.location.state.product._id
      }

      const result = await reqAddOrUpdateProduct(product)

        // 3. 根据结果提示
        if (result.status===0) {
          message.success(`${this.props.location.state ? '更新' : '添加'}商品成功!`)
          this.props.history.goBack()
        } else {
          message.error(`${this.props.location.state ? '更新' : '添加'}商品失败!`)
        }
      }

    
    
   

      onChange = ({ fileList: newFileList }) => {
       this.setState({fileList: newFileList})
     };


     


     loadData =async selectedOptions => {
         const targetOption = selectedOptions[0];
         targetOption.loading = true;
         
         const subCategorys = await this.getCategorys(targetOption.value)
           targetOption.loading = false;

           if (subCategorys && subCategorys.length>0) {
           targetOption.children = subCategorys.map(c => ({
            value: c._id,
            label: c.name,
            isLeaf: true
          }))
        } else { // 当前选中的分类没有二级分类
          targetOption.isLeaf = true
        } 
        this.setState({
          options: [...this.state.options],
        })
       
       };




       getCategorys = async (parentId) => {
        
        const result = await reqCategorys(parentId)   
      
          const categorys = result.data
          
          if (parentId==='0') {
            this.initOptions(categorys)
          } else { 
            return categorys 
          }
        
      }


     


      initOptions = async (categorys) => {
      
        const options = categorys.map(c => ({
          value: c._id,
          label: c.name,
          isLeaf: false, 
        }))
    
       
        if(this.props.location.state){
          const {product}=this.props.location.state 
          const subCategorys = await this.getCategorys(product.pCategoryId)
       
        const childOptions = subCategorys.map(c => ({
          value: c._id,
          label: c.name,
          isLeaf: true
        }))
  
       
        const targetOption = options.find(option => option.value===product.pCategoryId)
  
        targetOption.children = childOptions
       
        }
  
         
  
        this.setState({
          options
        })
      }


       componentDidMount () {
        this.getCategorys('0')
      }


    render() {

         const Product=this.props.location.state||{}
         const product=Product.product ||{}
         
        
        const title = (
            <>
              <Button type='primary' onClick={()=>{this.props.history.goBack()}} style={{marginRight:'450px'}}>
                返回上一级
              </Button>
      
              <span>{this.props.location.state?'更新商品':'添加商品'}</span>
            </>
          )


        return (
        <Card title={title} style={{height:'575px'}}>
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
       
        onFinish={this.onFinish}
      >
        
        <Form.Item label="商品名称" name='productName' initialValue={product.name} >
          <Input />
        </Form.Item>
       
        <Form.Item label="商品分类" name='productCategory' initialValue={[product.pCategoryId,product.categoryId]||[]}  >
          <Cascader
            options={this.state.options} loadData={this.loadData} />
        </Form.Item>
       
        <Form.Item label="价格" name='price' initialValue={product.price}>
          <InputNumber />
        </Form.Item>
        <Form.Item  label="商品描述" name='desc' initialValue={product.desc} >
             <Input.TextArea />
        </Form.Item>
        <Picture  imgs={product.imgs} ref={c=>this.picNode=c} />
        <Form.Item>
              <Button type='primary' htmlType="submit"  style={{marginLeft:'550px'}}>确认</Button>
        </Form.Item>
      </Form>
        </Card>
        )
    }
}
