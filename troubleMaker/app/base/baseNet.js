/**
 * Created by lucifer on 2016/02/10.
 *
 *  fetch请求的，基础网络请求的封装，catch出的异常进行捕获处理
 */
 import {
   NativeModules,
 } from 'react-native';
 import Storage from '../common/storage/storage.js';
 import FastStorage from '../common/storage/fastStorage.js';
 import BaseNet from './baseNet.js';
 var ManagerBridger = NativeModules.ManagerBridger;
 //网络状态的枚举
 const LOAD_STATE={
   //加载中
   LOADING:{
     code:0,
     description:""
   },
   //请求失败
   LOAD_HTTP_FAIL:{
     code:-2,
     description:"http请求失败httpStatus="
   },
   //网络遇上问题，网路信号不行，如手机调成飞行模式，2G信号不稳定
   LOAD_CATCH_FAIL:{
     code:-3,
     description:"网络不稳定error="
   },
   //服务端异常，如账号不存在，status是200但是code ！= 0
   LOAD_SERVER_FAIL:{
     code:-1,
     description:"服务端status=200，code="
   },
   //请求成功,code = 0,status = 200
   LOAD_SUCCESS:{
     code:1,
     description:"ok，请求成功"
   }

 }
 /***
  * @param requestMethod:请求方式
  */
 const requestMethodEnum = {
    GET:"GET",
    POST:"POST",
 }
 const requestMethod = null
 /***
  * 移除网络状态变化监听
  * 业务中需要用到的请求头，如，带token的
  * 其他需要带把参数带到请求头的，自己写json
  */
 const requestHeaderEnum = {

   //带token的GET请求头
   JSON:{
     "Content-Type": "application/x-www-form-urlencoded"
   },
   TOKEN:{
      "Authorization": ""
   }

 }
 const requestHeader = null;
 /***
  * 定义请求头类型
  * @param method 请求的类型
  * @param HTTPHeader 请求头设置
  */
 changeProtocolType = (method,HTTPHeader) => {
   return new Promise(function(onCompleted, onRejected) {
     if(HTTPHeader == "JSON"){
        requestHeader = requestHeaderEnum["JSON"]
        onCompleted()
     }else if(HTTPHeader == "TOKEN"){
       ManagerBridger.getToken("", (token)=>{
         requestHeaderEnum["TOKEN"]["Authorization"] = "Bearer "+token
         requestHeader = requestHeaderEnum["TOKEN"]
        onCompleted()
       })
     };
   });
 }

 /***
  * 需要带token的网络请求
  * 移除网络状态变化监听
  * @param NOTIFY_URL 请求的url
  * @param loadStateBlock 网络状态的回调
  * @param successBlock 成功的回调
  * @param failBlock 业务代码失败的回调,只处理responseData.code = 200但是code ！= 0时候的异常
  * @param requestBody 请求体中带的参数
  */
const apiManager = (URL,loadStateBlock,successBlock,failBlock,codeErrorBlock,requestBody=null) =>{
  //开始请求,加载状态
  loadStateBlock(LOAD_STATE.LOADING.code)
  fetch(URL,{
        method: requestMethod,
        headers:requestHeader,
        body: requestBody
    }).then(response => {
      if(response.status == 200){
        response.json().then(responseData => {
          if(responseData.code == 0){
            //请求成功，改变网络状态
            console.log("======="+URL+"======="+LOAD_STATE.LOAD_SUCCESS.description);
            loadStateBlock(LOAD_STATE.LOAD_SUCCESS.code)
            //当responseData.code == 0的时候请求成功
            if(responseData.data == null){
              //当data为空的时候
              successBlock([])
            }else {
              successBlock(responseData.data)
            }
          }else {
            console.log("======="+URL+"======="+LOAD_STATE.LOAD_SERVER_FAIL.description+responseData.code);
            //当responseData.code != 0并不是网络异常，只是业务请求失败,
            //请求成功，改变网络状态
            loadStateBlock(LOAD_STATE.LOAD_SERVER_FAIL.code)
            failBlock(responseData.code,responseData.errorDescription)
          }
        })
      }else {
        codeErrorBlock(response.status)
        //code != 200的时候
        console.log("======="+URL+"======="+LOAD_STATE.LOAD_HTTP_FAIL.description+response.status);
        loadStateBlock(LOAD_STATE.LOAD_HTTP_FAIL.code)
      }

    }).catch((error) => {
      //网络异常的处理,返回的code=-1的时候是网络异常
      console.log("======="+URL+"======="+LOAD_STATE.LOAD_CATCH_FAIL.description+error);
      loadStateBlock(LOAD_STATE.LOAD_CATCH_FAIL.code)
    })
    .done();
}

 export default{
     apiManager,
     changeProtocolType,
 }
