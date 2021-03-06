import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CompanyProfileScreen from "../screens/Profile/Company/CompanyProfileScreen";
import UserProfileScreen from "../screens/Profile/User/UserProfileScreen";
import WalletScreen from "../screens/Profile/User/Wallet/WalletScreen";
import SendMoneyScreen from "../screens/Profile/User/Wallet/SendMoneyScreen";
import QpayModal from "../screens/Profile/User/Wallet/QpayModals";
import MyBackButton from "../components/Header/MyBackButton";
import CreateCvScreen from "../screens/Profile/User/Edit/CreateCvScreen";
import PersonalDetailModal from "../screens/Profile/User/Edit/PersonalDetailModal";
import AchievmentAddModal from "../screens/Profile/User/Edit/AchievmentAddModal";
import AchievmentDetailModal from "../screens/Profile/User/Edit/AchievmentDetailModal";
import CourseAddModal from "../screens/Profile/User/Edit/CourseAddModal";
import CourseDetailModal from "../screens/Profile/User/Edit/CourseDetailModal";
import UserSettingsScreen from "../screens/Profile/User/Settings/UserSettingScreen";
import EditStatusModal from "../screens/Profile/User/EditCoverStatus/EditStatusModal";
import ProfilePictureView from "../screens/Profile/User/EditCoverStatus/ProfilePictureView";
import ProfilePictureFrame from "../screens/Profile/User/EditCoverStatus/ProfilePictureFrame";
import UserActivityModal from "../screens/Profile/User/Settings/UserActivityModal";
import UserRecievedJob from "../screens/Profile/User/Settings/UserRecievedJob";
import UserSendWorkHistory from "../screens/Profile/User/Settings/UserSendWorkHistory";
import UserSavedWork from "../screens/Profile/User/Settings/UserSavedWork";
import UserWorkDetail from "../screens/Profile/User/Settings/UserWorkDetail";
import EditCoverModal from "../screens/Profile/User/EditCoverStatus/EditCoverModal";
import UserContext from "../context/UserContext";
import CompanyProfilePicture from "../screens/Profile/Company/CompanyEditCoverProfile/CompanyProfilePicture";
import EditCompanyCover from "../screens/Profile/Company/CompanyEditCoverProfile/EditCompanyCover";
import EditCompanyStatus from "../screens/Profile/Company/CompanyEditCoverProfile/EditCompanyStatus";
import CompanyProfileEdit from "../screens/Profile/Company/CompanyProfileEdit";
import CompanySettingModal from "../screens/Profile/Company/CompanySetting/CompanySettingModal";
import CompanyCreatedWork from "../screens/Profile/Company/CompanySetting/CompanyCreateWork";
import CompanyUsedProduct from "../screens/Profile/Company/CompanySetting/CompanyUsedProduct";
import CompanyRecievedCv from "../screens/Profile/Company/CompanySetting/CompanyRecievedCv";
import PointUseScreen from "../screens/Profile/User/Wallet/PointUseScreen";
import ProductUsePoint from "../screens/Profile/User/Wallet/ProductUsePoint";
import BoostPost from "../screens/Profile/User/Wallet/BoostPost";
import ViewUserFollowings from "../screens/Dynamic/ViewUserFollowings";
import ViewUserFollower from "../screens/Dynamic/ViewUserFollower";
import ChangeAccountModal from "../screens/Profile/ChangeAccountModal";
import { useTheme } from "@react-navigation/native";
import PersonLoginScreen from "../screens/Auth/PersonLoginScreen";
import ChangeCompanyLogin from "../screens/Profile/ChangeAccount/ChangeCompanyLogin";
import CoursePackageModal from "../screens/Profile/User/Edit/CoursePackageModal";
import ExperiencePackageModal from "../screens/Profile/User/Edit/ExperiencePackageModal";
import FamilyAddModal from "../screens/Profile/User/Edit/FamilyAddModal";
import FamilyDetailModal from "../screens/Profile/User/Edit/FamilyDetailModal";
import SkillDetailModal from "../screens/Profile/User/Edit/SkillDetailModal";
import EditAbout from "../screens/Profile/User/Edit/EditAbout";
import ExperienceAddModal from "../screens/Profile/User/Edit/ExperienceAddModal";
import ExperienceDetailModal from "../screens/Profile/User/Edit/ExperienceDetailModal";
import LanguageAddModal from "../screens/Profile/User/Edit/LanguageAddModal";
import LanguagePackagaModal from "../screens/Profile/User/Edit/LanguagePackageModal";
import LanguageDetailModal from "../screens/Profile/User/Edit/LangaugeDetailModal";
import NotificationScreen from "../screens/Dynamic/NotificationScreen";
import ChangePasswordModal from "../screens/Profile/User/Settings/ChangePasswordModal";
import UserVerifyScreen from "../screens/Profile/User/Settings/UserVerifyScreen";
import AddPostScreen from "../screens/Network/AddPostScreen";
import ViewCompanyProfile from "../screens/Dynamic/ViewCompanyProfile";
import CompanyWorkDetail from "../screens/Profile/Company/CompanyWorkDetail";
import ViewUserProfile from "../screens/Dynamic/ViewUserProfile";
import NetworkingPostDetailScreen from "../screens/Network/NetworkingPostDetailScreen";
import CompanyPortfolia from "../screens/Profile/Company/CompanyEditCoverProfile/CompanyPortfolia";
import ViewUserPost from "../screens/Dynamic/ViewUserPost";
import ChangeCompanyPassword from "../screens/Profile/Company/CompanySetting/ChangeCompanyPassword";
import WorkBoostModal from "../screens/Profile/User/Wallet/WorkBoostModal";
import ViewCompanyJobs from "../screens/Dynamic/ViewCompanyJobs";
import UserSendWorkRequest from "../screens/Dynamic/UserSendWorkRequest";
import ViewPortfolio from "../screens/Dynamic/VIewPortfolio";
import PostSettings from "../screens/Network/PostSettings";
import CompanyWorkRequest from "../screens/Profile/Company/CompanySetting/CompanyWorkRequest";
const ProfileGroup = () => {
  const ProfileStack = createNativeStackNavigator();
  const state = useContext(UserContext);
  const { colors } = useTheme();
  return (
    <ProfileStack.Navigator>
      {/* User */}

      {state.isCompany ? (
        <ProfileStack.Group>
          {/* Company */}
          <ProfileStack.Screen
            name="CompanyProfileScreen"
            component={CompanyProfileScreen}
            options={{ headerShown: false, fullScreenGestureEnabled: true }}
          />
          {/* Company profile cover status */}
          <>
            <ProfileStack.Screen
              name="CompanyProfilePicture"
              component={CompanyProfilePicture}
              options={{
                headerShown: true,
                presentation: "formSheet",
                title: "?????????????? ?????????? ??????????",
                headerLeft: () => <MyBackButton />,
              }}
            />
            <ProfileStack.Screen
              name="EditCompanyCover"
              component={EditCompanyCover}
              options={{
                headerShown: true,
                presentation: "formSheet",
                title: "?????????? ?????????? ??????????",
                headerLeft: () => <MyBackButton />,
              }}
            />
            <ProfileStack.Screen
              name="EditCompanyStatus"
              component={EditCompanyStatus}
              options={{
                headerShown: true,
                presentation: "formSheet",
                title: "???????????? ??????????",
                headerLeft: () => <MyBackButton />,
              }}
            />
            <ProfileStack.Screen
              name="CompanyProfileEdit"
              component={CompanyProfileEdit}
              options={{
                headerShown: true,
                presentation: "formSheet",
                title: "?????????????? ????????????",
                headerLeft: () => <MyBackButton />,
              }}
            />
          </>
          {/* Company Setting */}
          <>
            <ProfileStack.Screen
              name="CompanySettingModal"
              component={CompanySettingModal}
              options={{
                headerShown: true,
                presentation: "formSheet",
                title: "????????????????",
                headerLeft: () => <MyBackButton />,
              }}
            />
            <ProfileStack.Screen
              name="CompanyCreateWork"
              component={CompanyCreatedWork}
              options={{
                headerShown: true,
                presentation: "formSheet",
                title: "???????????????? ?????????? ??????",
                headerLeft: () => <MyBackButton />,
              }}
            />
            <ProfileStack.Screen
              name="CompanyUsedProduct"
              component={CompanyUsedProduct}
              options={{
                headerShown: true,
                presentation: "formSheet",
                title: "?????????????????? ??????????????????????????",
                headerLeft: () => <MyBackButton />,
              }}
            />
            <ProfileStack.Screen
              name="ChangeCompanyPassword"
              component={ChangeCompanyPassword}
              options={{
                headerShown: true,
                presentation: "formSheet",
                title: "???????? ???? ??????????",
                headerLeft: () => <MyBackButton />,
              }}
            />
            <ProfileStack.Screen
              name="WorkBoostModal"
              component={WorkBoostModal}
              options={{
                headerShown: true,
                presentation: "formSheet",
                title: "?????????? ??????",
                headerLeft: () => <MyBackButton />,
              }}
            />
            <ProfileStack.Screen
              name="CompanyWorkRequest"
              component={CompanyWorkRequest}
              options={{
                headerShown: true,
                presentation: "formSheet",
                title: "?????????? ?????????? ??????????",
                headerLeft: () => <MyBackButton />,
              }}
            />
            <ProfileStack.Screen
              name="CompanyRecievedCv"
              component={CompanyRecievedCv}
              options={{
                headerShown: true,
                presentation: "formSheet",
                title: "?????????? ??????????",
                headerLeft: () => <MyBackButton />,
              }}
            />
          </>
        </ProfileStack.Group>
      ) : (
        <ProfileStack.Group>
          {/* User */}
          <ProfileStack.Screen
            name="UserProfileScreen"
            component={UserProfileScreen}
            options={{ headerShown: false, fullScreenGestureEnabled: true }}
          />

          {/* Cv ???????????? */}
          <>
            <ProfileStack.Screen
              name="CreateCvScreen"
              component={CreateCvScreen}
              options={{
                headerShown: true,
                presentation: "formSheet",
                title: "?????????? ????????????",
                headerLeft: () => <MyBackButton />,
              }}
            />
            <ProfileStack.Screen
              name="PersonalDetailModal"
              component={PersonalDetailModal}
              options={{
                headerShown: true,
                presentation: "formSheet",
                title: "???????????? ????????????????",
                headerLeft: () => <MyBackButton />,
              }}
            />
            {/* ???????????? ???????????? */}
            <ProfileStack.Screen
              name="AchievmentAddModal"
              component={AchievmentAddModal}
              options={{
                headerShown: true,
                presentation: "formSheet",
                title: "???????????? ???????????? ??????????",
                headerLeft: () => <MyBackButton />,
              }}
            />
            <ProfileStack.Screen
              name="AchievmentDetailModal"
              component={AchievmentDetailModal}
              options={{
                headerShown: true,
                presentation: "formSheet",
                title: "???????????? ????????????",
                headerLeft: () => <MyBackButton />,
              }}
            />
            {/* ???????????? ???????????? ???????????? */}
            {/* ?????????????????? */}
            <ProfileStack.Screen
              name="CourseAddModal"
              component={CourseAddModal}
              options={{
                headerShown: true,
                presentation: "formSheet",
                title: "?????????????????? ??????????",
                headerLeft: () => <MyBackButton />,
              }}
            />
            <ProfileStack.Screen
              name="CourseDetailModal"
              component={CourseDetailModal}
              options={{
                headerShown: true,
                presentation: "formSheet",
                title: "??????????????????",
                headerLeft: () => <MyBackButton />,
              }}
            />
            <ProfileStack.Screen
              name="CoursePackageModal"
              component={CoursePackageModal}
              options={{
                title: "?????????????????? ????????????????",
                headerLeft: () => <MyBackButton />,
                presentation: "formSheet",
              }}
            />
            {/* ?????????????????? ???????????? */}
            {/* ???????????????? ?????????? */}
            <ProfileStack.Screen
              name="ExperienceDetailModal"
              component={ExperienceDetailModal}
              options={{
                title: "???????????????? ??????????????????????",
                headerLeft: () => <MyBackButton />,
                presentation: "formSheet",
              }}
            />
            <ProfileStack.Screen
              name="ExperienceAddModal"
              component={ExperienceAddModal}
              options={{
                // headerShown: false,
                fullScreenGestureEnabled: true,
                title: "???????????????? ??????????",
                headerLeft: () => <MyBackButton />,
                presentation: "formSheet",
              }}
            />
            <ProfileStack.Screen
              name="ExperiencePackageModal"
              component={ExperiencePackageModal}
              options={{
                title: "???????????????? ????????????????",
                headerLeft: () => <MyBackButton />,
                presentation: "formSheet",
              }}
            />
            {/* ???????????????? ???????????? */}
            {/* ?????? ???????????? ???????????????? */}
            <ProfileStack.Screen
              name="FamilyAddModal"
              component={FamilyAddModal}
              options={{
                title: "?????? ???????????? ???????????????? ??????????",
                headerLeft: () => <MyBackButton />,
                presentation: "formSheet",
              }}
            />
            <ProfileStack.Screen
              name="FamilyDetailModal"
              component={FamilyDetailModal}
              options={{
                title: "?????? ???????????? ???????????????? ??????????????????????",
                headerLeft: () => <MyBackButton />,
                presentation: "formSheet",
              }}
            />
            {/* ?????? ???????????? ???????????????? ????????????*/}
            {/* ???? ???????????? */}
            <ProfileStack.Screen
              name="SkillDetailModal"
              component={SkillDetailModal}
              options={{
                title: "???? ???????????? ?????????? ?????? ??????",
                headerLeft: () => <MyBackButton />,
                presentation: "formSheet",
              }}
            />
            {/* ???? ???????????? ????????????*/}
            {/* ???????????? ?????????? */}
            <ProfileStack.Screen
              name="EditAbout"
              component={EditAbout}
              options={{
                title: "?????????????????????? ??????????",
                headerLeft: () => <MyBackButton />,
                presentation: "formSheet",
              }}
            />
            {/* ???????????? ???????????? */}
            <ProfileStack.Screen
              name="LanguageAddModal"
              component={LanguageAddModal}
              options={{
                title: "???????????? ????????????",
                headerLeft: () => <MyBackButton />,
                presentation: "formSheet",
              }}
            />
            <ProfileStack.Screen
              name="LanguageDetailModal"
              component={LanguageDetailModal}
              options={{
                title: "???????????? ????????????",
                headerLeft: () => <MyBackButton />,
                presentation: "formSheet",
              }}
            />
            <ProfileStack.Screen
              name="LanguagePackageModal"
              component={LanguagePackagaModal}
              options={{
                title: "???????????? ????????????",
                headerLeft: () => <MyBackButton />,
                presentation: "formSheet",
              }}
            />
            {/* ???????????? ???????????? ?????????????? */}
            {/* ???????????? ?????????? */}
          </>
          {/* CV ?????????????? ???????????? */}
          {/* Status ProfilePicture CoverPicture Frame */}
          <>
            <ProfileStack.Screen
              name="ProfilePictureView"
              component={ProfilePictureView}
              options={{
                headerShown: true,
                presentation: "formSheet",
                title: "?????????????? ?????????? ??????????",
                headerLeft: () => <MyBackButton />,
              }}
            />
            <ProfileStack.Screen
              name="ProfilePictureFrame"
              component={ProfilePictureFrame}
              options={{
                headerShown: true,
                presentation: "formSheet",
                title: "????????????????",
                headerLeft: () => <MyBackButton />,
              }}
            />
            <ProfileStack.Screen
              name="EditCoverModal"
              component={EditCoverModal}
              options={{
                headerShown: true,
                presentation: "formSheet",
                title: "?????????? ??????????",
                headerLeft: () => <MyBackButton />,
              }}
            />
          </>
          {/* Status ProfilePicture CoverPicture Frame end */}
          {/* SettingScreen */}
          <>
            <ProfileStack.Screen
              name="UserSettingsScreen"
              component={UserSettingsScreen}
              options={{
                headerShown: true,
                presentation: "formSheet",
                title: "????????????????",
                headerLeft: () => <MyBackButton />,
              }}
            />
            <ProfileStack.Screen
              name="AddPostScreen"
              component={AddPostScreen}
              options={{
                headerShown: false,
                fullScreenGestureEnabled: true,
              }}
            />
            <ProfileStack.Screen
              name="EditStatusModal"
              component={EditStatusModal}
              options={{
                headerShown: true,
                presentation: "formSheet",
                title: "???????????? ??????????",
                headerLeft: () => <MyBackButton />,
              }}
            />
            <ProfileStack.Screen
              name="UserActivityModal"
              component={UserActivityModal}
              options={{
                headerShown: true,
                presentation: "formSheet",
                title: "???????????????????????? ??????????",
                headerLeft: () => <MyBackButton />,
              }}
            />
            <ProfileStack.Screen
              name="NetworkingPostDetailScreen"
              component={NetworkingPostDetailScreen}
              options={{
                headerShown: false,
                presentation: "formSheet",
              }}
            />
            <ProfileStack.Screen
              name="UserRecievedJob"
              component={UserRecievedJob}
              options={{
                headerShown: true,
                presentation: "formSheet",
                title: "?????????? ?????????? ??????????",
                headerLeft: () => <MyBackButton />,
              }}
            />
            <ProfileStack.Screen
              name="UserSendWorkHistory"
              component={UserSendWorkHistory}
              options={{
                headerShown: true,
                presentation: "formSheet",
                title: "???????????????? ?????????? ??????????",
                headerLeft: () => <MyBackButton />,
              }}
            />
            <ProfileStack.Screen
              name="UserSavedWork"
              component={UserSavedWork}
              options={{
                headerShown: true,
                presentation: "formSheet",
                title: "?????????????????? ?????????? ????????",
                headerLeft: () => <MyBackButton />,
              }}
            />
            <ProfileStack.Screen
              name="UserWorkDetail"
              component={UserWorkDetail}
              options={{
                headerShown: true,
                presentation: "formSheet",
                title: "?????????????????? ?????????? ???????? ??????????????????????",
                headerLeft: () => <MyBackButton />,
              }}
            />
            <ProfileStack.Screen
              name="ChangePasswordModal"
              component={ChangePasswordModal}
              options={{
                headerShown: true,
                presentation: "formSheet",
                title: "???????? ???? ??????????",
                headerLeft: () => <MyBackButton />,
              }}
            />
            <ProfileStack.Screen
              name="UserVerifyScreen"
              component={UserVerifyScreen}
              options={{
                headerShown: true,
                presentation: "formSheet",
                title: "?????????????????????????? ????????????",
                headerLeft: () => <MyBackButton />,
              }}
            />
          </>
          {/* SettingScreen End*/}
          {/* FollowerFollowing */}
        </ProfileStack.Group>
      )}
      <ProfileStack.Group>
        <>
          <ProfileStack.Screen
            name="ViewUserFollowings"
            component={ViewUserFollowings}
            options={{
              headerShown: true,
              presentation: "formSheet",
              title: "????????????",
              headerLeft: () => <MyBackButton />,
            }}
          />
          <ProfileStack.Screen
            name="UserSendWorkRequest"
            component={UserSendWorkRequest}
            options={{
              headerShown: true,
              presentation: "formSheet",
              title: "?????????? ?????????? ????????????",
              headerLeft: () => <MyBackButton />,
            }}
          />
          <ProfileStack.Screen
            name="ViewUserFollower"
            component={ViewUserFollower}
            options={{
              headerShown: true,
              presentation: "formSheet",
              title: "??????????????",
              headerLeft: () => <MyBackButton />,
            }}
          />
          <ProfileStack.Screen
            name="ChangeAccountModal"
            component={ChangeAccountModal}
            options={{
              presentation: "formSheet",
              contentStyle: {
                bottom: 0,
                left: 0,
                right: 0,
                position: "absolute",
                height: "80%",
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
              },
              headerShown: false,
            }}
          />
          <ProfileStack.Screen
            name="PersonLoginScreen"
            component={PersonLoginScreen}
            options={{
              headerShown: true,
              presentation: "formSheet",
              title: "?????????????????? ??????????????",
              headerLeft: () => <MyBackButton />,
            }}
          />
          <ProfileStack.Screen
            name="CompanyLoginScreen"
            component={ChangeCompanyLogin}
            options={{
              headerShown: false,
              presentation: "formSheet",
              title: "?????????????? ??????????????",
              headerLeft: () => <MyBackButton />,
            }}
          />
        </>
        {/* ???????????? */}
        <>
          <ProfileStack.Screen
            name="WalletScreen"
            component={WalletScreen}
            options={{ headerShown: false, fullScreenGestureEnabled: true }}
          />
          <ProfileStack.Screen
            name="SendMoneyScreen"
            component={SendMoneyScreen}
            options={{ headerShown: false, fullScreenGestureEnabled: true }}
          />
          <ProfileStack.Screen
            name="QpayModals"
            component={QpayModal}
            options={{
              headerShown: true,
              presentation: "formSheet",
              title: "???????????? ??????",
              headerLeft: () => <MyBackButton />,
            }}
          />
          <ProfileStack.Screen
            name="PointUseScreen"
            component={PointUseScreen}
            options={{
              headerShown: true,
              // presentation: "formSheet",
              title: "?????????? ??????????????",
              headerLeft: () => <MyBackButton />,
              fullScreenGestureEnabled: true,
            }}
          />
          <ProfileStack.Screen
            name="ProductUsePoint"
            component={ProductUsePoint}
            options={{
              headerShown: true,
              // presentation: "formSheet",
              title: "???????? ????????????",
              headerLeft: () => <MyBackButton />,
              fullScreenGestureEnabled: true,
            }}
          />
          <ProfileStack.Screen
            name="BoostPost"
            component={BoostPost}
            options={{
              headerShown: true,
              // presentation: "formSheet",
              title: "???????? ????????????????",
              headerLeft: () => <MyBackButton />,
              fullScreenGestureEnabled: true,
            }}
          />
        </>
        {/* ????????????  ????????????*/}
        {/* Notification */}
        <>
          <ProfileStack.Screen
            name="NotificationScreen"
            component={NotificationScreen}
            options={{ headerShown: false, fullScreenGestureEnabled: true }}
          />
        </>
        {/* Port */}
        <ProfileStack.Screen
          name="CompanyPortfolia"
          component={CompanyPortfolia}
          options={{
            headerShown: true,
            presentation: "formSheet",
            title: "??????????????????",
            headerLeft: () => <MyBackButton />,
          }}
        />
        {/* port end */}
      </ProfileStack.Group>
      <ProfileStack.Group>
        <ProfileStack.Screen
          name="ViewCompanyProfile"
          component={ViewCompanyProfile}
          options={{
            headerShown: false,
            fullScreenGestureEnabled: true,
          }}
        />
        <ProfileStack.Screen
          name="ViewUserProfile"
          component={ViewUserProfile}
          options={{
            headerShown: false,
            fullScreenGestureEnabled: true,
          }}
        />
        <ProfileStack.Screen
          name="ViewCompanyJobs"
          component={ViewCompanyJobs}
          options={{
            headerShown: true,
            presentation: "formSheet",
            title: "?????????? ??????",
            headerLeft: () => <MyBackButton />,
          }}
        />
        <ProfileStack.Screen
          name="CompanyWorkDetail"
          component={CompanyWorkDetail}
          options={{
            headerShown: true,
            presentation: "formSheet",
            title: "?????????? ??????",
            headerLeft: () => <MyBackButton />,
          }}
        />
        <ProfileStack.Screen
          name="ViewUserPosts"
          component={ViewUserPost}
          options={{
            headerShown: true,
            presentation: "formSheet",
            title: "???????????????????????? ????????",
            headerLeft: () => <MyBackButton />,
          }}
        />
        <ProfileStack.Screen
          name="PostSettings"
          component={PostSettings}
          options={{
            headerShown: true,
            presentation: "formSheet",
            title: "????????????????",
            headerLeft: () => <MyBackButton />,
          }}
        />
        <ProfileStack.Screen
          name="ViewPortfolio"
          component={ViewPortfolio}
          options={{
            headerShown: false,
          }}
        />
      </ProfileStack.Group>
    </ProfileStack.Navigator>
  );
};

export default ProfileGroup;
