import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { Container, Header, Content, Tab, Tabs } from 'native-base';



export default class RegisterScreen extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>Register Screen</Text>
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