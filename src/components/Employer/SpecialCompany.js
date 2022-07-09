import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Icon from "@expo/vector-icons/Entypo";
import { api } from "../../../Constants";
const SpecialCompany = (props) => {
  const { data } = props;
  const navigation = useNavigation();
  return (
    <View>
      {data.map((data) => {
        return (
          <View
            style={{
              backgroundColor: "#454545",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 10,
              marginHorizontal: 10,
              borderRadius: 10,
              marginVertical: 4,
            }}
            key={data._id}
          >
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center" }}
              onPress={() =>
                navigation.navigate("CompanyProfileDetail", { id: data._id })
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
                  {data.name}
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
      })}
    </View>
  );
};

export default SpecialCompany;

const styles = StyleSheet.create({});
