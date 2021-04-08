import React, { Component } from 'react'
import ImgCrop from 'antd-img-crop';
import {Form,Upload,message} from 'antd'
import {reqDeleteImg} from '../../ajax/index'

export default class Picture extends Component {
    
    state={
        fileList:[],
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


      onChange = async ({ file, fileList }) => {
        
    
      
        if(file.status==='done') {
          let result = file.response
          
          if(result.status===0) {
            message.success('上传图片成功!')

            const {name, url} = result.data
            file = fileList[fileList.length-1]
            file.name = name
            file.url = url

          } else {
            message.error('上传图片失败')
          }
        } else if (file.status==='removed') { // 删除图片
          const result = await reqDeleteImg(file.name)
         
          if (result.status===0) {
            message.success('删除图片成功!')
          } else {
            message.error('删除图片失败!')
          }
        }
    
       
        this.setState({ fileList })
      };

      getImgs  = () => {
        return this.state.fileList.map(file => file.name)
      }

      componentDidMount(){

          let fileList=[]
          let  imgs=this.props.imgs
       
        if (imgs && imgs.length>0) {
            console.log('imgs',imgs)
          fileList = imgs.map((img, index) => ({
            uid: -index, // 每个file都有自己唯一的id
            name: img, // 图片文件名
            status: 'done', // 图片状态: done-已上传, uploading: 正在上传中, removed: 已删除
            url: 'http://localhost:5000/upload/'+img
          }))
        }
       this.setState({fileList})
      }

    render() {
        return (
            <Form.Item  label="商品图片" name='pic'>
                <ImgCrop rotate>
              <Upload
                action="/manage/img/upload"
                listType="picture-card"
                accept='image/*'
                name='image'
                fileList={this.state.fileList}
                onChange={this.onChange}
                onPreview={this.onPreview}
              >
                {this.state.fileList.length < 5 && '+ Upload'}
              </Upload>
            </ImgCrop>
           </Form.Item>
        )
    }
}
