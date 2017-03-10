/**
 * Created by lucifer on 2016/02/10.
 *
 *  封装网络请求，请求不成功的时候的异常处理
 */

  import BaseNet from '../base/baseNet.js';
  import ApiUrl from '../api/apiUrl.js';
  import LoadView from '../components/loadView/loadView.js';
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
   *列表请求的基类
   * @param NOTIFY_URL 请求的url
   * @param view 网络状态的回调
   * @param successBlock 成功的回调
   * @param successBlock 业务代码失败的回调
   * @param param url后的参数
   *若要在url后添加参数，请重新拼接url，如list分页
   *
   */
   const GET_TASK_LIST = (view,successBlock,failBlock,param) =>{
     BaseNet.apiManager_token(ApiUrl.API_URL.recommendTasks+param,function(state){
       //当前加载状态，
       var loadView = (<LoadView loadState={state}/>)
       view(loadView,state)
     },function(data){
        successBlock(data)
     },function(code,error_description){
       failBlock(code,error_description)
     })
   }

  export default{
      GET_TASK_LIST
  }
