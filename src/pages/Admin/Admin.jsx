import React, { Component } from 'react';
import { Layout } from 'antd';
import {Switch,Route,Redirect} from 'react-router-dom';
import Header from '../../components/header/header';
import LeftNav from '../../components/leftNav/leftNav';
import Home from '../Home/Home';
import Category from '../Category/Category';
import Product from '../Product/Product'
import Role from '../Role/Role'
import User from '../User/User'
import Bar from '../Charts/Bar'
import Line from '../Charts/Line'
import Pie from '../Charts/Pie'

const { Footer, Sider, Content } = Layout;


export default class Admin extends Component {

    


    
            
      


    render() {
        
        return (
           
             <Layout className='Layout'>
               <Sider >
                   <LeftNav></LeftNav>
               </Sider>
               <Layout>
                  <Header ></Header>
                  <Content style={{backgroundColor:'#d9d9d9',margin:20}}>
                   <Switch>
                       
                       
                        <Route path='/home' component={Home}/>
                        <Route path='/category' component={Category}/>
                        <Route path='/product' component={Product}/>
                        <Route path='/user' component={User}/>
                        <Route path='/role' component={Role}/>
                        <Route path="/charts/bar" component={Bar}/>
                        <Route path="/charts/pie" component={Pie}/>
                        <Route path="/charts/line" component={Line}/>
                        <Redirect to='/home' ></Redirect>
                   </Switch>
                  </Content>
                  <Footer className='footer' style={{backgroundColor:'#ffffff'}}>请使用谷歌浏览器</Footer>
               </Layout>
            </Layout>
           
        )
    }
}
