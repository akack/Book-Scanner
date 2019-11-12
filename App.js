import React from 'react';
import { View, Text, TextInput, Icon, Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import BarcodeScanner from './Components/BarcodeScanner';
import * as firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyCoom1l7P-rrOaDbasLqOlH-cBtJ4nRyi0",
  authDomain: "commission-52434.firebaseapp.com",
  databaseURL: "https://commission-52434.firebaseio.com",
  projectId: "commission-52434",
  storageBucket: "commission-52434.appspot.com",
  messagingSenderId: "713183661530",
  appId: "1:713183661530:web:6266422a25b462739b04e3",
  measurementId: "G-RH5VT8Q8LZ"
};
firebase.initializeApp(firebaseConfig);


const AppNavigator = createStackNavigator(
  {
    HomeScreen: {
      screen: Home, navigationOptions: {
        headerTitle: 'Barcode Scanner',
        headerTitleStyle: {
          textAlign: 'center'
        }
      }
    },
    LoginScreen: {
      screen: Login, navigationOptions: {
        header: null,
      }
    },
    RegisterScreen: {
      screen: Register, navigationOptions: {
        title: 'Naive Registration'
      }
    },
    BarcodeScannerScreen: {
      screen: BarcodeScanner, navigationOptions: {
        title: 'Scanner'
      }
    },
  },
  {
    initialRouteName: 'HomeScreen',
  }
);

export default createAppContainer(AppNavigator);