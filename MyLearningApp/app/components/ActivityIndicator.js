import React from "react";
import { StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";

function ActivityIndicator({ visible = false }) {
  if (!visible) return null;
  return (
    <View style={styles.overlay}>
      <LottieView
        autoPlay
        loop
        source={require("../assets/animations/40-loading.json")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: "white",
    elevation: 1,
    height: "100%",
    opacity: 0.8,
    position: "absolute",
    width: "100%",
    zIndex: 1,
  },
});

export default ActivityIndicator;
