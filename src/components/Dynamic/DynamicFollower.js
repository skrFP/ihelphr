import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import axios from "axios";
import UserContext from "../../context/UserContext";
import { api } from "../../../Constants";

const DynamicFollower = (props) => {
  const { followUser, isFollowing } = props;
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [follow, setFollow] = useState(isFollowing);
  const state = useContext(UserContext);
  const onFollow = () => {
    if (follow) {
      setFollow(false);
      axios
        .delete(
          `${api}/api/v1/follows/${followUser._id}/${
            state.isCompany ? state.companyId : state.userId
          }`
        )
        .then((res) => {
          console.log(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setFollow(true);
      axios
        .post(
          `${api}/api/v1/follows/${followUser._id}/${
            state.isCompany ? state.companyId : state.userId
          }`
        )
        .then((res) => {
          console.log(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginHorizontal: 20,
          marginTop: 10,
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
          onPress={() =>
            navigation.navigate("UserProfileDetail", {
              id: followUser._id,
            })
          }
        >
          <Image
            source={{ uri: `${api}/upload/${followUser.profile}` }}
            style={{ width: 50, height: 50, borderRadius: 50 }}
          />
          <Text
            style={{
              margin: 10,
              fontWeight: "bold",
              color: colors.primaryText,
            }}
          >
            {followUser.firstName}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderWidth: 1,
            padding: 10,
            paddingHorizontal: 20,
            borderColor: colors.border,
            borderRadius: 10,
          }}
          onPress={onFollow}
        >
          <Text
            style={{
              color: colors.primaryText,
              fontFamily: "Sf-bold",
            }}
          >
            {follow ? "Дагахгүй" : "Дагах"}
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          borderWidth: 1,
          borderColor: colors.border,
          marginVertical: 10,
        }}
      />
    </>
  );
};

export default DynamicFollower;

const styles = StyleSheet.create({});
