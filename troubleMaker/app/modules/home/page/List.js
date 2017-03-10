/**
 * React Native Course by licifer
 */
'use strict';

import React, { Component } from 'react';
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
  NetInfo
} from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
import Swiper from 'react-native-swiper';
import Animatable from 'react-native-animatable';
import styles from '../static/style/Main';
import Header from '../components/Header';
import Helper from '../../../common/tool.js';

var Dimensions = require('Dimensions');
var screenWidth = Dimensions.get('window').width;
var ManagerBridger = NativeModules.ManagerBridger;
var accese_token = ""
class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //任务列表
      taskListArray: [],
      loaded: false,
      firstLoadedFial:false,
      index:0,
      size:10,
      reloadPage:true,
      notifys:[],
      banners:[],
      times:[],
      isRefreshing: false,
      top: 30,
      right: 10,
      navWidth:26,
      navHeight:26,
      navTop:30,
      navRight:10,
      navOpacity:0.0,
      btn_Opacity:0.0,
      loadMoreOver:false,
      access_token:"",
      isEnd:false
    };

    this.dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    });
    // this.REQUEST_URL = 'http://192.168.65.121:8082/v1/task/recommendTasks'
    // this.REQUEST_URL = 'http://qa.capi.mengbuy.com/v1/task/recommendTasks'
    // this.NOTIFY_URL = 'http://qa.capi.mengbuy.com/v1/homepage/getNotify'
    // this.BANNER_URL = 'http://qa.capi.mengbuy.com/v1/home_banner/home_banners'


  }
  componentDidMount(){
    ManagerBridger.getHost("", (host)=>{
     this.REQUEST_URL = host+"/v1/task/recommendTasks"
     this.NOTIFY_URL = host+"/v1/homepage/getNotify"
     this.BANNER_URL = host+"/v1/home_banner/home_banners"
     ManagerBridger.getToken("", (token)=>{
          this.bannerData(token);
         this.notifyData(token)
         this.fetchData(token);
         accese_token = token

   })
   })
  }

  requestURL(
    url = this.REQUEST_URL,

  ) {
    return (
      `${url}?index=${this.state.index+1}&size=${this.state.size}`
    );
  }
  //第一次网络加载失败点击页面重新加载
  reload(){
    this.setState({
      firstLoadedFial: false,
      loaded:false
    });
    this.onRefresh()
  }
  //下拉刷新
  onRefresh(){
    this.setState({
      isRefreshing: true,
      index:0,
      reloadPage:true,
      times:[],
      isEnd:false
    });

       ManagerBridger.getToken("", (token)=>{
          this.bannerData(token);
           this.notifyData(token)
           this.fetchData(token);

     })

  }
  //banner数据
  bannerData(token) {
    fetch(this.BANNER_URL,{
      method: "GET",
      headers: {
        "Authorization": "Bearer "+ token
      },
    }).then(response =>{
      if(response.status == 200){
        response.json().then(responseData => {
            if(responseData.code == 0){
              if(responseData.data == null){
                this.setState({
                  banners: [],
                });
              }else {
                this.setState({
                  banners: responseData.data,
                });
              }
          }else {
            this.setState({
              loaded:false,
              firstLoadedFial: true,
            });
          }
          })
      }else if(response.status == 401||response.status == 400){
        this.setState({
          loaded:false,
          firstLoadedFial: true,
        });
        ManagerBridger.authError("搜索")
      }
    }).catch((error) => {
        this.setState({
          loaded:false,
          firstLoadedFial: true,
        });
      })
      .done();
  }

  //跑马灯数据
  notifyData(token) {
    fetch(this.NOTIFY_URL)
      .then(response => response.json())
      .then(responseData => {
        if(responseData.code == 0){
          if(responseData.data == null){
            this.setState({
              notifys: [],
            });
          }else {
            this.setState({
              notifys: responseData.data,
            });
          }
        }else {
          this.setState({
            loaded:false,
            firstLoadedFial: true,
          });
        }

      }).catch((error) => {
        this.setState({
          loaded:false,
          firstLoadedFial: true,
        });
      })
      .done();
  }
  //任务列表数据
  fetchData(token) {
    this.state.index = 0
    fetch(this.requestURL(),{
      method: "GET",
      headers: {
        "Authorization": "Bearer "+ token
      },
    }).then(response => response.json())
      .then(responseData => {
        if(responseData.code != null&&responseData.code == 0){
          console.log('————————————————————————首页加载', this.requestURL());
          this.setState({
            taskListArray: [],
          });
          if(responseData.data == null){
            this.setState({
              taskListArray: [],
              loaded:true,
              isRefreshing: false,
            });
          }else {
            if(responseData.data.length < this.state.size){
              this.setState({
                taskListArray: responseData.data,
                index:this.state.index+1,
                loaded:true,
                isRefreshing: false,
              });
            }else {
              this.setState({
                taskListArray: responseData.data,
                loaded:true,
                index:this.state.index+1,
                isRefreshing: false,
              });
            }
          }
        }else {
          this.setState({
            loaded:false,
            firstLoadedFial:true,
          });
        }
        this.setState({
          loadMoreOver: true
        });
      }).catch((error) => {
        this.setState({
          loadMoreOver: true,
          loaded:false,
          firstLoadedFial: true,
        });
      })
      .done();


  }
  //点击任务列表详情跳转
  showListDetail(item,sectionID, rowID, highlightRow) {
    let json = '{"commandName":"TaskDetail","title":"标题1","parameters":"{ \\"t\\": 2, \\"p\\": { \\"id\\": \\"'+item.id+'\\" } }"}'
    ManagerBridger.maseggeJump(json)
  }
  //搜索跳转
  search(){
      ManagerBridger.search("搜索")
  }
  //cell渲染
  renderCell(item, sectionID, rowID, highlightRow) {
    var imgHtml = []
    var tabHtml = []
    var deductAmountHtml = []
    var numberSureHtml = []
    var submitHtml = []
    if(item.taskListImage == undefined){
      imgHtml.push(<View key={rowID} style={styles.imageView}>
          <Image style={styles.image} source={require('image!home_defult')}/>
      </View>)
    }else {
      imgHtml.push(
        <View key={rowID} style={styles.imageView}>
            <Image
            source={{uri: item.taskListImage}}
            style={styles.image}
           />
        </View>
        )
    }
    //最高提成
    var deductAmount = ""
    if(item.deductAmount == undefined){
      deductAmount = "0.00";
    }else {
      deductAmount = item.deductAmount;
    }
    //内购价
    var salePrice = ""
    if(item.salePrice == undefined){
      salePrice = "0.00";
    }else {
      salePrice = item.salePrice;
    }
    //原价
    var goodsPrice = ""
    if(item.goodsPrice == undefined){
      goodsPrice = "0.00";
    }else {
      goodsPrice = item.goodsPrice;
    }
    var grabCount = ""
    if(item.grabCount == undefined){
      grabCount = "0";
    }else {
      grabCount = item.grabCount;
    }




    //限量不限量，开始未开始情况
    var startTitle = ""
    var startTime = ""
    var number = ""
    if(item.number > 9999){
      number = Math.floor(item.number/10000 * 100) / 100 +"万"

    }else {
      number = item.number
    }
    if(item.taskState == "UPCOMING"){
      //1.未开始,判断任务类型
      tabHtml.push(<Image key={rowID} style={styles.item_header_type} source={require('image!home_activity_wait')}/>)
      deductAmountHtml.push()
      // this.getDate(item.endRushbuyDate,item.currentSystemDate)
      startTitle = "开始时间"
      startTime = item.startTaskDate
      submitHtml.push(<View key={rowID} style={styles.item_seeGoods_btn}>
        <Text style={styles.item_seeGoods_btn_text}>去看看</Text>
      </View>)
      if(item.grabTaskMax == undefined&&item.grabTaskMin==undefined){
        //不限量
        numberSureHtml.push(
          <View key={rowID} style={styles.itemMeta}>
              <Text style={styles.itemNumber,{width:99}}>
                剩余{number}件
              </Text>
          </View>
        )

      }else {
        //限量
        numberSureHtml.push(
          <View key={rowID} style={styles.itemMeta}>
              <Text style={styles.itemNumber}>
                限{number}
              </Text>
              <ProgressBar  style={styles.itemNumberImg} borderWidth={0} height={6} color={"#FCD953"} progress={item.remainingNumber/item.number}/>
              <Text style={styles.itemJoinNumber}>
                已有{grabCount}人参与
              </Text>
          </View>
        )
      }


    }else if(item.taskState == "UNDERWAY"){
      //2.进行中,判断任务类型
      tabHtml.push(<Image  key={rowID} style={styles.item_header_type} source={require('image!home_activity_online')}/>)
      startTitle = "距离结束"
      startTime = item.endTaskDate
      submitHtml.push(<View key={rowID} style={styles.item_getGoods_btn}>
        <Text style={styles.item_getGoods_btn_text}>马上领</Text>
      </View>)
      if(item.grabTaskMax == undefined&&item.grabTaskMin==undefined){
        //不限量
        numberSureHtml.push(
          <View key={rowID} style={styles.itemMeta}>
              <Text style={styles.itemJoinNumber}>
                已有{grabCount}人参加
              </Text>
          </View>
        )
      }else {
        //限量
        numberSureHtml.push(
          <View key={rowID} style={styles.itemMeta}>
              <Text style={styles.itemNumber}>
                限{number}
              </Text>
                  <ProgressBar  style={styles.itemNumberImg} borderWidth={0} height={6} color={"#FCD953"} progress={item.remainingNumber/item.number}/>
              <Text style={styles.itemJoinNumber}>
                已有{grabCount}人参加
              </Text>
          </View>
        )
      }
    }
    this.state.times[rowID] = Helper.timeToDay(startTime)+"天"+Helper.timeToHours(startTime)+"时"+Helper.timeToMinutes(startTime)+"分"
    // console.log(this.state.times);
    return (
      <TouchableOpacity
      key={rowID}
        underlayColor="rgba(34, 26, 38, 0.1)"
        onPress={() => this.showListDetail(item,sectionID, rowID, highlightRow)}
      >
        <View key={rowID} style={styles.item}>
        <View style={styles.item_header}>
          {tabHtml}
           <Text style={styles.item_header_title}>{startTitle}：<Text style={styles.item_header_time}>{this.state.times[rowID]}</Text></Text>
        </View>
        <View key={rowID} style={styles.item_content}>
            <View style={styles.itemImage}>
              {imgHtml}
            </View>
            <View key={rowID} style={styles.itemContent}>
              <Text style={styles.itemHeader} numberOfLines={1}>{item.taskName}</Text>
              {numberSureHtml}
              <View style={styles.item_price}>
              <Text style={styles.item_price_new_title}>内购价:</Text>
              <Text style={styles.item_price_new_money}>￥</Text>
              <Text style={styles.item_price_new_number}>{salePrice}</Text>
                  <Text style={styles.item_price_old}>
                    ￥{goodsPrice}
                  </Text>
              </View>

              <View style={styles.item_getGoods}>
                  <View style={{flexDirection:'row',alignSelf:'center',marginTop:7}}>
                      <Text style={styles.item_getGoods_title}>最高提</Text>
                      <Text style={styles.item_getGoods_price_money}>￥</Text>
                      <Text style={styles.item_getGoods_price}>{deductAmount}</Text>
                      <Text style={styles.item_getGoods_price_Company}>/件</Text>
                  </View>
                  <View style={{ flex:1,justifyContent:'flex-end',flexDirection:'row',}}>

                    {submitHtml}

                  </View>

              </View>
            </View>
        </View>
        </View>
        </TouchableOpacity>

    );
  }
  //加载更多
  loadMore(token) {

    fetch(this.requestURL(),{
      method: "GET",
      headers: {
        "Authorization": "Bearer "+ token
      },
    }).then(response => response.json())
      .then(responseData => {
        if(responseData.code != null&& responseData.code == 0){
          console.log('————————————————————————加载更多', this.requestURL());
          if(responseData.data == null){
            this.setState({
              isEnd:true,
            });
          }else {
            if(responseData.data.length < this.state.size){
              this.setState({
                isEnd:true,
                index:this.state.index+1,
                taskListArray: [...this.state.taskListArray, ...responseData.data],

              });
            }else {
              this.setState({
                index:this.state.index+1,
                taskListArray: [...this.state.taskListArray, ...responseData.data],

              });
            }
          }

        }else {
          this.setState({
            isRefreshing: false
          })
        }
        this.setState({
          loadMoreOver: true
        });
      }).catch((error) => {
        this.setState({
          loadMoreOver:true,
          isRefreshing: false
        })
      })
      .done();
  }
  //加载更多响应回调
  onEndReached() {
    if(this.state.loaded == true&&this.state.loadMoreOver==true&&this.state.isEnd==false){
      this.setState({loadMoreOver:false})
      if(accese_token != ""){
          this.loadMore(accese_token);
      }else {
        ManagerBridger.getToken("", (token)=>{
          accese_token = token
          this.loadMore(token);
      })
      }
    }
  }


  //list头部view
  renderHeader() {
      return (
        <View>
          <Header banners={this.state.banners} tips={this.state.notifys}/>
        </View>
      );
  }
  //list底部view
  renderFooter() {
    if (this.state.loadMoreOver == false) {
      return (
        <View
          style={{
            marginVertical: 20,
            paddingBottom: 50,
            alignSelf: 'center'
          }}
        >
          <ActivityIndicator />
        </View>
      );
    } else {
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
  }
  //页面list，search布局
  render() {
    if (!this.state.loaded) {
      if(this.state.firstLoadedFial == true){
        return (
          <TouchableOpacity style={styles.container}  activeOpacity={0.5}    onPress={() => this.reload()} >
            <View style={styles.container}>
              <View style={styles.loading}>
                <Image style={{width:50,height:50}} source={require('image!loadFail')}/>
                <Text style={{fontSize:16,color:'#999999',marginTop:20}}>网络遇上风浪，请稍后再试</Text>
                <View style={styles.reload_btn}>
                  <Text style={styles.reload_btn_text}>重新加载</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        );
      }else {
        return (
          <View style={styles.container}>
            <View style={styles.loading}>
              <Image style={{width:50,height:50}} source={{uri:"LOADING.gif"}}/>
            </View>
          </View>
        );
      }

    }else {
      return (
        <View style={styles.container}>
          <ListView
            renderFooter={this.renderFooter.bind(this)}
            renderHeader={this.renderHeader.bind(this)}
            pageSize={10}
            onEndReached={this.onEndReached.bind(this)}
            initialListSize={10}
            dataSource={this.dataSource.cloneWithRows(this.state.taskListArray)}
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
          <View style={{position:'absolute',width:40,height:40,top:30,right:10,flexDirection:'row',}}>
          <TouchableOpacity style={{width:40,height:36,alignSelf:'center',}}  activeOpacity={1}    onPress={() => this.search()} >
                <Image
                style={{width:40,height:40,alignSelf:'center',marginLeft:14}}  ref="search" source={require('image!home_search')}/>
          </TouchableOpacity>

          </View>
          <View>


          </View>

        </View>
      );
    }
  }
}

export { List as default };
