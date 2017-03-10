import React, {
    Component,
    PropTypes
} from 'react';
import {
  AppRegistry,
  View,
  Text,
  stylesheet,
  Image
} from 'react-native';
import styles from './style/styles.js';


class loadView extends Component {

      constructor(props){
        super(props);
      };
      static propTypes = {
          loadState: PropTypes.oneOf([0,-1,1,-3,-2]).isRequired,
      }

      static get defaultProps() {
          //设置props的默认值
          return {
              loadState: 0,
          }
      }
    render(){
      /***
       * 移除网络状态变化监听
       * @param 0 正在加载
       * @param -1 请求失败（http）
       * @param 1 加载成功
       * @param -2 请求失败（responseData.code ！= 0）服务端
       * @param -3 请求失败（网络不稳定）服务端
       */
        if(this.props.loadState == 0){
          return (
            <View style={styles.container}>
              <View style={styles.loading}>
                <Image style={{width:50,height:50,marginBottom:20}} source={{uri:"LOADING.gif"}}/>
                <Text>加载中</Text>
              </View>
            </View>
          )
        }else if(this.props.loadState == -2){
          return (
            <View style={styles.container}>
              <View style={styles.loading}>
                <Image style={{width:50,height:50,marginBottom:20}} source={require('image!loadFail')}/>
                <Text>加载失败</Text>
              </View>
            </View>
          )
        }else if(this.props.loadState == -3){
          return (
            <View style={styles.container}>
              <View style={styles.loading}>
                <Image style={{width:50,height:50,marginBottom:20}} source={require('image!loadFail')}/>
                <Text>加载失败</Text>
              </View>
            </View>
          )
        }else if(this.props.loadState == -1){
          return (
            <View style={styles.container}>
              <View style={styles.loading}>
                <Image style={{width:50,height:50,marginBottom:20}} source={require('image!loadFail')}/>
                <Text>加载失败</Text>
              </View>
            </View>
          )
        }

    }
}

export {loadView as default}
