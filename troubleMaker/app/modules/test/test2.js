import React, {
    Component ,
    PropTypes
} from 'react';
import {
  AppRegistry,
  View,
  Text
} from 'react-native';
import Com from './component.js';


class test2 extends Component {

      constructor(props){
        super(props);
        this.state = {
          text:"示例参数"
        }
      };


    render(){
        return (
        <View>
          <Com name="其实我是科比·布莱恩特" age={33} />
        </View>
        )
    }
}

export {test2 as default}
