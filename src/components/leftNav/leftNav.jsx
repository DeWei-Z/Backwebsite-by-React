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
import { Link } from 'react-router-dom';

const { SubMenu } = Menu;
export default class leftNav extends Component {


    render() {
        return (
            <div>
                <header className='leftNav-header'></header>
                <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          
        >
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to='/home'>首页</Link>
          </Menu.Item>
          
          <SubMenu key="sub1" icon={<MacCommandOutlined />} title="商品">
            <Menu.Item key="5">
                <Link to='/category'>品类管理</Link>
                </Menu.Item>
            <Menu.Item key="6">
                <Link to='/product'>商品管理</Link>
                </Menu.Item>
            
          </SubMenu>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
           <Link to='/user'>用户管理</Link> 
          </Menu.Item>
          <Menu.Item key="3" icon={<ContainerOutlined />}>
           <Link to='/role'>角色管理</Link>
          </Menu.Item>
          <SubMenu key="sub2" icon={<AppstoreOutlined />} title="图形图表">
            <Menu.Item key="9">
              <Link to='/charts/bar'>柱形图</Link>
              </Menu.Item>
            <Menu.Item key="10">
              <Link to='/charts/line'>拆线图</Link>
              </Menu.Item>
            <Menu.Item key="11">
              <Link to='/charts/pie'>饼图</Link>
              </Menu.Item>
          </SubMenu>
        </Menu>
            </div>
        )
    }
}
