import React, {
    Component ,
    PropTypes
} from 'react';
import {
  AppRegistry,
  View,
  Text,
  TouchableHighlight
} from 'react-native';
import BaseView from '../../base/baseView.js';
import ApiWorker from '../../api/modules/user_apiWorker.js';
import Toast, {DURATION} from 'react-native-easy-toast';
import styles from '../../components/loadView/style/styles.js';

class test extends BaseView {

      constructor(props){
        super(props);
        this.state = {
          text:"示例参数12312312"
        }
      };
      
      componentDidMount(){
        super.componentDidMount();

      }
      getData(){
        super.getData();
        //把this传递进闭包类，否则无法识别this
        ApiWorker.GET_TASK_LIST(function(stateCode){
          //将此状态设置在需要结束请求状态的api里
          this.setState({
            loadStateCode:stateCode
          });
        }.bind(this),function(data){
          console.log(data);
        }.bind(this),function(code,error_description){
        }.bind(this))
      }

    setUI(){
      super.setUI();
      return (
        <View style={{flex:1}}>
            <TouchableHighlight
                style={{padding: 10}}
                onPress={()=>{
                    this.showToast("我是弹窗",3000)
                }}>
                <Text>Press me</Text>
            </TouchableHighlight>
        </View>
      );
    }
}

export {test as default}
