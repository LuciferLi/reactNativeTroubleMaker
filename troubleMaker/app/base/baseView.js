'use strict';

import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform
} from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast';
import LoadView from '../components/loadView/loadView.js';
var Dimensions = require('Dimensions');
var mainwidth = Dimensions.get('window').width;
class baseView extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        //加载状态的code，控制显示是否显示加载视图
        loadStateCode:null,
        //是否是第一次进入此页面，加载api
        isFirstLoad:true
      }
    };
    componentDidMount(){
      this.getData()
    }
    //网络请求
    getData(){

    }
    //设置页面UI
    setUI(){
        return (<View></View>);
    };
    //显示弹窗
    showToast(tips,duration){
      //弹窗时间，默认0.5秒
      var tipsDuration = duration || DURATION.LENGTH_SHORT;
      this.refs.toast.show(tips,tipsDuration);
    }
  render(){
      // {this.state.loadView}
    //加载成功的时候
    if(this.state.loadStateCode == 1){
      this.state.isFirstLoad = false
      return (
        <View style={{flex:1}}>
            {this.setUI()}
            <Toast ref="toast"/>
        </View>
      );
    }else {
      // 当不是第一次加载的时候不显示加载视图
      if(this.state.isFirstLoad == false&&this.state.loadStateCode == 0){
          return (
            <View style={{flex:1}}>
                {this.setUI()}
                <Toast ref="toast"/>
            </View>
          );
      }else {
        return (
          <View style={{flex:1}}>
              <LoadView loadState={this.state.loadStateCode}/>
              <Toast ref="toast"/>
          </View>
        );
      }
    }
  };
}

var styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#cccccc',

  }
});


export {baseView as default}
