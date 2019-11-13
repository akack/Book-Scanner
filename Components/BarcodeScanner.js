import * as React from 'react';
import {
    Text, View, StyleSheet, Dimensions, Image, Alert, TouchableHighlight, Modal, FlatList,
    ActivityIndicator,
    Platform,
    ScrollView,
    KeyboardAvoidingView,
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
            studentNo: '',
            selectedBackground: ''
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
            {
                "userId": 5,
                "studentNo": 5,
                "name": "Litha",
                "surname": "Magaqana"
            },
            {
                "userId": 6,
                "studentNo": 6,
                "name": "Sledge",
                "surname": "Gxelesha"
            },
            {
                "userId": 7,
                "studentNo": 7,
                "name": "Masibonge",
                "surname": "Gxelesha"
            },
            {
                "userId": 8,
                "studentNo": 8,
                "name": "Xolisa",
                "surname": "Magaqana"
            },
            {
                "userId": 9,
                "studentNo": 9,
                "name": "Lwazi",
                "surname": "Magaqana"
            },
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
            {
                "userId": 5,
                "studentNo": 5,
                "name": "Litha",
                "surname": "Magaqana"
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

    };
    ListViewItemSeparator = () => {
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
        if (!scanned) {
            return (
                <View style={styles.cameraBarcodeScannerWrapper}>
                    {!this.state.modalVisible &&
                        <BarCodeScanner
                            onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
                            style={{ height: 350, width: 400, alignItems: 'center' }}>
                            {/* <Image
                                style={styles.qr}
                                source={require('../assets/imgs/qr.png')}
                            /> */}

                        </BarCodeScanner>
                    }
                    <View>
                        <Button full light
                            onPress={() => this.props.navigation.navigate('HomeScreen')}
                        >
                            <Text>Cancel</Text>
                        </Button>
                    </View>
                </View>
            )
        }

        return (

            <KeyboardAvoidingView behavior="padding" enabled>
                {
                    scanned && <View style={{
                        marginTop: 10,
                        paddingHorizontal: 5,
                    }}>
                        <Text style={{ marginBottom: 7, padding: 5, fontSize: 15, textAlign: 'center', backgroundColor: 'lightgray' }}>ASSIGNING BOOK TO THE STUDENT</Text>
                        <Text style={{ marginBottom: 7, padding: 8, borderBottomColor: 'lightgrey', borderBottomWidth: .5 }}>Book Barcode:  {this.state.data}</Text>
                        <View style={styles.viewStyle}>
                            <SearchBar
                                round
                                searchIcon={{ size: 24 }}
                                onChangeText={text => this.SearchFilterFunction(text)}
                                onClear={text => this.SearchFilterFunction('')}
                                placeholder="Search student name..."
                                value={this.state.search}
                                containerStyle={{ backgroundColor: '#ffffff', borderColor: '#ffffff', borderStyle: 'solid', borderWidth: .5, borderBottomWidth: .5, borderTopColor: '#fff', borderBottomColor: 'lightgrey' }}
                            />
                        </View>
                        <View>
                            <Button full light
                                onPress={() =>{
                                    this.setState({ scanned: false });
                                     this.props.navigation.navigate('BarcodeScannerScreen');
                                    }}
                            >
                                <Text>Re-Scan Book</Text>
                            </Button>
                        </View>
                    </View>
                }
                {scanned &&

                    <ScrollView>
                        <Content style={{ marginBottom: 80, paddingHorizontal: 5 }}>
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
                                                            'Successfully Assigned Book to student.',
                                                            `Student Details: ${this.state.studentNo} ${this.state.student_name} ${this.state.student_surname} - Book Barcode: ${this.state.data}`,
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
                                                        //this.setState({ scanned: false });
                                                        console.log('Not Submitted');
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
                        </Content>
                    </ScrollView>
                }
            </KeyboardAvoidingView>
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
        // justifyContent: 'center',
        // marginBottom: 5,
        // backgroundColor: 'white',
        overflow: 'hidden',
        marginTop: Platform.OS == 'ios' ? 30 : 0,
        marginBottom: 20
    },
    textStyle: {
        padding: 10,
    },
    cameraBarcodeScannerWrapper: {
        overflow: 'hidden',
        width: 400,
        height: 400,
        alignSelf: 'center'
    },
});