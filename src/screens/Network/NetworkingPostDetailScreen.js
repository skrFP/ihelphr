import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigation, useTheme } from "@react-navigation/native";
import moment from "moment";
import "moment/locale/mn";
import AntDesign from "@expo/vector-icons/AntDesign";
import { ScrollView } from "react-native-gesture-handler";
const fullWidth = Dimensions.get("screen").width;
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { api } from "../../../Constants";
import NetworkingTextInput from "../../components/NetworkingTextInput";
const NetworkingPostDetailScreen = (props) => {
  const { id, isLike } = props.route.params;
  const navigation = useNavigation();
  const [postDetail, setPostDetail] = useState([]);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    const loadData = () => {
      axios
        .get(`${api}/api/v1/posts/${id}`)
        .then((res) => {
          setPostDetail(res.data.data);
        })
        .catch((err) => {
          alert(err);
        });
    };

    loadData();
  }, []);
  const [commentData, setCommentData] = useState([]);
  useEffect(() => {
    setRefresh(false);
    let source = axios.CancelToken.source();
    const loadComment = () => {
      axios
        .get(`${api}/api/v1/comments/${id}/post?sort=-createdAt`, {
          cancelToken: source.token,
        })
        .then((res) => {
          setCommentData(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    loadComment();
    return () => {
      source.cancel();
    };
  }, [refresh]);
  const [commentText, setCommentText] = useState("");
  const postComment = () => {
    setRefresh(false);
    axios
      .post(`${api}/api/v1/comments/${id}`, { description: commentText })
      .then((res) => {
        setRefresh(true);
      })
      .catch((err) => {
        alert(err);
      });
  };
  const [liked, setLiked] = useState(isLike);

  const onLike = () => {
    if (liked) {
      setLiked(false);
      axios.delete(`${api}/api/v1/likes/${id}`);
    } else {
      setLiked(true);
      axios
        .post(`${api}/api/v1/likes/${id}`)
        .then((res) => {})
        .catch((err) => {
          alert(err);
        });
    }
  };

  if (!postDetail) {
    return null;
  }

  const { colors } = useTheme();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{
        flex: 1,
      }}
    >
      <View style={{ height: 113 }}>
        {postDetail.sharePost ? (
          <View
            style={{
              flexDirection: "row",
              marginTop: 50,
              marginHorizontal: 10,
            }}
          >
            {postDetail.createUser && (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <AntDesign
                  name="left"
                  size={24}
                  color="white"
                  onPress={() => navigation.goBack()}
                />
                <Image
                  source={{
                    uri: `${api}/upload/${postDetail.createUser.profile}`,
                  }}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    marginLeft: 10,
                    marginRight: 10,
                  }}
                />
                <View>
                  <Text
                    style={{ color: colors.primaryText, fontWeight: "bold" }}
                  >
                    {postDetail.createUser.lastName}{" "}
                    {postDetail.createUser.firstName}
                  </Text>
                  <Text style={{ color: colors.secondaryText }}>
                    {postDetail.createUser.profession}{" "}
                    {`@${postDetail.createUser.workingCompany}`}
                  </Text>
                  <Text
                    style={{
                      color: colors.secondaryText,
                      fontFamily: "Sf-thin",
                    }}
                  >
                    {moment(postDetail.createdAt).fromNow()}
                  </Text>
                </View>
              </View>
            )}
          </View>
        ) : (
          <View
            style={{
              flexDirection: "row",
              marginTop: 50,
              marginHorizontal: 10,
            }}
          >
            {postDetail.createUser && (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <AntDesign
                  name="left"
                  size={24}
                  color="white"
                  onPress={() => navigation.goBack()}
                />
                <TouchableOpacity
                  style={{ flexDirection: "row", alignItems: "center" }}
                  onPress={() =>
                    navigation.navigate("ViewUserProfile", {
                      id: postDetail.createUser._id,
                    })
                  }
                >
                  <Image
                    source={{
                      uri: `${api}/upload/${postDetail.createUser.profile}`,
                    }}
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 50,
                      marginLeft: 10,
                      marginRight: 10,
                    }}
                  />
                  <View>
                    <Text
                      style={{ color: colors.primaryText, fontWeight: "bold" }}
                    >
                      {postDetail.createUser.lastName}{" "}
                      {postDetail.createUser.firstName}
                    </Text>
                    <Text style={{ color: colors.secondaryText }}>
                      {postDetail.createUser.profession}{" "}
                      {`@${postDetail.createUser.workingCompany}`}
                    </Text>
                    <Text
                      style={{
                        color: colors.secondaryText,
                        fontFamily: "Sf-thin",
                      }}
                    >
                      {moment(postDetail.createdAt).fromNow()}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      </View>
      <ScrollView>
        {/* Middle content */}
        <View style={{ marginTop: postDetail.isShare && 10 }}>
          {/* User detail and body and photos */}
          <View
            style={{
              marginHorizontal: postDetail.isShare ? 10 : 0,
              borderWidth: postDetail.isShare ? 1 : 0,
              borderColor: colors.border,
            }}
          >
            {/* postDetail.isShare true false aaraa sharelesen zar uguin ylgaa garna */}
            {/* End hereglegchiin medeelel */}
            {postDetail.sharePost && postDetail.createUser && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginLeft: 10,
                  marginTop: 10,
                }}
              >
                <Image
                  source={{
                    uri: `${api}/upload/${
                      postDetail.isShare
                        ? postDetail.sharePost.createUser.profile
                        : postDetail.createUser.profile
                    }`,
                  }}
                  style={{ width: 50, height: 50, borderRadius: 50 }}
                />
                <View style={{ marginLeft: 10 }}>
                  <Text
                    style={{ fontWeight: "bold", color: colors.primaryText }}
                  >
                    {postDetail.isShare
                      ? postDetail.sharePost.createUser.lastName
                      : postDetail.createUser.lastName}{" "}
                    {postDetail.isShare
                      ? postDetail.sharePost.createUser.firstName
                      : postDetail.createUser.firstName}{" "}
                  </Text>
                  <Text style={{ color: colors.secondaryText }}>
                    {postDetail.isShare
                      ? postDetail.sharePost.createUser.profession
                      : postDetail.createUser.profession}
                    {postDetail.isShare
                      ? `@${postDetail.sharePost.createUser.workingCompany}`
                      : `@${postDetail.createUser.workingCompany}`}
                  </Text>
                  <Text
                    style={{
                      color: colors.secondaryText,
                      fontFamily: "Sf-thin",
                    }}
                  >
                    {moment(
                      postDetail.isShare
                        ? postDetail.sharePost.createdAt
                        : postDetail.createdAt
                    ).fromNow()}
                  </Text>
                  {/* {data.isBoost ? <Text>Boosted</Text> : <Text>Not boosted</Text>} */}
                </View>
              </View>
            )}

            {/* Body text */}

            {postDetail.body ? (
              <Text style={{ margin: 10, color: colors.primaryText }}>
                {postDetail.isShare
                  ? postDetail.sharePost && postDetail.sharePost.body
                  : postDetail.body}
              </Text>
            ) : (
              <View style={{ margin: 10 }} />
            )}
            {/* unshared Zurag */}
            {postDetail.photo && (
              <>
                <Image
                  source={{
                    uri: `${api}/upload/${postDetail.photo}`,
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
            {postDetail.sharePost && (
              <>
                {postDetail.sharePost.photo && (
                  <Image
                    source={{
                      uri: `${api}/upload/${postDetail.sharePost.photo}`,
                    }}
                    style={{
                      width: fullWidth,
                      height: 350,
                      alignSelf: "center",
                    }}
                  />
                )}

                <View
                  style={{
                    margin: 10,
                  }}
                />
              </>
            )}
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 20,
            // marginTop: isShared ? 20 : 0,
          }}
        >
          <Text
            style={{
              color: colors.primaryText,
              fontFamily: "Sf-thin",
              fontSize: 12,
            }}
          >
            {postDetail.like + " ????????????????????"}
          </Text>
          <Text
            style={{
              marginHorizontal: 20,
              color: colors.primaryText,
              fontFamily: "Sf-thin",
              fontSize: 12,
            }}
          >
            {postDetail.like + " ??????????????????"}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                color: colors.primaryText,
                fontFamily: "Sf-thin",
                fontSize: 12,
              }}
            >
              {postDetail.like + " ????????????????????"}
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
            // marginTop: postDetail.isShare ? 20 : 0,
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
              {liked ? "????????????????????" : "????????????????????"}
            </Text>
          </TouchableOpacity>
          <View style={{ flexDirection: "row" }}>
            <MaterialCommunityIcons
              name="comment-text-multiple-outline"
              size={24}
              color={colors.primaryText}
            />
            <Text style={{ color: colors.secondaryText, marginLeft: 5 }}>
              ??????????????????
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("ShareModalScreen", { id: id })}
            style={{ flexDirection: "row" }}
          >
            <MaterialCommunityIcons
              name="share-all-outline"
              size={24}
              color={colors.primaryText}
            />
            <Text style={{ color: colors.secondaryText, marginLeft: 5 }}>
              ??????????????????
            </Text>
          </TouchableOpacity>
        </View>
        {/* Line */}
        <View
          style={{
            borderWidth: 0.5,
            borderColor: colors.border,
            marginVertical: 10,
            marginHorizontal: 10,
            // marginTop: postDetail.isShare ? 20 : 0,
          }}
        />
        {postDetail.share > 0 && (
          <View style={{ margin: 10 }}>
            <Text style={{ color: colors.primaryText, fontWeight: "bold" }}>
              {postDetail.share} ????????????????????
            </Text>
          </View>
        )}

        {commentData.map((e) => {
          return (
            <View key={e._id} style={{ width: fullWidth }}>
              {e.createUser && (
                <View
                  style={{
                    flexDirection: "row",
                    marginVertical: 5,
                    width: fullWidth,
                    marginHorizontal: 10,
                  }}
                >
                  <Image
                    source={{ uri: `${api}/upload/${e.createUser.profile}` }}
                    style={{ width: 50, height: 50, borderRadius: 50 }}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: fullWidth / 1.26,
                      backgroundColor: colors.border,
                      borderRadius: 10,
                      marginLeft: 10,
                      padding: 10,
                    }}
                  >
                    <View>
                      <Text style={{ color: colors.primaryText }}>
                        {e.createUser.lastName} {e.createUser.firstName}
                      </Text>
                      <Text style={{ color: colors.secondaryText }}>
                        {e.description}
                      </Text>
                    </View>
                    <Text
                      style={{
                        color: colors.secondaryText,
                        width: 60,
                        textAlign: "center",
                        fontFamily: "Sf-thin",
                        fontSize: 10,
                      }}
                    >
                      {moment(e.createdAt).fromNow()}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
      <NetworkingTextInput
        value={commentText}
        onChangeText={setCommentText}
        onPress={postComment}
      />
    </KeyboardAvoidingView>
  );
};

export default NetworkingPostDetailScreen;

const styles = StyleSheet.create({});
