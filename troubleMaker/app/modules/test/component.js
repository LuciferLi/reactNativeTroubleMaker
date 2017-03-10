import React, {
    Component ,
    PropTypes
} from 'react';
import {
  AppRegistry,
  View,
  Text
} from 'react-native';


class com extends Component {

      constructor(props){
        super(props);
        this.state = {
          text:"示例参数"
        }
      };

      static propTypes = {
          /*
            可定义PropTypes类型，array，bool，func，number，object，string
          /*
          /*
            限制输入new,photos
            optionalEnum: React.PropTypes.oneOf(['News','Photos']),
          /*
          /*
              指定的多个对象类型中的一个
              optionalUnion: React.PropTypes.oneOfType([
              React.PropTypes.string,
              React.PropTypes.number,
              React.PropTypes.instanceOf(Message)
              ]),
          */
          name: PropTypes.string.isRequired,
          age: PropTypes.number.isRequired
      }

      static get defaultProps() {
          //设置props的默认值
          return {
              name: "郭宪龙",
              age: 60
          }
      }
    render(){
        return (
        <View>
            <Text style={{fontSize: 25}}>姓名,{this.props.name}</Text>
            <Text style={{fontSize: 25}}>年龄,{this.props.age}</Text>
        </View>
        )
    }
}

export {com as default}
