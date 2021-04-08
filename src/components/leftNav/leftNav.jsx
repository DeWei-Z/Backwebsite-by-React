import React, { Component } from 'react'
import { Menu } from 'antd';
import {
  AppstoreOutlined,
  MacCommandOutlined,
  DesktopOutlined,
  ContainerOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import './header.less'
import { Link,withRouter } from 'react-router-dom';

const { SubMenu } = Menu;
 class LeftNav extends Component {


    render() {

      let path = this.props.location.pathname
      if(path.indexOf('/product')===0){
        path='/product'
      }

        return (
            <div>
                <header className='leftNav-header'></header>
                <Menu
          selectedKeys={[path]}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          
        >
          <Menu.Item key="/home" icon={<HomeOutlined />}>
            <Link to='/home'>首页</Link>
          </Menu.Item>
          
          <SubMenu key="sub1" icon={<MacCommandOutlined />} title="商品">
            <Menu.Item key="/category">
                <Link to='/category'>品类管理</Link>
                </Menu.Item>
            <Menu.Item key="/product">
                <Link to='/product'>商品管理</Link>
                </Menu.Item>
            
          </SubMenu>
          <Menu.Item key="/user" icon={<DesktopOutlined />}>
           <Link to='/user'>用户管理</Link> 
          </Menu.Item>
          <Menu.Item key="/role" icon={<ContainerOutlined />}>
           <Link to='/role'>角色管理</Link>
          </Menu.Item>
          <SubMenu key="sub2" icon={<AppstoreOutlined />} title="图形图表">
            <Menu.Item key="/charts/bar">
              <Link to='/charts/bar'>柱形图</Link>
              </Menu.Item>
            <Menu.Item key="/charts/line">
              <Link to='/charts/line'>拆线图</Link>
              </Menu.Item>
            <Menu.Item key="/charts/pie">
              <Link to='/charts/pie'>饼图</Link>
              </Menu.Item>
          </SubMenu>
        </Menu>
            </div>
        )
    }
}

export default withRouter(LeftNav)