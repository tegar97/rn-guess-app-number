import React from "core-js/library/fn/reflect/es7/metadata";
import { Text, StyleSheet } from "react-native";

const BodyText = (props) => <Text style={styles.Body}>{props.children}</Text>;

const styles = StyleSheet.create({
  body: {
    fontFamily: "open-sans-bold",
  },
});
