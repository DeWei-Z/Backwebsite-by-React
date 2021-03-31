import React, { Component } from 'react'
import { reqIP,reqWeather } from '../../ajax'
import './index.less'

export default class Header extends Component {
    state={
        currentTime:``,
        address:'',
        date:'',
        weather:'',
        week:'',
        wind:'',
        air:''
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
                <p>你好，admin，你在{this.state.address}<br/>
                {this.state.weather}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.state.wind}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.state.air}<br/>
                    {this.state.date}&nbsp;&nbsp;{this.state.week}</p>
                <div className="header-bottom-right">
                     <button >退出登录</button><br/>
                     <span>{this.state.currentTime}</span>
            
            
                </div>
            </div>
        )
    }
}
