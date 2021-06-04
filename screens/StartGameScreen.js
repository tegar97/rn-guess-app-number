import React from "react";
import { View, StyleSheet, Text } from "react-native";

const StartGameScreen = () => {
  return (
    <View style={styles.screen}>
      <Text>Helo from start game screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
});
export default StartGameScreen;
