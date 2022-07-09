import { StyleSheet, Image, Pressable } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Pressable
        style={{ flex: 0.5 }}
        onPress={() => navigation.navigate("CompanyLoginScreen")}
      >
        <Image
          source={require("../../assets/ihelp/HomeCompany.png")}
          style={{ flex: 1, width: "100%" }}
        />
      </Pressable>

      <Pressable
        style={{ flex: 0.5 }}
        onPress={() => navigation.navigate("PersonLoginScreen")}
      >
        <Image
          source={require("../../assets/ihelp/HomePerson.png")}
          style={{ flex: 1, width: "100%" }}
        />
      </Pressable>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
