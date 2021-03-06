import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useContext, useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import axios from "axios";
import UserContext from "../../context/UserContext";
import { api } from "../../../Constants";
import { AntDesign, Ionicons } from "@expo/vector-icons";
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
        {followUser.organization ? (
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
            onPress={() =>
              navigation.navigate("ViewCompanyProfile", {
                id: followUser._id,
              })
            }
          >
            <ImageBackground
              source={{
                uri: `${api}/upload/${followUser.profile}`,
              }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 30,
              }}
              imageStyle={{ borderRadius: 30 }}
            >
              {followUser.isEmployer && (
                <View
                  style={{
                    backgroundColor: "#ff914d",
                    borderRadius: 20,
                    alignItems: "center",
                    position: "absolute",
                    alignSelf: "flex-end",
                    bottom: 0,
                    padding: 4,
                  }}
                >
                  <Ionicons
                    name={"briefcase"}
                    size={8}
                    color={colors.primaryText}
                  />
                </View>
              )}
              {followUser.isEmployee && (
                <View
                  style={{
                    backgroundColor: "#3da4e3",
                    borderRadius: 20,
                    alignItems: "center",
                    position: "absolute",
                    alignSelf: "flex-end",
                    bottom: 0,
                    padding: 4,
                    right: followUser.isEmployer ? 14 : 0,
                  }}
                >
                  <Ionicons
                    name={"business"}
                    size={8}
                    color={colors.primaryText}
                  />
                </View>
              )}
            </ImageBackground>
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
        ) : (
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
            onPress={() =>
              navigation.navigate("ViewUserProfile", {
                id: followUser._id,
              })
            }
          >
            <ImageBackground
              source={{
                uri: `${api}/upload/${followUser.profile}`,
              }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 30,
              }}
              imageStyle={{ borderRadius: 30 }}
            >
              {followUser.isEmployer && (
                <View
                  style={{
                    backgroundColor: "#ff914d",
                    borderRadius: 20,
                    alignItems: "center",
                    position: "absolute",
                    alignSelf: "flex-end",
                    bottom: 0,
                    padding: 4,
                  }}
                >
                  <Ionicons
                    name={"briefcase"}
                    size={8}
                    color={colors.primaryText}
                  />
                </View>
              )}
              {followUser.isEmployee && (
                <View
                  style={{
                    backgroundColor: "#3da4e3",
                    borderRadius: 20,
                    alignItems: "center",
                    position: "absolute",
                    alignSelf: "flex-end",
                    bottom: 0,
                    padding: 4,
                    right: followUser.isEmployer ? 14 : 0,
                  }}
                >
                  <Ionicons
                    name={"business"}
                    size={8}
                    color={colors.primaryText}
                  />
                </View>
              )}
            </ImageBackground>
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
        )}

        <TouchableOpacity
          style={{
            backgroundColor: !follow ? "#FFB6C1" : null,
            marginHorizontal: 5,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: colors.border,
            width: "25%",
            alignContent: "center",
            height: "80%",
          }}
          onPress={onFollow}
        >
          <View
            style={{
              flexDirection: "row",
              top: 5,
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <AntDesign
              name={follow ? "deleteuser" : "adduser"}
              size={24}
              color={!follow ? colors.border : colors.primaryText}
            />
            <Text
              style={{
                textAlign: "center",

                color: !follow ? colors.border : colors.primaryText,
              }}
            >
              {" "}
              {follow ? "??????????????" : "??????????"}
            </Text>
          </View>
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
