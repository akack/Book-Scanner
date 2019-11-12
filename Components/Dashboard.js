import React, { Fragment } from "react";
import { StyleSheet, Image, Text, View } from "react-native";
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
  Button
} from "native-base";

export default class DashboardScreen extends React.Component {
  cards = [
    {
      s: "Card 1",
      name: "1",
      image: require("../../assets/imgs/naive-logo.png")
    },
    {
      s: "Card 2",
      name: "2",
      image: require("../../assets/imgs/naive-logo.png")
    },
    {
      s: "Card 3",
      name: "3",
      image: require("../../assets/imgs/naive-logo.png")
    },
    ,
    {
      s: "Card 4",
      name: "4",
      image: require("../../assets/imgs/naive-logo.png")
    }
  ];
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
  }

  render() {
    return (
        <View>
            <Text>Dashboard</Text>
        </View>
    //   <Container style={styles.container}>
    //     <View
    //       style={{
    //         flexDirection: "row",
    //         left: 0,
    //         right: 0,
    //         justifyContent: "space-between",
    //         padding: 15
    //       }}
    //     >
    //       <Button
    //         iconLeft
    //         bordered
    //         dark
    //         onPress={() => this.deckSwiper._root.swipeLeft()}
    //       >
    //         <Icon name="arrow-back" />
    //         <Text>Swipe Left</Text>
    //       </Button>
    //       <Button
    //         iconRight
    //         bordered
    //         dark
    //         onPress={() => this.deckSwiper._root.swipeRight()}
    //       >
    //         <Text>Swipe Right</Text>
    //         <Icon name="arrow-forward" />
    //       </Button>
    //     </View>
    //     <View>
    //       <Text>New Music</Text>
    //       <DeckSwiper
    //         ref={ds => (this.deckSwiper = ds)}
    //         dataSource={this.cards}
    //         renderItem={item => (
    //           <Card style={{ elevation: 3 }}>
    //             <CardItem>
    //               <Left>
    //                 <Thumbnail source={item.image} />
    //                 <Body>
    //                   <Text>{item.s}</Text>
    //                   <Text note>NativeBase</Text>
    //                 </Body>
    //               </Left>
    //             </CardItem>
    //             <CardItem cardBody>
    //               <Image style={{ height: 200, flex: 1 }} source={item.image} />
    //             </CardItem>
    //             <CardItem>
    //               <Icon name="heart" style={{ color: "#ED4A6A" }} />
    //               <Text>{item.name}</Text>
    //             </CardItem>
    //           </Card>
    //         )}
    //       />
    //     </View>
    //   </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",

    flexDirection: "column",
    alignContent: "stretch",
    textAlign: "center",
    paddingHorizontal: 10,
    marginTop: 10
  }
});
