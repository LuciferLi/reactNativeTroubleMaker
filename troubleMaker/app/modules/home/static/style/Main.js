'use strict';

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
var Dimensions = require('Dimensions');
var screenWidth = Dimensions.get('window').width;
let styles = StyleSheet.create({

  search_btn:{
    position:'absolute',
    width:screenWidth,
    height:64,
    top:0,
    left:0,
    backgroundColor:'white'
  },
  search_btn_img:{
    position:'absolute',
    width:26,
    height:26,
  },
  item_header_type:{
    width:56,
    height:26,
    alignSelf:'center',
    resizeMode: 'stretch',
  },
  item_header_title:{
    fontSize:13,
    color:'#666666',
    alignSelf:'center',
    marginLeft:14
  },
  item_header_time:{
    fontSize:12,
    color:'#333',
    alignSelf:'center',
    marginLeft:14
  },
  item_header:{
    height:47,
    flexDirection: 'row',
  },
  item_content:{
    flexDirection: 'row',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    alignItems: 'center',
  },
  overlayHeader: {
    fontSize: 33,
    fontFamily: 'Helvetica Neue',
    fontWeight: '200',
    color: '#eae7ff',
    padding: 10,
  },
  overlaySubHeader: {
    fontSize: 16,
    fontFamily: 'Helvetica Neue',
    fontWeight: '200',
    color: '#eae7ff',
    padding: 10,
    paddingTop: 0,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'stretch',

  },
  image: {
    width: 93*screenWidth/375,
    height: 93*screenWidth/375,
    opacity: 0.8,
    resizeMode: 'stretch',
  },
  imageView:{
    width: 93*screenWidth/375,
    height: 93*screenWidth/375,
    marginLeft:10,
    marginRight:10,
    backgroundColor:'#999999',
    marginBottom:5
  },
  itemText: {
    fontSize: 16,
    fontFamily: 'Helvetica Neue',
    fontWeight: '300',
    color: 'rgba(0, 0, 0, 0.8)',
    lineHeight: 26,
  },
  container: {

    // backgroundColor: '#ffffff',
    flex: 1,
  },
  item_getGoods_title:{
    fontSize:10,
    color:'#FF9900',
    marginRight:3,
    lineHeight:13,
    padding:1,
    textAlign:'center',
    borderColor:'#FF9900',
    borderWidth:1,


  },
  item_getGoods_price:{
    marginTop:2,
    fontSize:16,
    color:'#FF9900',
    lineHeight:16
  },
  item_getGoods_price_money:{
    marginTop:3,
    fontSize:11,
    color:'#FF9900',
  },
  item_getGoods_price_Company:{
    marginTop:3,
    fontSize:11,
    color:'#FF9900',
  },
  item_getGoods_btn:{
    backgroundColor:'#FCD953',
    paddingLeft:12,
    paddingRight:12,
    paddingTop:6,
    paddingBottom:6,

    borderRadius:14,
    alignSelf:'center',
    marginRight:10

  },
  item_seeGoods_btn:{
    paddingLeft:12,
    paddingRight:12,
    paddingTop:6,
    paddingBottom:6,
    borderRadius:14,
    alignSelf:'center',
    marginRight:10,
    borderColor:'#FCD953',
    borderWidth:1,
  },
  item_seeGoods_btn_text:{
    fontSize:15,
    color:'#FCD953',
  },
  item_getGoods_btn_text:{
    fontSize:15,
    backgroundColor:'#FCD953',
    color:'#ffffff',
  },

  reload_btn_text:{
    fontSize:14,
    backgroundColor:'#FCD953',
    color:'#ffffff',

  },
  reload_btn:{
    backgroundColor:'#FCD953',
    paddingLeft:25,
    paddingRight:25,
    paddingTop:15,
    paddingBottom:15,
    marginTop:20,
    borderRadius:21,
    alignSelf:'center',
    marginRight:10
  },
  item_getGoods:{
    marginBottom:5,
    flexDirection:'row',
    flex:1,
    alignItems:'flex-end',
  },
  item_price:{
    flexDirection:'row',

  },
  item_price_new_title:{
    marginTop:5,
    fontSize: 13,
    color: '#333',
    alignSelf:'center',
  },
  item_price_new_money:{
    marginTop:5,
    fontSize: 11,
    color: '#333',
    alignSelf:'center',
  },
  item_price_new_number:{
    marginTop:5,
    fontSize: 14,
    color: '#333',
    alignSelf:'center',
  },
  item_price_old:{
    fontSize: 10,
    color: '#999999',
    alignSelf:'center',
    textDecorationLine:'line-through',
    marginLeft:3,
    marginTop:5
  },
  deleteIcon: {
    width: 20,
    height: 20,
    margin: 10,
    opacity: 0.6,
  },
  searchHeader: {
    color: 'rgba(0, 0, 0, 0.8)',
    fontSize: 18,
    marginTop: 30,
    marginLeft: 10,
  },
  item: {
    flexDirection: 'column',
    borderBottomWidth: 0.5,
    borderColor: 'rgba(100, 53, 201, 0.1)',
    paddingBottom: 6,
    paddingTop: 0,
  },
  itemContent: {
    flex: 1,
    // marginLeft: 10,

  },
  itemHeader: {
    fontSize: 16,
    marginRight:10,
    // fontWeight: '100',
    color: '#333',
    marginBottom:5
  },
  itemMeta:{
    flexDirection:'row',

  },
  itemNumber: {
    fontSize: 12,
    color: '#666666',
    alignSelf:'center',
    width:50/375*screenWidth

  },
  itemNumberImg:{
    width:90*screenWidth/375,
    height:6,
    // borderColor:'#FCD953',
    // backgroundColor:'#FCD953',
    borderRadius: 3,
    alignSelf:'center',
    marginLeft:9,
    backgroundColor:'#eeeeee',
    borderRadius: 3,
    marginRight:10


  },
  progress:{
    height:6,
    width:90*screenWidth/375
    // width:screenWidth-20-20-93-100,
    // borderColor:none,


  },
  itemJoinNumber:{
    alignSelf:'center',
    color:'#666666',
    fontSize:12,
    marginRight:10
  },

});

export { styles as default };
