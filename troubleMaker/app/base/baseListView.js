/**
 * Created by lucifer on 2016/02/10.
 *
 *  listview基类，以下所有view里的List全部以此文件为基类
 *  一般一个列表类的页面只会请求一个api，这类页面使用本页面为基类
 */

import React, {
    Component ,
    PropTypes
} from 'react';
import {
  Text,
  View,
  Image,
  ListView,
  ActivityIndicator,
  TouchableOpacity,
  ProgressViewIOS,
  RefreshControl,
  LayoutAnimation,
  NativeModules,
  AsyncStorage,
} from 'react-native';
import BaseView from './baseView.js';
import ApiWorker from '../api/modules/user_apiWorker.js';
import baseStyles from './style/baseStyles.js';

class baseListView extends BaseView {

      constructor(props){
        super(props);
        this.state = {
          listData:[],
          //是否正在下拉刷新中
          isRefreshing:false,
        }
        this.dataSource = new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2
        });
      };

      getData(){
        super.getData();
        //把this传递进闭包类，否则无法识别this
        ApiWorker.GET_TASK_LIST(function(stateCode){
          //将此状态设置在需要结束请求状态的api里
          this.setState({
            loadStateCode:stateCode
          });
        }.bind(this),function(data){
          this.setState({
            listData: [...this.state.listData, ...data],
          });
        }.bind(this),function(code,error_description){

        }.bind(this),'?index='+this.props.pageIndex+'&size='+this.props.pageSize)
      }
      static propTypes = {
          url: PropTypes.string.isRequired,
          pageSize: PropTypes.number.isRequired
      }

      static get defaultProps() {
          //设置props的默认值
          return {
              url:"",
              pageIndex: 1,
              pageSize: 10
          }
      }
      //list头部view
      renderCell(item, sectionID, rowID, highlightRow) {
        return (
          <View style={{backgroundColor:"#f5f5f5"}}>

            <Text>sdsds</Text>
            <Text>sdsds</Text>
            <Text>sdsds</Text>
            <Text>sdsds</Text>
            <Text>sdsds</Text>
            <Text>sdsds</Text>
            <Text>sdsds</Text>
            <Text>sdsds</Text>
            <Text>sdsds</Text>
            <Text>sdsds</Text>
            <Text>sdsds</Text>
            <Text>sdsds</Text>
            <Text>sdsds</Text>
            <Text>sdsds</Text>
            <Text>sdsds</Text>
          </View>

        );
      }

      // static propTypes = {
      //     name: PropTypes.string.isRequired,
      //     age: PropTypes.number.isRequired
      // }

      // static get defaultProps() {
      //     //设置props的默认值
      //     return {
      //         name: "郭宪龙",
      //         age: 60
      //     }
      // }
    // 触发下拉刷新
    onRefresh(){
      this.setState({
        isRefreshing: true,
      });
      this.getData()

    }
    //list底部view
    renderFooter() {
        return (
          <View
            style={{
              marginVertical: 20,
              paddingBottom: 50,
              alignSelf: 'center'
            }}
          >
            <Text
              style={{
                color: 'rgba(0, 0, 0, 0.2)'
              }}
            >—— 小布也是有底线的 ——</Text>
          </View>
        );
    }
    onEndReached() {
      this.getData()
    }
    setUI(){
        return (
          <View style={baseStyles.container}>
            <ListView
              renderFooter={this.renderFooter.bind(this)}
              // renderHeader={this.renderHeader.bind(this)}
              pageSize={10}
              onEndReached={this.onEndReached.bind(this)}
              initialListSize={10}
              dataSource={this.dataSource.cloneWithRows(this.state.listData)}
              renderRow={this.renderCell.bind(this)}
              enableEmptySections = {true}
              removeClippedSubviews={false}
              onEndReachedThreshold={-30}
              showsHorizontalScrollIndicator ={false}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.isRefreshing}
                  onRefresh={this.onRefresh.bind(this)}
                  tintColor="#fcd953"
                  title="—— 让我偷偷看你 ——"
                  colors={['#cccccc', '#fcd953', '#fcd953']}
                  progressBackgroundColor="#fcd953"
                />
              }
            />
          </View>
        )
    }
}

export {baseListView as default}
