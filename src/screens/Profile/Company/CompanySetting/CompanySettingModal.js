import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import UserContext from "../../../../context/UserContext";
const CompanySettingModal = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const state = useContext(UserContext);
  const companyExit = () => {
    state.logout();
  };
  return (
    <View style={{ marginHorizontal: 20, flex: 1 }}>
      {/* Oruulsan ajliin zar  */}
      <TouchableOpacity
        style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}
        onPress={() => {
          navigation.navigate("CompanyCreateWork");
        }}
      >
        <MaterialIcons
          name="work-outline"
          size={28}
          color={colors.primaryText}
        />
        <Text
          style={{ color: colors.primaryText, marginLeft: 20, fontSize: 18 }}
        >
          Оруулсан ажлын зар
        </Text>
      </TouchableOpacity>
      {/* Line */}
      <View
        style={{
          borderWidth: 0.5,
          borderColor: colors.border,
          marginVertical: 10,
        }}
      />
      {/* Ashiglasan uilchilgeenuud */}
      <TouchableOpacity
        style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}
        onPress={() => {
          navigation.navigate("CompanyUsedProduct");
        }}
      >
        <MaterialIcons
          name="app-settings-alt"
          size={28}
          color={colors.primaryText}
        />

        <Text
          style={{ color: colors.primaryText, marginLeft: 20, fontSize: 18 }}
        >
          Ашиглаж буй үйлчилгээ
        </Text>
      </TouchableOpacity>
      {/* Line */}
      <View
        style={{
          borderWidth: 0.5,
          borderColor: colors.border,
          marginVertical: 10,
        }}
      />
      {/* Irsen cv nuud */}
      <TouchableOpacity
        style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}
        onPress={() => {
          navigation.navigate("CompanyRecievedCv");
        }}
      >
        <MaterialIcons name="archive" size={28} color={colors.primaryText} />

        <Text
          style={{ color: colors.primaryText, marginLeft: 20, fontSize: 18 }}
        >
          Ирсэн ажлын санал
        </Text>
      </TouchableOpacity>
      {/* Line */}
      <View
        style={{
          borderWidth: 0.5,
          borderColor: colors.border,
          marginVertical: 10,
        }}
      />
      <TouchableOpacity
        style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}
        onPress={() => {
          navigation.navigate("ChangePassword");
        }}
      >
        <MaterialIcons name="security" size={28} color={colors.primaryText} />

        <Text
          style={{ color: colors.primaryText, marginLeft: 20, fontSize: 18 }}
        >
          Нууц үг солих
        </Text>
      </TouchableOpacity>
      {/* Line */}
      <View
        style={{
          borderWidth: 0.5,
          borderColor: colors.border,
          marginVertical: 10,
        }}
      />
      <TouchableOpacity
        style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}
        onPress={companyExit}
      >
        <MaterialIcons name="logout" size={28} color={colors.primaryText} />

        <Text
          style={{ color: colors.primaryText, marginLeft: 20, fontSize: 18 }}
        >
          Аккоунт гаргах
        </Text>
      </TouchableOpacity>
      {/* Line */}
      <View
        style={{
          borderWidth: 0.5,
          borderColor: colors.border,
          marginVertical: 10,
        }}
      />
    </View>
  );
};

export default CompanySettingModal;

const styles = StyleSheet.create({});
