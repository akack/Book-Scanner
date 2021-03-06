import React, { Fragment } from "react";
import { StyleSheet, Image, Text, View, TouchableOpacity, TextInput, AsyncStorage } from "react-native";
import {
    Icon,
    Button,
    Textarea
} from "native-base";
import { SearchBar } from "react-native-elements";

export default class AllocateBook extends React.Component {
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
            Allocate Book
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
                {/* <Text style={{ marginVertical: 3 }}>Book Details</Text>
                <Textarea
                    numberOfLines={10}
                    multiline={true}
                    placeholder="Book Details"
                    style={{
                        height: 200,
                        borderColor: 'lightgrey',
                        borderWidth: 1,
                        marginTop: 3,   
                        padding: 8
                    }}
                    onChangeText={text => this.setState({ text })}
                    value={this.state.text}
                />
                <SearchBar
                    searchIcon={{ size: 24 }}
                    onChangeText={text => this.SearchFilterFunction(text)}
                    onClear={text => this.SearchFilterFunction('')}
                    placeholder="Search student name..."
                    value={this.state.search}
                    containerStyle={{
                        backgroundColor: '#ffffff',
                        borderColor: '#ffffff',
                        borderStyle: 'solid',
                        borderWidth: .5,
                        borderBottomWidth: .5,
                        borderTopColor: '#fff',
                        borderBottomColor: 'lightgrey'
                    }} />
                <Button large full block info style={styles.rgb} onPress={() => {

                }}>
                    <Icon name='add' /><Text style={styles.titleText}>Allocate Book</Text>
                </Button> */}
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
