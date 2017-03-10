'use strict';

import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
  ScrollView,
  NativeModules

} from 'react-native';

import Swiper from 'react-native-swiper';

var imgPath = ""

//Dimentsions
var Dimensions = require('Dimensions');
var screenWidth = Dimensions.get('window').width;
var bannersScrollHtml = [];
var bannersPageController = [];

var scale = 2/3

var banner_Img_max_W = screenWidth
var banner_Img_max_H = screenWidth/2


var ManagerBridger = NativeModules.ManagerBridger

class Header extends React.Component{
    constructor(props){
      super(props);
    };

   // 跳转到 详情页

   maseggeJump(obj){
     console.log('obj.typeof', obj);
       ManagerBridger.maseggeJump(obj)

   };
   //点击跳转邀请好友
   getNewFriend(){
    ManagerBridger.getNewFriend("getNewFriend")
   };
   //新手引导
   firstStudy(){
    ManagerBridger.firstStudy("firstStudy")
   };
   //帮助
   toHelp(){
    ManagerBridger.toHelp("toHelp")
   };
   taskList(){
     ManagerBridger.taskList("sdsd")
   }

  render(){
    var banners = this.props.banners;
    var bannersHtml = banners.map((banner, i)=>{
         var index = i; // 从banner的第二个元素开始获取 1 开始
         var bannerObj = JSON.stringify(banner);
          let img = banner.photo
          var imgStr = img == "" ? " " : img;
        return (
          <TouchableOpacity  activeOpacity={1} key={i}   onPress={() => this.maseggeJump(bannerObj)} >
              <Image  style={[styles.tip_img]}  key={i}   source={{uri: imgStr}} />
            </TouchableOpacity>
          );
    });

    var tips = this.props.tips;
    var tipsHtml = tips.map((tips, i)=>{
         var index = i; // 从banner的第二个元素开始获取 1 开始
        return (//
              <View style={{height:49,flexDirection:'row'}}  key={i}>
                  <Text style= {styles.tipsView_text}>{tips}</Text>
              </View>
          );
    });


    return (

      <View style={styles.header}>
          <Swiper style={styles.wrapper} height={banner_Img_max_H}
            dot={<View style={[{backgroundColor: 'rgba(255,255,255,0.4)'}, styles.dot]} />}
            activeDot={<View style={[{backgroundColor: 'white'}, styles.dot]} />}
            paginationStyle={{
              bottom: 15
            }}
            >
            {bannersHtml}
         </Swiper>
         <View style={{backgroundColor:'rgba(0,0,0,0.1)',width:screenWidth,height:0.5}}></View>
         <View style={styles.tipsView}>
               <Image style={styles.tipsView_icon} source={require('image!home_tipsView')}/>
               <View style={styles.tipsView_li}></View>
               <Swiper height={49} horizontal={false} autoplay={true} autoplayTimeout={2} autoplayDirection={false} scrollEnabled={false}>
                  {tipsHtml}
                </Swiper>
        </View>
        <View style={{backgroundColor:'rgba(0,0,0,0.1)',width:screenWidth,height:0.5}}></View>
        <View style={styles.tagView}>

            <Image style={styles.tagView_back} source={require('image!home_tag_img')}>
            <TouchableOpacity  activeOpacity={1} style={styles.tagView_left}   onPress={() => this.getNewFriend()} >
                <View></View>
            </TouchableOpacity>

                 <View style={styles.tagView_right}>
                 <TouchableOpacity  activeOpacity={1} style={styles.tagView_right_top}   onPress={() => this.firstStudy()} >
                     <View ></View>
                 </TouchableOpacity>
                 <TouchableOpacity  activeOpacity={1} style={styles.tagView_right_bottom}   onPress={() => this.toHelp()} >
                     <View ></View>
                 </TouchableOpacity>

                 </View>

            </Image>

        </View>
        <View style={{backgroundColor:'rgba(0,0,0,0.1)',width:screenWidth,height:0.5}}></View>


       <View style={styles.section_head}>
          <View style={{backgroundColor:'rgba(0,0,0,0.1)',width:screenWidth,height:0.5}}></View>
          <View style={{flexDirection:'row',width: screenWidth,height: 45,}}>
                <Image style={styles.section_head_icon} source={require('image!home_hot')}/>
                <Text style= {styles.section_head_text}>
                 推荐任务
                </Text>
                  <TouchableOpacity style= {styles.section_head_more} onPress={() => this.taskList()} >
                    <Text style= {styles.section_head_more_text}>
                     查看更多
                    </Text>
                  </TouchableOpacity>
                    <Image style={styles.section_head_more_icon} source={require('image!home_right')}/>
            </View>
          </View>
          <View style={{backgroundColor:'rgba(0,0,0,0.1)',width:screenWidth,height:0.5}}></View>
      </View>
    );
  };
}

var styles = StyleSheet.create({
    header:{
      width: screenWidth,
      // height: 432,
      backgroundColor:'#f5f5f5',
    },

    dot: {
       width: 6,
       height: 6,
       borderRadius: 3,
       marginLeft: 3,
       marginRight: 3,
    },

    dotActivity: {
      backgroundColor: 'black',
    },

    dotNormal: {
      backgroundColor: '#ccc'
    },
    slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',

  },

  // 跑马灯样式
  tipsView:{
    flexDirection:'row',
    width: screenWidth,
    height: 49,
    backgroundColor:'#ffffff',

  },
  tipsView_li:{
    width: 6,
    height: 6,
    borderRadius: 3,
    marginLeft: 10,
    backgroundColor:'#FCD953',
    alignSelf:'center'
  },
  tipsView_icon:{
    marginLeft:10,
    width:44,
    height:29,
    alignSelf:'center'
  },
  tipsView_text:{
    marginLeft:5,
    alignSelf:'center',
    marginRight:80,
    fontSize:14,
    color: '#333',
  },
  //tab
  tagView:{
    width: screenWidth,
    height: screenWidth/2.6+1,
    flexDirection:'row',
    backgroundColor:'white',
  },
  tagView_back:{
    width: screenWidth,
    height: screenWidth/2.6,
    resizeMode: 'stretch',
    flexDirection:'row',
  },
  tagView_left:{
    flex:1,
    marginVertical:15,
    marginLeft:10,
  },
  tagView_right:{
    flex:1,

    marginVertical:15,
    marginLeft:10,
    marginRight:10,
    flexDirection:'column'
  },
  tagView_right_top:{
    flex:1,
    marginBottom:10,

  },
  tagView_right_bottom:{
    flex:1,


  },
  //section
  section_head:{
    width: screenWidth,
    height: 45,

    marginTop:10,
    backgroundColor:'#ffffff',
    flexDirection:'column',

  },
  section_head_icon:{
    width:10,
    height:12,
    marginLeft:10,
    alignSelf:'center'
  },
  section_head_text:{
    marginLeft:5,
    alignSelf:'center',
    fontSize:17,
    color: '#333',
  },
  section_head_more:{
    marginLeft:5,
    alignSelf:'center',
    flex:1,
    flexDirection:'row',
    marginRight:5
  },
  section_head_more_text:{
    textAlign:'right',
    fontSize:15,
    color: '#999999',
    alignSelf:'center',
    flex:1,
  },
  tip_img: {
      width: screenWidth,
      height: screenWidth/2,
      alignSelf: 'center',
      backgroundColor: 'rgba(0,0,0,0.1)',
    },
    section_head_more_icon:{
      width:5,
      height:9,
      marginRight:15,
      alignSelf:'center'
    }



});


export {Header as default}
