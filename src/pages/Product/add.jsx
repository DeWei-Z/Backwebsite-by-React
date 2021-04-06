import React, { Component } from 'react'
import {
    Card,
    Form,
    Input,
    Cascader,
    Button,
  
    InputNumber,
    
  } from 'antd'
  

export default class Add extends Component {

    state={
        options: [],
    }

    onFinish=(values)=>{
     console.log(values)
    }
    
   

      onChange = (value, selectedOptions) => {
       console.log(value, selectedOptions);
     };




     loadData = selectedOptions => {
         const targetOption = selectedOptions[selectedOptions.length - 1];
         targetOption.loading = true;
     
           targetOption.loading = false;
           targetOption.children = [
             {
               label: `${targetOption.label} Dynamic 1`,
               value: 'dynamic1',
             },
             {
               label: `${targetOption.label} Dynamic 2`,
               value: 'dynamic2',
             },
           ];
             
       };






    render() {


        const title = (
            <>
              <Button type='primary' onClick={()=>{this.props.history.goBack()}} style={{marginRight:'450px'}}>
                返回上一级
              </Button>
      
              <span>添加商品</span>
            </>
          )


        return (
        <Card title={title}>
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
        
        <Form.Item label="商品名称" name='productName'>
          <Input />
        </Form.Item>
       
        <Form.Item label="商品分类" name='productCategory'>
          <Cascader
            options={this.state.options} loadData={this.loadData} onChange={this.onChange} changeOnSelect/>
        </Form.Item>
       
        <Form.Item label="价格" name='price'>
          <InputNumber />
        </Form.Item>
        <Form.Item  label="商品描述" name='desc'>
             <Input.TextArea />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType="submit"  style={{marginLeft:'550px'}}>确认</Button>
        </Form.Item>
      </Form>
        </Card>
        )
    }
}
