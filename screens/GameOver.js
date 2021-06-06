import React from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import BodyText from "../components/BodyText";
import Colors from "./../constant/color.js";
const GameOverScreen = (props) => {
  return (
    <View style={styles.screen}>
      <BodyText>The Game Is Over</BodyText>
      <View style={styles.imageContainer}>
        <Image
          fadeDuration={300}
          style={styles.image}
          source={require("./../assets/success.png")}
          // source={{
          //   uri: "https://asset.kompas.com/crops/49uR_N10bYZ9rkxzcysKqsa-rlQ=/105x0:800x463/750x500/data/photo/2019/05/24/3654131552.jpg",
          // }}
          resizeMode="cover"
        />
      </View>
      <View style={styles.resultContainer}>
        <BodyText style={styles.resultText}>
          Your Phone need{" "}
          <Text style={styles.higlight}>{props.roundsNumber}</Text> rounds to
          guess number
          <Text style={styles.higlight}>{props.userNumber}</Text>
        </BodyText>
      </View>

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
    marginVertical: 10,
  },
  image: {
    width: "100%",
    height: 300,
  },
  higlight: {
    color: Colors.primary,
    fontFamily: "open-sans-bold",
  },
  resultContainer: {
    marginVertical: 15,
    marginHorizontal: 15,
  },
  resultText: {
    textAlign: "center",
    fontSize: 20,
  },
});
export default GameOverScreen;
