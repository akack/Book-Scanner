import * as React from 'react';
import {
    Text, View, StyleSheet, Dimensions, Image, Alert, TouchableHighlight, Modal, FlatList,
    ActivityIndicator,
    Platform,
} from 'react-native';
import { Container, Header, Content, Tab, Tabs, Button, Picker, Form } from 'native-base';
import { SearchBar } from 'react-native-elements';

import * as Permissions from 'expo-permissions';

import { BarCodeScanner } from 'expo-barcode-scanner';
const { width } = Dimensions.get('window')
const qrSize = width * 0.7
export default class BarcodeScannerScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasCameraPermission: null,
            scanned: false,
            modalVisible: false,
            type: '',
            data: '',
            isLoading: true,
            search: '',
            dataSource: [],
            student_name: '',
            student_surname: '',
            studentNo: ''
        };
       
    }
    //Search
    search = text => {
        console.log(text);
    };
    clear = () => {
        this.search.clear();
    };

    SearchFilterFunction(text) {
        //passing the inserted text in textinput
        const newData = this.arrayholder.filter(function (item) {
            //applying filter for the inserted text in search bar
            const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });

        this.setState({
            //setting the filtered newData on datasource
            //After setting the data it will automatically re-render the view
            dataSource: newData,
            search: text,
        });
    }

    //search

    async componentDidMount() {
        this.getPermissionsAsync();
        this.arrayholder = [
            {
                "userId": 1,
                "studentNo": 1,
                "name": "Akha",
                "surname": "Magaqana"
            },
            {
                "userId": 12,
                "studentNo": 2,
                "name": "Sello",
                "surname": "Selowa"
            },
            {
                "userId": 3,
                "studentNo": 3,
                "name": "Morne",
                "surname": "Cotzee"
            },
            {
                "userId": 4,
                "studentNo": 4,
                "name": "Luphawu",
                "surname": "Jack"
            },

        ];
        this.setState({
            modalVisible: false,
            dataSource: this.arrayholder
        })

    };

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    };

    getPermissionsAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    };

    handleBarCodeScanned = ({ type, data }) => {
        this.setState({
            scanned: true,
            type: type,
            data: data
        });
        // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };
    ListViewItemSeparator = () => {
        //Item sparator view
        return (
            <View
                style={{
                    height: 0.3,
                    width: '90%',
                    backgroundColor: '#080808',
                }}
            />
        );
    };
    render() {
        const { hasCameraPermission, scanned } = this.state;

        if (hasCameraPermission === null) {
            return <Text>Requesting for camera permission</Text>;
        }
        if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        }
        return (
            <View
                style={{
                    flex: 1,
        
                    flexDirection: 'row',
                    alignContent: 'stretch',
                    overflow: 'hidden',

                }}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
                    style={[StyleSheet.absoluteFill, styles.container]}>
                    <Image
                        style={styles.qr}
                        source={require('../assets/imgs/qr.png')}
                    />
                    <Button full light
                        onPress={() => this.props.navigation.navigate('HomeScreen')}
                    >
                        <Text>Cancel</Text>
                    </Button>

                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={this.state.modalVisible}
                        height="200"
                    >
                        <View style={{
                            flex: 1,
                            marginTop: 20,
                            paddingHorizontal: 5
                        }}>
                            <Text style={{marginBottom: 7, padding: 5, fontSize: 20, fontWeight: 'bold', textAlign: 'center', backgroundColor: 'lightgray'}}>ASSIGNING BOOK TO THE STUDENT</Text>
                            <Text style={{marginBottom: 7, padding: 8, borderBottomColor: 'lightgrey', borderBottomWidth:1}}>Book Barcode:  {this.state.data}</Text>
                            <View style={styles.viewStyle}>
                                <SearchBar
                                    round
                                    searchIcon={{ size: 24 }}
                                    onChangeText={text => this.SearchFilterFunction(text)}
                                    onClear={text => this.SearchFilterFunction('')}
                                    placeholder="Type Here..."
                                    value={this.state.search}
                                    containerStyle={{backgroundColor: '#ffffff', borderColor: '#ffffff', borderStyle: 'solid', borderWidth: 0, borderBottomWidth: 0, borderTopColor:'#fff'}}
                                />
                                <FlatList
                                    data={this.state.dataSource}
                                    ItemSeparatorComponent={this.ListViewItemSeparator}
                                    renderItem={({ item }) => (
                                        <Text style={styles.textStyle} onPress={() => {
                                            this.setState({
                                                student_name: item.name,
                                                student_surname: item.surname,
                                                studentNo: item.studentNo,
                                            });
                                            Alert.alert(
                                                'Submit Record',
                                                'Submiting student record.',
                                                [
                                                    {
                                                        text: 'Submit', onPress: () => {
                                                            const user = {
                                                                student_name: this.state.student_name,
                                                                student_surname: this.state.student_surname,
                                                                studentNo: this.state.studentNo,
                                                                data: this.state.data,
                                                                type: this.state.type
                                                            }
                                                            console.log('Student to submit: ', user);
                                                            Alert.alert(
                                                                'Submitted student succesfully',
                                                                [
                                                                    {
                                                                        text: 'Ok', onPress: () => {
                                                                            this.props.navigation.navigate('HomeScreen');
                                                                            this.setModalVisible(!this.state.modalVisible);
                                                                        }
                                                                    }                        
                                                                ],
                                                                { cancelable: false }
                                                            )
                                                        }
                                                    },
                                                    {
                                                        text: 'Cancel', onPress: () => {
                                                            this.setState({ scanned: false });
                                                            console.log('Canceled');
                                                        }
                                                    }
                        
                                                ],
                                                { cancelable: false }
                                            )
                                            
                                        }}>{item.name} {item.surname}</Text>
                                    )}
                                    enableEmptySections={true}
                                    style={{ marginTop: 10 }}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                            </View>
                        </View>

                        <View>
                            <Button full info
                                onPress={() => {
                                    this.setModalVisible(!this.state.modalVisible);
                                }}>
                                <Text>close</Text>
                            </Button>
                        </View>
                    </Modal>
                </BarCodeScanner>

                {scanned && (
                    Alert.alert(
                        'Barcode Scanner',
                        'Press "Assign" to assign the book to a student',
                        [
                            {
                                text: 'Assign', onPress: () => {
                                    this.setState({ scanned: false });
                                    this.setModalVisible(true);
                                }
                            },
                            {
                                text: 'Cancel', onPress: () => {
                                    this.setState({ scanned: false });
                                    console.log('Canceled');
                                }
                            }

                        ],
                        { cancelable: false }
                    )
                )}
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    qr: {
        marginTop: '20%',
        marginBottom: '20%',
        width: qrSize,
        height: qrSize,
    },
    description: {
        fontSize: width * 0.09,
        marginTop: '10%',
        textAlign: 'center',
        width: '70%',
        color: 'white',
    },
    cancel: {
        fontSize: width * 0.05,
        textAlign: 'center',
        width: '70%',
        color: 'white',
    }, viewStyle: {
        justifyContent: 'center',
        flex: 1,
        backgroundColor: 'white',
        marginTop: Platform.OS == 'ios' ? 30 : 0,
    },
    textStyle: {
        padding: 10,
    },
});