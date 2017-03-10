'use strict';

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
var Dimensions = require('Dimensions');
var screenWidth = Dimensions.get('window').width;
let styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#f5f5f5',

  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

});
export { styles as default };
