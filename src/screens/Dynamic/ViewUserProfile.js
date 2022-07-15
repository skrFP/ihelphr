import { SafeAreaView, ScrollView, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useTheme } from "@react-navigation/native";
import useUserProfile from "../../hooks/ProfileDetail/User/useUserProfile";
import useCv from "../../hooks/ProfileDetail/User/useCv";
import UserProfileTop from "../../components/Dynamic/User/UserProfileTop";
import UserProfileAbout from "../../components/Dynamic/User/UserProfileAbout";
import UserProfileExperience from "../../components/Dynamic/User/UserProfileExperience";
import UserProfileCourse from "../../components/Dynamic/User/UserProfileCourse";
import Header from "../../components/Header/Header";
import Border from "../../components/Border";
import axios from "axios";
import { api } from "../../../Constants";
import Posts from "../../components/Network/Posts";
const ViewUserProfile = (props) => {
  const { id } = props.route.params;
  const [userProfile, profileLoading] = useUserProfile(id);
  const [cv, cvLoading] = useCv(id);
  const { colors } = useTheme();
  const [activityData, setActivityData] = useState([]);

  const getActivityData = () => {
    axios
      .get(`${api}/api/v1/posts/${id}/user`)
      .then((res) => {
        setActivityData(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err.response, "aaa1");
      });
  };

  useEffect(() => {
    getActivityData();
  }, []);
  if (!cv || !userProfile) {
    return null;
  }
  return (
    <SafeAreaView style={{ backgroundColor: colors.header }}>
      {/* Header */}
      <Header isBack={true} />
      {/* ProfileDetails */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Cover && Profile && Wallet && FirstName && Anket && setting && follower counts */}
        <UserProfileTop
          userProfile={userProfile}
          isFollowing={userProfile.isFollowing}
        />
        <View style={{ bottom: 10 }}>
          <UserProfileAbout about={userProfile.about} />
          <Border />
          {cv.experience.length > 0 && (
            <UserProfileExperience data={cv.experience} />
          )}
          {cv.course.length > 0 && <UserProfileCourse data={cv.course} />}
          <Text
            style={{
              color: colors.primaryText,
              marginHorizontal: 10,
              fontFamily: "Sf-bold",
              fontSize: 20,
            }}
          >
            Оруулсан нийтлэл
          </Text>
          {activityData &&
            activityData.map((item) => {
              return (
                <View key={item._id} style={{}}>
                  {item.createUser && (
                    <Posts
                      postId={item._id}
                      createUser={item.createUser}
                      createdAt={item.createdAt}
                      body={item.body}
                      photo={item.photo}
                      isShared={item.isShare}
                      sharedUser={item.sharePost && item.sharePost.createUser}
                      sharedCreatedAt={
                        item.sharePost && item.sharePost.createdAt
                      }
                      sharedBody={item.sharePost && item.sharePost.body}
                      sharedPhoto={item.sharePost && item.sharePost.photo}
                      likeCount={item.like}
                      commentCount={item.comment}
                      shareCount={item.share}
                      isLiked={item.isLiked}
                      isCompany={item.createUser.organization}
                      isBoost={item.isBoost}
                    />
                  )}
                </View>
              );
            })}
        </View>
        <View style={{ marginBottom: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ViewUserProfile;
