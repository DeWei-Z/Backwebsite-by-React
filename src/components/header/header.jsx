import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import { reqIP,reqWeather } from '../../ajax'
import './index.less'
import { Modal,Button} from 'antd'
import memory from '../../memory'

class Header extends Component {
    state={
        currentTime:``,
        address:'',
        date:'',
        weather:'',
        week:'',
        wind:'',
        air:''
    }
   

    logout = () => {
       
        Modal.confirm({
          content: '确定退出吗?',
          onOk: () => {
            memory.user = {}
            localStorage.removeItem('user')
            this.props.history.replace('/login')
          }
        })
      }


    getIP = async () => {
        
        const {address} = await reqIP()
        const data=await reqWeather()
       this.setState({address,date:data.date,weather:data.wea,week:data.week,wind:data.win,air:data.air_level})
      }

      getTime=()=>{
          this.timer=setInterval(()=>{
              const time=new Date()
              const currentTime=`${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
              this.setState({currentTime})
          },1000)
      }
   
      componentDidMount () {
       this.getIP()
       this.getTime()
      }

      componentWillUnmount(){
          clearInterval(this.timer)
      }

    render() {
        return (
            <div className='header'>
                <p>你好，{memory.user.username}，你在{this.state.address}<br/>
                {this.state.weather}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.state.wind}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.state.air}<br/>
                    {this.state.date}&nbsp;&nbsp;{this.state.week}</p>
                <div className="header-bottom-right">
                     <Button  onClick={this.logout} type='primary'>退出登录</Button><br/>
                     <span>{this.state.currentTime}</span>
            
            
                </div>
            </div>
        )
    }
}

export default withRouter(Header)