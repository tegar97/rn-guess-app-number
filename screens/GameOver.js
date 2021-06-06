import React from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import BodyText from "../components/BodyText";
const GameOverScreen = (props) => {
  return (
    <View style={styles.screen}>
      <BodyText>The Game Is Over</BodyText>
      <View style={styles.imageContainer}>
        <Image
          fadeDuration={300}
          style={styles.image}
          // source={require("./../assets/success.png")}
          source={{
            uri: "https://asset.kompas.com/crops/49uR_N10bYZ9rkxzcysKqsa-rlQ=/105x0:800x463/750x500/data/photo/2019/05/24/3654131552.jpg",
          }}
          resizeMode="cover"
        />
      </View>
      <BodyText>Number Of Win : {props.roundsNumber}</BodyText>
      <BodyText>Number was : {props.userNumber}</BodyText>
      <Button title="NEW GAME" onPress={props.onRestart} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    borderRadius: 200,
    width: 300,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: "black",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 300,
  },
});
export default GameOverScreen;
