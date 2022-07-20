import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import { api } from "../../../../Constants";

const CompanyJobs = (props) => {
  const { id, createUser, occupation, type, salary, count } = props;
  const navigation = useNavigation();
  const { colors } = useTheme();

  return (
    <View
      style={{
        backgroundColor: "#454545",
        marginHorizontal: 10,
        paddingVertical: 15,
        marginVertical: 4,
        borderRadius: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={() => navigation.navigate("CompanyWorkDetail", { id })}
        >
          <Image
            source={{
              uri: `${api}/upload/${createUser.profile}`,
            }}
            style={{
              width: 75,
              height: 75,
              borderRadius: 30,
              marginHorizontal: 5,
            }}
          />

          <View>
            <Text
              style={{
                fontSize: 15,
                color: colors.primaryText,
                fontFamily: "Sf-bold",
                fontWeight: "bold",
                width: "95%",
              }}
            >
              {occupation.name}
              {/* Борлуулалт мэдээлэлийн ажилтан */}
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: colors.primaryText,
                fontFamily: "Sf-bold",
                fontWeight: "bold",
                width: "95%",
              }}
            >
              {/* {occupation.name} */}
              {/* Борлуулалт мэдээлэлийн ажилтан */}
            </Text>
            <Text
              style={{
                paddingVertical: 5,
                color: colors.primaryText,
                fontFamily: "Sf-thin",
                fontSize: 14,
              }}
            >
              {salary}₮
            </Text>
            <Text
              style={{
                color: colors.primaryText,
                fontFamily: "Sf-regular",
                fontWeight: "200",
              }}
            >
              {type} - {createUser.name}
            </Text>
          </View>
        </TouchableOpacity>
        <View style={{}}>
          <Text
            style={{
              color: colors.primaryText,
              width: "80%",
              textAlign: "center",
            }}
          >
            Зарыг үзсэн тоо:{" "}
            <Text
              style={{
                color: colors.primaryText,
                fontFamily: "Sf-bold",
              }}
            >
              {count}
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CompanyJobs;

const styles = StyleSheet.create({});
