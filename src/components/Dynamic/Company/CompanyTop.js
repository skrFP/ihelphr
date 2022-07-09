import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { api } from "../../../../Constants";
import axios from "axios";

const fullWidth = Dimensions.get("screen").width;
const fullHeight = Dimensions.get("screen").height;
const CompanyTop = (props) => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const {
    cover,
    profile,
    name,
    category,
    jobCount,
    followerCount,
    followingCount,
    isFollow,
    data,
    id,
  } = props;
  const [following, setFollowing] = useState(isFollow);
  const onFollow = () => {
    if (following) {
      setFollowing(false);
      axios
        .delete(`${api}/api/v1/follows/${id}`)
        .then((res) => {
          Alert.alert("Амжилттай дагахаа болилоо");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setFollowing(true);
      axios
        .post(`${api}/api/v1/follows/${id}`)
        .then((res) => {
          Alert.alert("Амжилттай дагалаа");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <>
      {/* Cover */}
      <Image
        source={{ uri: `${api}/upload/${cover}` }}
        style={{ width: fullWidth, height: fullHeight / 4 }}
      />
      {/* Profile pic, and wallet */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          bottom: 65,
          alignItems: "center",
        }}
      >
        {/* Pro pic and Name category */}
        <View
          style={{
            flexDirection: "row",
            padding: 20,
            alignItems: "center",
            right: 10,
          }}
        >
          {/* Propic */}
          <Image
            source={{ uri: `${api}/upload/${profile}` }}
            style={{
              width: 90,
              height: 90,
              top: 0,
              borderRadius: 50,
            }}
          />
          <View style={{ marginLeft: 1, top: 28 }}>
            <Text
              style={{
                color: colors.primaryText,
                fontWeight: "bold",
                fontSize: 18,
              }}
            >
              {name}
            </Text>
            <Text
              style={{
                color: colors.secondaryText,
                textAlign: "justify",
              }}
            >
              {category}
            </Text>
          </View>
        </View>
      </View>
      <View style={{ bottom: 50 }}>
        {/* Profile Edit and setting */}
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            marginHorizontal: 5,
            justifyContent: "space-around",
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "#FFB6C1",
              marginHorizontal: 5,
              paddingVertical: 2,
              alignItems: "center",
              borderRadius: 10,
              flex: 0.66,
            }}
            onPress={() =>
              navigation.navigate("CompanyProfileEdit", { data: data })
            }
          >
            {/* Профайл янзлах */}
            <View style={{ flexDirection: "row", alignSelf: "center" }}>
              <MaterialCommunityIcons
                name="cube-send"
                size={24}
                color={colors.border}
                style={{ top: 5 }}
              />
              <Text
                style={{
                  textAlign: "center",
                  top: 8,
                  color: colors.border,
                  right: 5,
                }}
              >
                {" "}
                Ажлын санал илгээх{"   "}
              </Text>
            </View>
          </TouchableOpacity>
          {/* Тохиргоо */}
          <TouchableOpacity
            style={{
              backgroundColor: "#FFB6C1",
              marginHorizontal: 5,
              paddingVertical: 8,
              borderRadius: 10,
              flex: 0.34,
            }}
            onPress={onFollow}
          >
            <View style={{ flexDirection: "row", alignSelf: "center" }}>
              <AntDesign
                name={following ? "deleteuser" : "adduser"}
                size={24}
                color={colors.border}
              />
              <Text
                style={{ textAlign: "center", top: 3, color: colors.border }}
              >
                {" "}
                {following ? "Дагахгүй" : "Дагах"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* Follower Following Jobs */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginVertical: 14,
            marginRight: 6,
          }}
        >
          <TouchableOpacity
            style={{
              alignItems: "center",
            }}
          >
            <Text style={{ color: colors.primaryText }}>{jobCount}</Text>
            <Text
              style={{
                color: colors.primaryText,
                fontFamily: "Sf-thin",
                marginTop: 5,
              }}
            >
              Ажлын зар
            </Text>
          </TouchableOpacity>
          <View
            style={{ padding: 0.2, backgroundColor: colors.secondaryText }}
          />
          <TouchableOpacity
            style={{
              alignItems: "center",
            }}
            onPress={() => navigation.navigate("ViewUserFollower", { id: id })}
          >
            <Text style={{ color: colors.primaryText }}>{followerCount}</Text>
            <Text
              style={{
                color: colors.primaryText,
                fontFamily: "Sf-thin",
                marginTop: 5,
              }}
            >
              Дагагч
            </Text>
          </TouchableOpacity>
          <View
            style={{ padding: 0.2, backgroundColor: colors.secondaryText }}
          />
          <TouchableOpacity
            style={{
              alignItems: "center",
            }}
            onPress={() =>
              navigation.navigate("ViewUserFollowings", { id: id })
            }
          >
            <Text style={{ color: colors.primaryText }}>{followingCount}</Text>
            <Text
              style={{
                color: colors.primaryText,
                fontFamily: "Sf-thin",
                marginTop: 5,
              }}
            >
              Дагсан
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default CompanyTop;

const styles = StyleSheet.create({});
