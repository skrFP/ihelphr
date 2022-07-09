import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyBackButton from "../components/Header/MyBackButton";
import SearchScreen from "../screens/Search/SearchScreen";
import CompanySearch from "../screens/Search/CompanySearch";
import EmployerSearch from "../screens/Search/EmployerSearch";
import UserSearch from "../screens/Search/UserSearch";
import EmployeeSearch from "../screens/Search/EmployeeSearch";
import WorkSearch from "../screens/Search/WorkSearch";
import CategorySearch from "../screens/Search/CategorySearch";
import MyJobs from "../screens/Search/MyJobs";
import SendWorkRequestModal from "../screens/Dynamic/UserSendWorkRequest";
import ViewCompanyProfile from "../screens/Dynamic/ViewCompanyProfile";
import ViewUserProfile from "../screens/Dynamic/ViewUserProfile";
import ViewUserFollower from "../screens/Dynamic/ViewUserFollower";
import ViewUserFollowings from "../screens/Dynamic/ViewUserFollowings";
const SearchGroup = () => {
  const SearchStack = createNativeStackNavigator();
  return (
    <SearchStack.Navigator>
      <SearchStack.Group>
        <SearchStack.Screen
          name="SearchScreen"
          component={SearchScreen}
          options={{ headerShown: false }}
        />
        <SearchStack.Screen
          name="CompanySearch"
          component={CompanySearch}
          options={{ headerShown: false, fullScreenGestureEnabled: true }}
        />
        <SearchStack.Screen
          name="EmployerSearch"
          component={EmployerSearch}
          options={{
            headerShown: false,
            fullScreenGestureEnabled: true,
          }}
        />
        <SearchStack.Screen
          name="UserSearch"
          component={UserSearch}
          options={{ headerShown: false, fullScreenGestureEnabled: true }}
        />
        <SearchStack.Screen
          name="EmployeeSearch"
          component={EmployeeSearch}
          options={{
            headerShown: false,
            fullScreenGestureEnabled: true,
          }}
        />
        <SearchStack.Screen
          name="WorkSearch"
          component={WorkSearch}
          options={{
            fullScreenGestureEnabled: true,
            headerShown: false,
          }}
        />
        <SearchStack.Screen
          name="CategorySearch"
          component={CategorySearch}
          options={{
            fullScreenGestureEnabled: true,
            headerShown: false,
          }}
        />
        <SearchStack.Screen
          name="MyJobs"
          component={MyJobs}
          options={{
            fullScreenGestureEnabled: true,
            title: "Өөрт тохирох",
            headerLeft: () => <MyBackButton />,
          }}
        />
      </SearchStack.Group>
      <SearchStack.Group>
        <SearchStack.Screen
          name="UserSendWorkRequest"
          component={SendWorkRequestModal}
          options={{
            fullScreenGestureEnabled: true,
            title: "Ажлын санал илгээх",
            headerLeft: () => <MyBackButton />,
            presentation: "formSheet",
          }}
        />
        <SearchStack.Screen
          name="ViewCompanyProfile"
          component={ViewCompanyProfile}
          options={{ headerShown: false, fullScreenGestureEnabled: true }}
        />
        <SearchStack.Screen
          name="ViewUserProfile"
          component={ViewUserProfile}
          options={{ headerShown: false, fullScreenGestureEnabled: true }}
        />
        <SearchStack.Screen
          name="ViewUserFollower"
          component={ViewUserFollower}
          options={{
            fullScreenGestureEnabled: true,
            title: "Дагуулдаг хүмүүс",
            headerLeft: () => <MyBackButton />,
          }}
        />
        <SearchStack.Screen
          name="ViewUserFollowings"
          component={ViewUserFollowings}
          options={{
            fullScreenGestureEnabled: true,
            title: "Дагдаг хүмүүс",
            headerLeft: () => <MyBackButton />,
          }}
        />
      </SearchStack.Group>
    </SearchStack.Navigator>
  );
};

export default SearchGroup;
