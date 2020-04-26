import React from "react"
import { StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { Text } from "native-base"

const color = "#d96235";
const unmarkedColor = "#999999";
const styles = StyleSheet.create({
  button: {
    padding:10
  },
  text: {
    fontSize: 12,
    color: color,
  },
  unmarkedText: {
    fontSize: 14,
    color: unmarkedColor,
  },
});

const IconFeedback = ({ amount, icon, onClick, marked }) => {
  const onHandleClick = () => {
    onClick && onClick()
  };
  return (
    <>
      <Ionicons.Button
        styles={styles.button}
        name={icon}
        color={marked ? color : unmarkedColor}
        backgroundColor={"rgba(255,255,255,0)"}
        size={22}
        onPress={onHandleClick}
      >
        <Text style={marked ? styles.text : styles.unmarkedText}>
          {amount}
        </Text>
      </Ionicons.Button>
    </>
  )
}

export default IconFeedback;
