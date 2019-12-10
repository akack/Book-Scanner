import * as React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Alert,
    ImageBackground,
    TouchableOpacity
} from 'react-native';
import {
    Icon,
    Button,
} from "native-base";

export default class HomeScreen extends React.Component {
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
            Home Screen
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
                    console.log('Profile link')
                }}>
                <Icon name='person' />
            </TouchableOpacity>
        )
    })
    constructor(props) {
        super(props);
    }
    goToScan = () => {
        this.props.navigation.navigate('BarcodeScannerScreen');
    }
    render() {
        return (
            <ImageBackground source={require('../assets/imgs/bg2.jpg')} style={{
                width: '100%', height: '100%', justifyContent: 'center',
                flexDirection: 'column',
                alignContent: 'stretch'
            }}>
                <View style={styles.container}>
                    <Button large full block info style={[styles.btn, styles.rgb]} onPress={() => { 
                        this.props.navigation.navigate('AllocateBookScreen');
                    }}>
                        <Icon name='attach' /><Text style={styles.titleText}>Allocate Book</Text>
                    </Button>
                    <Button large full block success style={styles.btn}>
                        <Icon name='folder' /><Text style={styles.titleText}>Query Book</Text>
                    </Button>
                    <Button large full block success style={styles.btn}>
                        <Icon name='book' /><Text style={styles.titleText}>Book Checks</Text>
                    </Button>
                    <Button large full block info style={[styles.btn, styles.rgb]}>
                        <Icon name='paper' /><Text style={styles.titleText}>Log A Fault</Text>
                    </Button>
                    <Button large full block info style={[styles.btn, styles.rgb]}>
                        <Icon name='person' /><Text style={styles.titleText}>Profile</Text>
                    </Button>
                    <Button large full block danger style={styles.btn} onPress={() => {
                        this.props.navigation.navigate('LoginScreen');
                    }}>
                        <Icon name='lock' /><Text style={styles.titleText}>Logout</Text>
                    </Button>
                </View>
            </ImageBackground>

        );
    }
}
const styles = StyleSheet.create({

    container: {
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        flexDirection: 'row',
        paddingHorizontal: 5,
        justifyContent: 'center',
        alignContent: 'stretch',
        textAlign: 'center',
    },
    footerWrapperNC: {
        flexDirection: 'column',
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
    rgb2: {
        backgroundColor: 'rgba(65, 200, 243, 0.85)'
    },
    rgb3: {
        backgroundColor: 'rgba(65, 200, 243, 0.85)'
    },
    rgb4: {
        backgroundColor: 'rgba(65, 200, 243, 0.85)'
    }
});