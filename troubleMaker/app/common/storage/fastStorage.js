/**
 * Created by lucifer on 2016/02/10.
 *
 *  本地持久化数据
 */
 import React, {
    AsyncStorage
}from 'react-native';
import Storage from './storage.js';
class fastStorage{
  //获取本地token,伴有token的回调
  static getToken(callback) {
    Storage.get("token").then((value) => {
      callback(value)
    });
  }
  //设置本地token
  static setToken(token) {
      if(this.getToken() != null){
        Storage.update("token",{"token":token})
      }else {
        Storage.save("token",{"token":token})
      }
  }


}

export default fastStorage
