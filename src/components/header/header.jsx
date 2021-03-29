import React, { Component } from 'react'
import { reqIP } from '../../ajax'
import './index.less'

export default class Header extends Component {

   
    getIP = async () => {
        // 调用接口请求异步获取数据
        const {address,point} = await reqIP('北京')
        // 更新状态
       console.log(address,point)
      }
   
      componentDidMount () {
       this.getIP()
      }

    render() {
        return (
            <div className='header'>
                你好，admin，今天是2021年3月29日
            </div>
        )
    }
}
