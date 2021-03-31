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


export const reqUpdateCategory = ({categoryId, categoryName}) => ajax('/manage/category/update', {categoryId, categoryName}, 'POST')




