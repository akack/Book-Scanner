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
            <Container style={styles.container}>
                <Content>
                    <Button  large full light style={styles.btn} onPress={() => {
                        this.props.navigation.navigate('BarcodeScannerScreen');
                    }}>
                         <Icon name='camera' />
                        <Text>Scan Book</Text>
                    </Button>

                    <Button large full info style={styles.btn}>
                    <Icon name='eye' /><Text>View Books</Text>
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
        flexDirection: 'row',
        alignContent: 'stretch',
        marginTop: 30,
        paddingHorizontal: 5
    },
    btn: {
        marginBottom: 5
    }

});