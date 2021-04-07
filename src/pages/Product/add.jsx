import React, { Component } from 'react'
import {
    Card,
    Form,
    Input,
    Cascader,
    Button,
    InputNumber,
    Upload
  } from 'antd'
import {reqCategorys} from '../../ajax/index'
import ImgCrop from 'antd-img-crop';

export default class Add extends Component {

    state={
        options: [],
        fileList:[{
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },],
        loading:false
    }

    onFinish=(values)=>{
     
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


      onPreview = async file => {
        let src = file.url;
        if (!src) {
          src = await new Promise(resolve => {
            const reader = new FileReader();
            reader.readAsDataURL(file.originFileObj);
            reader.onload = () => resolve(reader.result);
          });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow.document.write(image.outerHTML);
      };


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
      
              <span>添加商品</span>
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
        <Form.Item  label="商品图片" name='pic'>
                <ImgCrop rotate>
              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={this.state.fileList}
                onChange={this.onChange}
                onPreview={this.onPreview}
              >
                {this.state.fileList.length < 5 && '+ Upload'}
              </Upload>
            </ImgCrop>
    </Form.Item>

    <Form.Item>
          <Button type='primary' htmlType="submit"  style={{marginLeft:'550px'}}>确认</Button>
    </Form.Item>
      </Form>
        </Card>
        )
    }
}
