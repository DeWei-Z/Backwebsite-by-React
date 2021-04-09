import ajax from './ajax'
import jsonp from 'jsonp'
import {message} from 'antd'


export const reqLogin=(username,password)=>ajax('/login',{username,password},'POST')


export const reqIP=(data)=>{

    return new Promise((resolve,reject)=>{
       
        jsonp('http://api.map.baidu.com/location/ip?ak=6113ijdjpa5Guv6yD5uSE1lOT23Sr2pK&coor=bd09ll',
               {}, 
           (err, data) => {
            
         if(data.status===0) {
            
            const {address,point}=data.content
            resolve({address,point})
            
         }else{
            message.error('获取天气信息失败!')
         }           
        })
    })  
}


export const reqWeather=()=>{

    return new Promise((resolve,reject)=>{
       
        jsonp('https://tianqiapi.com/api?version=v6&appid=95472677&appsecret=6UBF3APB',
               {}, 
           (err, data) => {
          
            resolve(data)
        })
    })
}

export const reqCategorys = (parentId) => ajax('/manage/category/list', {parentId})


export const reqAddCategory = (categoryName, parentId) => ajax('/manage/category/add', {categoryName, parentId}, 'POST')


export const reqProducts = (pageNum, pageSize) => ajax('/manage/product/list', {pageNum, pageSize})


export const reqSearchProducts = ({pageNum, pageSize, searchName, searchType}) => ajax('/manage/product/search', {
    pageNum,
    pageSize,
    [searchType]: searchName,
  })



export const reqCategory = (categoryId) => ajax('/manage/category/info', {categoryId})


export const reqUpdateStatus = (productId, status) => ajax('/manage/product/updateStatus', {productId, status}, 'POST')

export const reqDeleteImg = (name) => ajax('/manage/img/delete', {name}, 'POST')

export const reqAddOrUpdateProduct = (product) => ajax('/manage/product/' + ( product._id?'update':'add'), product, 'POST')

export const reqRoles = () => ajax('/manage/role/list')

export const reqAddRole = (roleName) => ajax('/manage/role/add', {roleName}, 'POST')