import React from 'react';
import { View, Text, TextInput, Icon, Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Home from './Components/Home';
import Login from './Components/Login';

const AppNavigator = createStackNavigator(
  {
    HomeScreen: {
      screen: Home, navigationOptions: {
       
      }
    },
    LoginScreen: {
      screen: Login, navigationOptions: {
        title: 'Welcome to Naive'
      }
    },
  },
  {
    initialRouteName: 'LoginScreen',
  }
);

export default createAppContainer(AppNavigator);