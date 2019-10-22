import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Container, Header, Content, Tab, Tabs } from 'native-base';
import LoginScreen from './Login';
import RegisterScreen from './Register';

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
           <View>
               <Text>Hone Screen</Text>
           </View>
        );
    }
}
const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10,
        textAlign: 'center'
    }
});