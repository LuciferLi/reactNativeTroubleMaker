/**
 * Created by lucifer on 2016/02/10.
 *
 *  一些基础工具类，如字符串切割等方法
 */
 /**
  * Created by lucifer on 16/6/3.
  */
  import {
    NativeModules,
  } from 'react-native';
  var ManagerBridger = NativeModules.ManagerBridger;
//统计异常，调原生的友盟统计
  const sendServerError = (url,error) =>{
    var homeError = "url为:"+url+"error为："+error
    ManagerBridger.sendServerError(homeError)
  }

  export default{
      sendServerError
  }
