import { View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useTheme } from "@react-navigation/native";
import MyButton from "../../components/MyButton";
import Header from "../../components/Header/Header";

const CompanySearch = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ backgroundColor: "#141414" }}>
      <Header isBack={true} />

      <View
        style={{
          backgroundColor: colors.background,
          height: "100%",
        }}
      >
        <MyButton
          onPress={() => navigation.navigate("EmployerSearch")}
          style={{ margin: 20 }}
          text="Ажил олгогч компани хайх"
        />
        <MyButton
          onPress={() => navigation.navigate("EmployeeSearch")}
          style={{ margin: 20 }}
          text=" Ажил хайгч компани хайх"
        />
      </View>
    </SafeAreaView>
  );
};

export default CompanySearch;
