import React, { Component } from 'react'
import { Menu } from 'antd';
import {
  
  MacCommandOutlined,
  DesktopOutlined,
  ContainerOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import './header.less'
import { Link,withRouter } from 'react-router-dom';
import memory from '../../memory'

const { SubMenu } = Menu;
 class LeftNav extends Component {


    render() {

      let path = this.props.location.pathname
      if(path.indexOf('/product')===0){
        path='/product'
      }
      const menus=memory.user.role.menus
      console.log(menus.indexOf("0-0"))


        return (
            <div>
                <header className='leftNav-header'></header>
                <Menu
          selectedKeys={[path]}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          style={{height:'100%'}}
        >
          <Menu.Item key="/home" icon={<HomeOutlined />}>
            <Link to='/home'>首页</Link>
          </Menu.Item>

       {menus.indexOf("0-0")!==-1?(
          <SubMenu key="sub1" icon={<MacCommandOutlined />} title="商品">
            {menus.indexOf("/category")!==-1?(
                   <Menu.Item key="/category">
                       <Link to='/category'>品类管理</Link>
                       </Menu.Item>
                       )
                       :null}

            {menus.indexOf("/product")!==-1?(
              <Menu.Item key="/product">
                  <Link to='/product'>商品管理</Link>
                  </Menu.Item>
                  )
                  :null}
            </SubMenu>
       ):null}
         
         {menus.indexOf("/user")!==-1?( 
         <Menu.Item key="/user" icon={<DesktopOutlined />}>
           <Link to='/user'>用户管理</Link> 
          </Menu.Item>):null}
         
          {menus.indexOf("/role")!==-1?( 
           <Menu.Item key="/role" icon={<ContainerOutlined />}>
           <Link to='/role'>角色管理</Link>
          </Menu.Item>):null}

        
          
        </Menu>
            </div>
        )
    }
}

export default withRouter(LeftNav)