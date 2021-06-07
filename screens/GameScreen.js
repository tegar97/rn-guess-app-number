import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  ScrollView,
  FlatList,
  Dimensions,
} from "react-native";
import Card from "../components/Card";
import MainButton from "../components/MainButton";
import NumberContainer from "../components/NumberContainer";
import DefaultStyle from "./../constant/default_style";
import { Ionicons } from "@expo/vector-icons";
import * as ScreenOrientation from "expo-screen-orientation";
import BodyText from "../components/BodyText";

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

const renderListItem = (listLength, itemData) => (
  <View style={styles.listitem}>
    <BodyText>#{listLength - itemData.index}</BodyText>
    <BodyText>{itemData.item}</BodyText>
  </View>
);
const GameScreen = (props) => {
  //lock screen to potrait
  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  const initialGuess = generateRandomBetween(1, 100, props.userChoice);

  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [passGuess, setPassGuess] = useState([initialGuess.toString()]);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);
  const [availableDeviceWidth, setAvailableDeviceWidth] = useState(
    Dimensions.get("window").width
  );
  const [availableDeviceHeight, setAvailableDeviceHeight] = useState(
    Dimensions.get("window").height
  );

  const { userChoice, onGameOver } = props;

  useEffect(() => {
    if (currentGuess === props.userChoice) {
      onGameOver(passGuess.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < props.userChoice) ||
      (direction === "greater" && currentGuess > props.userChoice)
    ) {
      Alert.alert("Dont't lie!", "You Know that this is wrong ...", [
        { text: "Sorry!", style: "cancel" },
      ]);

      return;
    }

    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }

    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );

    setCurrentGuess(nextNumber);
    setPassGuess((curPassGuess) => [nextNumber.toString(), ...curPassGuess]);
  };

  useEffect(() => {
    const UpdateLayout = () => {
      setAvailableDeviceHeight(Dimensions.get("window").height);
      setAvailableDeviceWidth(Dimensions.get("window").width);
    };
    Dimensions.addEventListener("change", UpdateLayout);
    return () => {
      Dimensions.removeEventListener("change", UpdateLayout);
    };
  }, []);

  let listContainerStyle = styles.listContainer;

  if (availableDeviceWidth < 350) {
    listContainerStyle = styles.listContainerBig;
  }

  if (availableDeviceHeight < 500) {
    return (
      <View style={styles.screen}>
        <Text style={DefaultStyle.title}>Opponent's Guess</Text>
        <View style={styles.controls}>
          <MainButton onPress={nextGuessHandler.bind(this, "lower")}>
            <Ionicons name="md-remove" size={24} color="white" />
          </MainButton>
          <NumberContainer>{currentGuess}</NumberContainer>

          <MainButton onPress={nextGuessHandler.bind(this, "greater")}>
            <Ionicons name="md-add" size={24} color="white" />
          </MainButton>
        </View>
        <View style={listContainerStyle}>
          {/* <ScrollView contentContainerStyle={styles.list}>
          {passGuess.map((guess, index) =>
            renderListItem(guess, passGuess.length - index)
          )}
          </ScrollView>*/}
          <FlatList
            keyExtractor={(item) => item}
            data={passGuess}
            renderItem={renderListItem.bind(this, passGuess.length)}
            contentContainerStyle={styles.list}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Text style={DefaultStyle.title}>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={nextGuessHandler.bind(this, "lower")}>
          <Ionicons name="md-remove" size={24} color="white" />
        </MainButton>
        <MainButton onPress={nextGuessHandler.bind(this, "greater")}>
          <Ionicons name="md-add" size={24} color="white" />
        </MainButton>
      </Card>
      <View style={listContainerStyle}>
        {/* <ScrollView contentContainerStyle={styles.list}>
          {passGuess.map((guess, index) =>
            renderListItem(guess, passGuess.length - index)
          )}
          </ScrollView>*/}
        <FlatList
          keyExtractor={(item) => item}
          data={passGuess}
          renderItem={renderListItem.bind(this, passGuess.length)}
          contentContainerStyle={styles.list}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: 400,
    maxWidth: "90%",
  },
  listContainer: {
    width: "60%",
    flex: 1,
  },

  listContainerBig: {
    width: "80%",
    flex: 1,
  },
  list: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  listitem: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    alignItems: "center",
  },
});

export default GameScreen;
