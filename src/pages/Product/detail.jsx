import React, { Component } from 'react'
import {
    Card,
    List,
    Button
  } from 'antd'
import './detail.less'
import {reqCategory} from '../../ajax/index'

export default class Detail extends Component {

  state = {
    cName1: '',
    cName2: '', 
  }

  async componentDidMount () {

    
    const {pCategoryId, categoryId} = this.props.location.state.product
    if(pCategoryId==='0') { 
      const result = await reqCategory(categoryId)
      const cName1 = result.data.name
      this.setState({cName1})
    } else { 

      const results = await Promise.all([reqCategory(pCategoryId), reqCategory(categoryId)])
      const cName1 = results[0].data.name
      const cName2 = results[1].data.name
      this.setState({
        cName1,
        cName2
      })
    }

  }


    render() {

      const {name, desc, price, detail, imgs} = this.props.location.state.product
      const {cName1, cName2} = this.state
      console.log(detail)

      const title = (
        <>
          <Button type='primary' onClick={()=>{this.props.history.goBack()}} style={{marginRight:'450px'}}>
            返回上一级
          </Button>
  
          <span>商品详情</span>
        </>
      )


        return (
            
                <Card title={title} className='product-detail'>
                  <List.Item>
                    
                      <span className="left">商品名称:</span>
                      <span>{name}</span>
                    </List.Item>

                    <List.Item>
                      <span className="left">商品描述:</span>
                      <span>{desc}</span>
                    </List.Item>

                    <List.Item>
                      <span className="left">商品价格:</span>
                      <span>{price}元</span>
                    </List.Item>

                    <List.Item>
                      <span className="left">所属分类:</span>
                      <span>{cName1} {cName2 ? ' --> '+cName2 : ''}</span>
                    </List.Item>

                    <List.Item>
                      <span className="left">商品图片:</span>
                      <span>
                      {
                        imgs.map(img => (
                          <img
                            key={img}
                            src={'http://localhost:5000/upload/'+img}
                            className="product-img"
                            alt="img"
                          />
                        ))
                      }
                      </span>
                    </List.Item>

                    <List.Item>
                      <span className="left">商品详情:</span>
                      <span dangerouslySetInnerHTML={{__html: detail}}>
                      </span>
                    </List.Item>
          
                  
                </Card>
              )
        
    }
}
