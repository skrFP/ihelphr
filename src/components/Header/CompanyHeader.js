import { Image, View, TouchableOpacity, Text } from "react-native";
import React from "react";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useNavigation, useTheme } from "@react-navigation/native";
const CompanyHeader = (props) => {
  const { isBack, notification, isEmployeeAddWork, isEmployerAddWork } = props;
  const navigation = useNavigation();
  const { colors } = useTheme();

  return (
    <View
      style={{
        backgroundColor: "#141414",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        bottom: 0,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: colors.border,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginHorizontal: 20,
        }}
      >
        <View>
          {isBack ? (
            <AntDesign
              name="left"
              size={25}
              color={colors.primaryText}
              onPress={() => navigation.goBack()}
            />
          ) : (
            <Ionicons
              name="search"
              size={25}
              color={colors.primaryText}
              onPress={() => navigation.navigate("NetworkingSearch")}
            />
          )}
        </View>
        <View>
          <Image
            source={require("../../../assets/ihelp/logo.png")}
            style={{
              width: 90,
              height: 50,
              resizeMode: "contain",
            }}
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          {notification ? (
            <TouchableOpacity style={{}}>
              <Ionicons
                name="md-notifications-outline"
                size={30}
                color={colors.primaryText}
                style={{ marginRight: 10 }}
              />

              <View
                style={{
                  position: colors.primary,
                  backgroundColor: "red",
                  borderRadius: 20,
                  paddingHorizontal: 3.5,
                  position: "absolute",
                  top: 0,
                  right: 20,
                }}
              >
                <Text
                  style={{
                    color: colors.primaryText,
                    fontFamily: "Sf-bold",
                    padding: 3,
                    fontSize: 10,
                  }}
                >
                  {notification}
                </Text>
              </View>
            </TouchableOpacity>
          ) : isEmployerAddWork ? (
            <Ionicons
              name="add"
              size={30}
              color={colors.primaryText}
              onPress={() => navigation.navigate("EmployerAddWork")}
            />
          ) : isEmployeeAddWork ? (
            <Ionicons
              name="add"
              size={30}
              color={colors.primaryText}
              onPress={() => navigation.navigate("EmployeeAddWork")}
            />
          ) : null}
        </View>
      </View>
    </View>
  );
};

export default CompanyHeader;
