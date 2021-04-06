import React, { Component } from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import ProductHome from './ProductHome'
import Add from './add'
import Detail from './detail'



export default class Product extends Component {
    render() {
        return (
            <Switch>
                <Route path='/product' component={ProductHome} exact/> {/*路径完全匹配*/}
                <Route path='/product/addupdate' component={Add}/>
                <Route path='/product/detail' component={Detail} exact />
                <Redirect to='/product'/>
            </Switch>
        )
    }
}
