import { View, TouchableOpacity, Text } from "react-native";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useTheme } from "@react-navigation/native";
import Header from "../../components/Header/Header";
import UserContext from "../../context/UserContext";
import CompanyHeader from "../../components/Header/CompanyHeader";

const CompanySearch = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const state = useContext(UserContext);
  return (
    <SafeAreaView style={{ backgroundColor: "#141414" }}>
      {state.isCompany ? (
        <CompanyHeader isBack={true} />
      ) : (
        <Header isBack={true} />
      )}
      <View
        style={{
          backgroundColor: colors.background,
          height: "100%",
        }}
      >
        <TouchableOpacity
          style={{
            padding: 10,

            borderWidth: 1,
            borderRadius: 20,
            marginVertical: 10,
            borderColor: colors.border,
            margin: 20,
          }}
          onPress={() => navigation.navigate("EmployerSearch")}
        >
          <Text style={{ textAlign: "center", color: colors.primaryText }}>
            Ажил олгогч компани хайх
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: 10,

            borderWidth: 1,
            borderRadius: 20,
            marginVertical: 10,
            borderColor: colors.border,
            margin: 20,
          }}
          onPress={() => navigation.navigate("EmployeeSearch")}
        >
          <Text
            style={{
              textAlign: "center",
              color: colors.primaryText,
            }}
          >
            Ажил хайгч компани хайх
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: 10,

            borderWidth: 1,
            borderRadius: 20,
            marginVertical: 10,
            margin: 20,
            borderColor: colors.border,
          }}
          onPress={() => navigation.navigate("AllCompanySearch")}
        >
          <Text
            style={{
              textAlign: "center",
              color: colors.primaryText,
            }}
          >
            Бүгд
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CompanySearch;
