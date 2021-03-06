import React, { Fragment } from "react";
import { StyleSheet, Image, Text, View, TouchableOpacity, TextInput, AsyncStorage } from "react-native";
import {
    Icon,
    Button,
    Textarea
} from "native-base";
import { SearchBar } from "react-native-elements";

export default class RequestEdit extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: <Text style={{
            alignSelf: 'center',
            fontSize: 18,
            justifyContent: 'center',
            flex: 1,
            alignItems: 'center',
            flexDirection: 'column',
            textAlign: 'center',
            fontWeight: 'bold'
        }}>
            Log A Fault
        </Text>,
        headerRight: (
            <TouchableOpacity style={{ paddingRight: 15, color: 'red' }}
                onPress={() => {
                    Alert.alert(
                        'Logout Alert',
                        'Are you sure you want to logout?',
                        [
                            {
                                text: 'Ok', onPress: () => {
                                    navigation.navigate('LoginScreen')
                                }
                            },
                            { text: 'Cancel', onPress: () => console.log('Canceled') }

                        ],
                        { cancelable: false }
                    )
                }}>
                <Icon name='lock' />
            </TouchableOpacity>
        ),
        headerLeft: (
            <TouchableOpacity style={{ paddingLeft: 15, color: 'red' }}
                onPress={() => {
                    navigation.navigate('HomeScreen');
                }}>
                <Icon name='home' />
            </TouchableOpacity>
        )
    })
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            text: ''
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Button large full block info style={styles.rgb} onPress={() => {
                    this.props.navigation.navigate('BarcodeScannerScreen');
                }}>
                    <Icon name='barcode' /><Text style={styles.titleText}>Scan Book</Text>
                </Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%', height: '100%',
        flexDirection: 'column',
        alignContent: 'stretch',
        padding: 5
    },
    grid: {
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        flexDirection: 'row',
        paddingHorizontal: 5,

        alignContent: 'stretch',
        textAlign: 'center',
    },
    btn: {
        width: '49%',
        margin: 1,
        justifyContent: 'center',
        flexDirection: 'column',
        alignContent: 'stretch',
        height: 110
    },
    titleText: {
        fontSize: 12
    },
    rgb: {
        backgroundColor: 'rgba(65, 200, 243, 0.85)'
    },
});
