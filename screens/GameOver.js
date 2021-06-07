import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import BodyText from "../components/BodyText";
import MainButton from "../components/MainButton";
import Colors from "./../constant/color.js";
const GameOverScreen = (props) => {
  const [availableDeviceWidth, setAvailableDeviceWidth] = useState(
    Dimensions.get("window").width
  );
  const [availableDeviceHeight, setAvailableDeviceHeight] = useState(
    Dimensions.get("window").height
  );

  useEffect(() => {
    const updateLayout = () => {
      setAvailableDeviceWidth(Dimensions.get("window").width);
      setAvailableDeviceHeight(Dimensions.get("window").height);
    };

    Dimensions.addEventListener("change", updateLayout);

    return () => {
      Dimensions.removeEventListener("change", updateLayout);
    };
  });

  return (
    <ScrollView>
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

        <MainButton onPress={props.onRestart}>New Game</MainButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  imageContainer: {
    height: Dimensions.get("window").width * 0.7,
    width: Dimensions.get("window").width * 0.7,
    borderRadius: (Dimensions.get("window").width * 0.7) / 2,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: "black",
    overflow: "hidden",
    marginVertical: Dimensions.get("window").height / 30,
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
    fontSize: Dimensions.get("window").height < 400 ? 16 : 20,
  },
});
export default GameOverScreen;
