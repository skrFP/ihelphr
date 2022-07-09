import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useState, useContext } from "react";
import { api } from "../../../Constants";
import moment from "moment";
import "moment/locale/mn";
import axios from "axios";
import { useNavigation, useTheme } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import UserContext from "../../context/UserContext";
const fullWidth = Dimensions.get("screen").width;
const Posts = (props) => {
  const {
    postId,
    createUser,
    body,
    photo,
    isShared,
    sharedUser,
    createdAt,
    sharedCreatedAt,
    sharedBody,
    sharedPhoto,
    likeCount,
    commentCount,
    shareCount,
    isLiked,
    isCompany,
    isBoost,
  } = props;
  // Like unlike func
  const [liked, setLiked] = useState(isLiked);
  const state = useContext(UserContext);
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [counter, setCounter] = useState(likeCount);
  const onLike = () => {
    if (liked) {
      setLiked(false);
      axios
        .delete(`${api}/api/v1/likes/${postId}`)
        .then((res) => {
          // alert("Unlike hiilee");
          setCounter(counter - 1);
        })
        .catch((err) => {
          alert(err.response.data);
        });
    } else {
      setLiked(true);
      axios
        .post(`${api}/api/v1/likes/${postId}`)
        .then((res) => {
          // alert("Like darlaa");
          setCounter(counter + 1);
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  return (
    <>
      {/* Shared user */}

      {isShared && (
        <>
          <View
            style={{
              flex: 1,
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() =>
                isCompany
                  ? navigation.navigate("ViewProfileProfile", {
                      id: createUser._id,
                    })
                  : navigation.navigate("ViewUserProfile", {
                      id: createUser._id,
                    })
              }
              style={{
                flexDirection: "row",
                alignItems: "center",
                // marginHorizontal: data.isShare ? 0 : 10,
                marginLeft: 10,
                marginTop: 10,
              }}
            >
              <ImageBackground
                source={{
                  uri: `${api}/upload/${createUser.profile}`,
                }}
                style={{ width: 50, height: 50 }}
                imageStyle={{ borderRadius: 50 }}
              >
                <Image
                  style={{ width: 54, height: 54, bottom: 2, right: 2 }}
                  source={
                    createUser.status === "lookingForJob"
                      ? require("../../../assets/looking.png")
                      : createUser.status === "opentowork"
                      ? require("../../../assets/open.png")
                      : createUser.status === "getEmployee"
                      ? require("../../../assets/hiring.png")
                      : null
                  }
                />
              </ImageBackground>
              <View style={{ marginLeft: 10 }}>
                <Text style={{ fontWeight: "bold", color: colors.primaryText }}>
                  {createUser.lastName} {createUser.firstName}{" "}
                </Text>
                <Text style={{ color: colors.secondaryText }}>
                  {createUser.profession}{" "}
                  {createUser.workingCompany && `@${createUser.workingCompany}`}
                </Text>
                <Text
                  style={{
                    color: colors.secondaryText,
                    fontFamily: "Sf-thin",
                  }}
                >
                  {moment(createdAt).fromNow()}
                </Text>
              </View>
            </TouchableOpacity>
            {/* Post setting ooriin */}
            {!isShared ? null : createUser._id === state.userId ? (
              <TouchableOpacity
                style={{}}
                onPress={() =>
                  navigation.navigate("PostSettings", { id: postId })
                }
              >
                <Entypo
                  name="dots-three-horizontal"
                  size={24}
                  color="white"
                  style={{ marginRight: 10 }}
                />
              </TouchableOpacity>
            ) : null}
          </View>
          <Text
            style={{ margin: 5, color: colors.primaryText, marginLeft: 10 }}
          >
            {" "}
            {body}{" "}
          </Text>
        </>
      )}
      {/* User Post */}
      <View style={{ marginTop: !isShared && 10 }}>
        {/* User detail and body and photos */}
        <View
          style={{
            marginHorizontal: isShared ? 20 : 0,
            borderWidth: isShared ? 0.3 : 0,
            borderColor: colors.border,
          }}
        >
          {/* isShared true false aaraa sharelesen zar uguin ylgaa garna */}
          {/* End hereglegchiin medeelel */}
          <View
            style={{
              flex: 1,
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
                marginTop: 10,
              }}
              onPress={() =>
                isCompany
                  ? navigation.navigate("ViewCompanyProfile", {
                      id: isShared ? sharedUser._id : createUser._id,
                    })
                  : navigation.navigate("ViewUserProfile", {
                      id: isShared ? sharedUser._id : createUser._id,
                    })
              }
            >
              <ImageBackground
                source={{
                  uri: `${api}/upload/${
                    isShared ? sharedUser.profile : createUser.profile
                  }`,
                }}
                style={{ width: 50, height: 50 }}
                imageStyle={{ borderRadius: 50 }}
              >
                <Image
                  style={{ width: 54, height: 54, bottom: 2, right: 2 }}
                  source={
                    createUser.status === "lookingForJob"
                      ? require("../../../assets/looking.png")
                      : createUser.status === "opentowork"
                      ? require("../../../assets/open.png")
                      : createUser.status === "getEmployee"
                      ? require("../../../assets/hiring.png")
                      : null
                  }
                />
              </ImageBackground>
              <View style={{ marginLeft: 10 }}>
                <Text style={{ fontWeight: "bold", color: colors.primaryText }}>
                  {isShared ? sharedUser.lastName : createUser.lastName}{" "}
                  {isShared ? sharedUser.firstName : createUser.firstName}{" "}
                </Text>
                {isBoost ? (
                  <>
                    <Text
                      style={{
                        color: colors.secondaryText,
                      }}
                    >
                      Sponsored
                    </Text>
                    <Text> {createUser.profession} </Text>
                  </>
                ) : (
                  <>
                    <Text
                      style={{
                        color: colors.secondaryText,
                      }}
                    >
                      {isShared ? (
                        <Text>
                          {sharedUser.profession}{" "}
                          {sharedUser.workingCompany &&
                            `@${sharedUser.workingCompany}`}
                        </Text>
                      ) : (
                        <Text>
                          {createUser.profession}{" "}
                          {createUser.workingCompany &&
                            `@${createUser.workingCompany}`}
                        </Text>
                      )}
                    </Text>
                    <Text
                      style={{
                        color: colors.secondaryText,
                        fontFamily: "Sf-thin",
                      }}
                    >
                      {moment(isShared ? sharedCreatedAt : createdAt).fromNow()}
                    </Text>
                  </>
                )}
              </View>
            </TouchableOpacity>
            {/* Post settings ooriin*/}
            {isShared ? null : createUser._id === state.userId ? (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("PostSettings", { id: postId })
                }
              >
                <Entypo
                  name="dots-three-horizontal"
                  size={24}
                  color="white"
                  style={{ marginRight: 10 }}
                />
              </TouchableOpacity>
            ) : null}
          </View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("NetworkingPostDetailScreen", {
                id: postId,
              })
            }
          >
            {/* Body text */}
            {body ? (
              <Text style={{ margin: 10, color: colors.primaryText }}>
                {" "}
                {isShared ? sharedBody : body}{" "}
              </Text>
            ) : (
              <View style={{ margin: 10 }} />
            )}
            {/* unshared Zurag */}
            {photo && (
              <>
                <Image
                  source={{
                    uri: `${api}/upload/${photo}`,
                  }}
                  style={{ width: fullWidth, height: 350 }}
                />
                <View
                  style={{
                    margin: 10,
                    borderColor: colors.border,
                  }}
                />
              </>
            )}
            {/* shared photo */}
            {sharedPhoto && (
              <>
                <Image
                  source={{
                    uri: `${api}/upload/${sharedPhoto}`,
                  }}
                  style={{
                    width: fullWidth,
                    height: 350,
                    alignSelf: "center",
                  }}
                />
                <View
                  style={{
                    margin: 10,
                  }}
                />
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>
      {/* Like counts share counts comment counts */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 20,
          marginTop: isShared ? 20 : 0,
        }}
      >
        <Text
          style={{
            color: colors.primaryText,
            fontFamily: "Sf-thin",
            fontSize: 12,
          }}
        >
          {counter + " Таалагдсан"}
        </Text>
        <Text
          style={{
            marginHorizontal: 20,
            color: colors.primaryText,
            fontFamily: "Sf-thin",
            fontSize: 12,
          }}
        >
          {commentCount + " Сэтгэгдэл"}
        </Text>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              color: colors.primaryText,
              fontFamily: "Sf-thin",
              fontSize: 12,
            }}
          >
            {shareCount + " Хуваалцсан"}
          </Text>
        </View>
      </View>
      {/* Line */}
      <View
        style={{
          borderWidth: 0.5,
          borderColor: colors.border,
          marginVertical: 10,
          marginHorizontal: 10,
        }}
      />
      {/* Like share comment do it */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={onLike}
        >
          <MaterialCommunityIcons
            name={liked ? "heart-multiple" : "heart-multiple-outline"}
            size={24}
            color={liked ? "#FFB6C1" : colors.primaryText}
          />

          <Text style={{ color: colors.secondaryText, marginLeft: 5 }}>
            {liked ? "Таалагдлаа" : "Таалагдлаа"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={() =>
            navigation.navigate("PostDetailScreen", { id: postId })
          }
        >
          <MaterialCommunityIcons
            name="comment-text-multiple-outline"
            size={24}
            color={colors.primaryText}
          />
          <Text style={{ color: colors.secondaryText, marginLeft: 5 }}>
            Сэтгэгдэл
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("SharePostModal", { id: postId })}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <MaterialCommunityIcons
            name="share-all-outline"
            size={24}
            color={colors.primaryText}
          />
          <Text style={{ color: colors.secondaryText, marginLeft: 5 }}>
            Хуваалцах
          </Text>
        </TouchableOpacity>
      </View>
      {/* Line */}
      <View
        style={{
          marginTop: 10,
          borderColor: colors.border,
          marginHorizontal: 10,
        }}
      />
      {/* Zuraas  */}
      <View style={{ backgroundColor: colors.border, paddingVertical: 2 }} />
    </>
  );
};

export default Posts;

const styles = StyleSheet.create({});