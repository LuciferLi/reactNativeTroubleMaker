/**
 * Created by lucifer on 2016/02/10.
 *
 *  封装网络请求，请求不成功的时候的异常处理
 *  演示damo
 */

  import BaseNet from '../../base/baseNet.js';
  import ApiUrl from '../../api/apiUrl.js';
  import LoadView from '../../components/loadView/loadView.js';
  import React, {
      Component ,
      PropTypes
  } from 'react';
  import {
    AppRegistry,
    View,
    Text,
    StyleSheet
  } from 'react-native';

  /***
   * 请求任务列表
   * @param NOTIFY_URL 请求的url
   * @param view 网络状态的回调
   * @param successBlock 成功的回调
   * @param successBlock 业务代码失败的回调
   * @param param url后的参数
   *若要在url后添加参数，请重新拼接url，如list分页
   *
   */
   const GET_TASK_LIST = (loadStateBlock,successBlock,failBlock,params = "") =>{
     BaseNet.changeProtocolType("GET","TOKEN").then(function(){
        BaseNet.apiManager(ApiUrl.API_URL.recommendTasks+params,function(state){
          //当前加载状态，
          loadStateBlock(state)
        },function(data){
           successBlock(data)
        },function(code,error_description){
          failBlock(code,error_description)
        })
     })
   }

   const GET_NOTIFY = (loadStateBlock,successBlock,failBlock,body=null) =>{
     BaseNet.changeProtocolType("GET","JSON").then(function(){
        BaseNet.apiManager(ApiUrl.API_URL.getNotify,function(state){
          //当前加载状态，
          loadStateBlock(state)
        },function(data){
          //成功的回调
           successBlock(data)
        },function(code,error_description){
          //失败的回调
          failBlock(code,error_description)
        },function(httpCode){
          //httpcode错误的时候，如401，没有用户权限，需要处理
        },null)
     })
   }




  export default{
      GET_TASK_LIST,
      GET_NOTIFY
  }
