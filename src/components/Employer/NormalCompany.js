import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import { api } from "../../../Constants";
import Icon from "@expo/vector-icons/Entypo";
const NormalCompany = (props) => {
  const { data, error, loading } = props;
  const navigation = useNavigation();
  const { colors } = useTheme();
  return (
    <View
      style={{
        backgroundColor: colors.background,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        marginHorizontal: 10,
        borderRadius: 10,
        marginVertical: 4,
        borderWidth: 1,
        borderColor: colors.border,
      }}
      key={data._id}
    >
      <TouchableOpacity
        style={{ flexDirection: "row", alignItems: "center" }}
        onPress={() =>
          navigation.navigate("ViewCompanyProfile", { id: data._id })
        }
      >
        <Image
          source={{
            uri: `${api}/upload/${data.profile}`,
          }}
          style={{
            width: 80,
            height: 80,
            borderRadius: 30,
          }}
        />
        <View style={{ marginLeft: 10 }}>
          <Text style={{ color: "white", fontWeight: "bold" }}>
            {data.firstName}
          </Text>
          <Text
            style={{
              color: "white",
              fontFamily: "Sf-thin",
              marginVertical: 5,
            }}
          >
            {data.category && data.category.name}
          </Text>
          <Text style={{ color: "white" }}>
            Нийт ажлын байр: {data.jobNumber}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default NormalCompany;

const styles = StyleSheet.create({});
