import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CvScreen from "../screens/Cv/CvScreen";
import CvDetailScreen from "../components/Cv/CvDetailScreen";
import ViewUserProfile from "../screens/Dynamic/ViewUserProfile";
import ViewUserFollower from "../screens/Dynamic/ViewUserFollower";
import ViewUserFollowing from "../screens/Dynamic/ViewUserFollowings";
import UserSendWorkRequest from "../screens/Dynamic/UserSendWorkRequest";
import MyBackButton from "../components/Header/MyBackButton";
const CvGroup = () => {
  const CvStack = createNativeStackNavigator();
  return (
    <CvStack.Navigator>
      <CvStack.Screen
        name="CvScreen"
        component={CvScreen}
        options={{ headerShown: false }}
      />
      <CvStack.Screen
        name="CvDetailScreen"
        component={CvDetailScreen}
        options={{ headerShown: false, fullScreenGestureEnabled: true }}
      />
      <CvStack.Group>
        <CvStack.Screen
          name="ViewUserProfile"
          component={ViewUserProfile}
          options={{ headerShown: false, fullScreenGestureEnabled: true }}
        />
        <CvStack.Screen
          name="ViewUserFollower"
          component={ViewUserFollower}
          options={{ headerShown: false, fullScreenGestureEnabled: true }}
        />
        <CvStack.Screen
          name="ViewUserFollowing"
          component={ViewUserFollowing}
          options={{ headerShown: false, fullScreenGestureEnabled: true }}
        />
        <CvStack.Screen
          name="UserSendWorkRequest"
          component={UserSendWorkRequest}
          options={{
            title: "Ажлын санал илгээх",
            headerLeft: () => <MyBackButton />,
            presentation: "formSheet",
          }}
        />
      </CvStack.Group>
    </CvStack.Navigator>
  );
};

export default CvGroup;
