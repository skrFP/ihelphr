import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

const MyButton = (props) => {
  return (
    <TouchableOpacity
      style={{
        padding: 10,
        borderWidth: 1,
        borderRadius: 20,
      }}
      onPress={props.onPress}
      {...props}
    >
      <Text style={{ textAlign: "center", ...props.textStyle }}>
        {props.text}
      </Text>
    </TouchableOpacity>
  );
};

export default MyButton;

const styles = StyleSheet.create({});
