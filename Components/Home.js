import * as React from 'react';
import { Text, View, StyleSheet, Dimensions, Image, Alert } from 'react-native';
import {
    Container,
    Header,

    DeckSwiper,
    Card,
    CardItem,
    Thumbnail,

    Left,
    Body,
    Icon,
    Fab,
    Button,
    Content
} from "native-base";
export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {

        return (
            <Container>
                <Content>
                    <Button full light onPress={() => {
                        this.props.navigation.navigate('BarcodeScannerScreen');
                    }}>
                        <Text>Scan Book Barcode</Text>
                    </Button>
                    <Button full info>
                        <Text>View Books</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        flexDirection: 'column',
        alignContent: 'stretch',
        marginTop: 30,
        paddingHorizontal: 5
    },

});