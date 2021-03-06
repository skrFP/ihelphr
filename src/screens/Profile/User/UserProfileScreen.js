import { SafeAreaView, ScrollView, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import Feather from "@expo/vector-icons/Feather";
import UserContext from "../../../context/UserContext";
import useUserProfile from "../../../hooks/ProfileDetail/User/useUserProfile";
import { useNavigation, useTheme } from "@react-navigation/native";
import useCv from "../../../hooks/ProfileDetail/User/useCv";
import ProfileHeader from "../../../components/Header/ProfileHeader";
import UserProfileTop from "../../../components/Profile/User/UserProfileTop";
import UserProfileAbout from "../../../components/Profile/User/UserProfileAbout";
import UserProfileExperience from "../../../components/Profile/User/UserProfileExperience";
import UserProfileCourse from "../../../components/Profile/User/UserProfileCourse";
import Border from "../../../components/Border";
import EmptyStatus from "../../../components/Profile/User/Empty/EmptyStatus";
import EmptyData from "../../../components/Profile/User/Empty/EmptyData";
import { api } from "../../../../Constants";
import Posts from "../../../components/Network/Posts";
import UserPortf from "../../../components/Profile/User/CompanyPortf";
const UserProfileScreen = () => {
  const state = useContext(UserContext);
  const navigation = useNavigation();
  const [userProfile] = useUserProfile(state.userId);
  const [cv] = useCv(state.userId);
  const { colors } = useTheme();
  const [activityData, setActivityData] = useState([]);
  useEffect(() => {
    getActivityData();
  }, []);
  const getActivityData = () => {
    axios
      .get(`${api}/api/v1/posts/cv`)
      .then((res) => {
        setActivityData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  if (!cv || !userProfile) {
    return null;
  }
  return (
    <SafeAreaView style={{ backgroundColor: colors.header }}>
      {/* Header */}
      <ProfileHeader
        notificationCount={userProfile.notification}
        firstName={userProfile.firstName}
        lastName={userProfile.lastName}
      />
      {/* ProfileDetails */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Cover && Profile && Wallet && FirstName && Anket && setting && follower counts */}
        {/* {profileLoading && <Spinner />} */}
        <UserProfileTop userProfile={userProfile} cv={cv} />
        <View style={{ bottom: 10 }}>
          {userProfile.profession === "" && <EmptyStatus />}
          <UserProfileAbout about={userProfile.about} />
          <Border />
          {cv.experience.length === 0 ? (
            <EmptyData
              title={"T??????????????"}
              inTitle={"?????????? ?????????????????"}
              description={
                "???? ?????????? ?????????????????? ???????????????????? ???????? ???????????? ???????? ???????????????? ?????????????????? ??????????????????"
              }
              icon={"bar-chart-outline"}
              id={userProfile._id}
              screenDetail={"CvCreateScreen"}
            />
          ) : (
            <UserProfileExperience data={cv.experience} />
          )}
          {cv.course.length === 0 ? (
            <>
              <Border />
              <EmptyData
                title={"??????????????????"}
                inTitle={"???????????????????"}
                description={
                  "???? ???????????? ?????????????????????? ???????????? ???????????????? ???????????????????? ?????????? ???????????????? ???????????????? ??????????????????"
                }
                icon={"school-outline"}
                id={userProfile._id}
                screenDetail={"CvCreateScreen"}
              />
            </>
          ) : (
            <UserProfileCourse data={cv.course} />
          )}
          {/* <UserPortf
            image1={userProfile.portfolio.image1}
            image2={userProfile.portfolio.image2}
            image3={userProfile.portfolio.image3}
            image4={userProfile.portfolio.image4}
            image5={userProfile.portfolio.image5}
            image6={userProfile.portfolio.image6}
          /> */}
          {activityData.map((item) => {
            return (
              <>
                <View key={item._id} style={{}}>
                  <Text
                    style={{
                      color: colors.primaryText,
                      marginHorizontal: 10,
                      fontFamily: "Sf-bold",
                      fontSize: 20,
                    }}
                  >
                    ???????????????? ??????????????
                  </Text>

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
              </>
            );
          })}
        </View>
        <View style={{ marginBottom: 100 }} />
      </ScrollView>
      <LinearGradient
        colors={["#3A1C71", "#D76D77", "#FFAF7B"]}
        start={[0.0, 0.5]}
        end={[1.0, 0.5]}
        style={{
          position: "absolute",
          bottom: 60,
          alignSelf: "flex-end",
          right: 10,
          padding: 1,
          borderRadius: 34,
          opacity: 0.8,
        }}
      >
        <Feather
          name="plus"
          size={64}
          color="white"
          onPress={() => navigation.navigate("AddPostScreen")}
        />
      </LinearGradient>
    </SafeAreaView>
  );
};

export default UserProfileScreen;
