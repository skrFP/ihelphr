import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EmployeeScreen from "../screens/Employee/EmployeeScreen";
import EmployeeWorkDetail from "../screens/Employee/EmployeeWorkDetail";
import ViewCompanyProfile from "../screens/Dynamic/ViewCompanyProfile";
import ViewUserFollower from "../screens/Dynamic/ViewUserFollower";
import ViewUserFollowings from "../screens/Dynamic/ViewUserFollowings";
import EmployeeAddWork from "../screens/Employee/EmployeeAddWork";
import EmployeeSavedWork from "../screens/Employee/EmployeeSavedWork";
import MyBackButton from "../components/Header/MyBackButton";
const EmployeeGroup = () => {
  const EmployeeStack = createNativeStackNavigator();
  return (
    <EmployeeStack.Navigator>
      <EmployeeStack.Group>
        <EmployeeStack.Screen
          name="EmployeeScreen"
          component={EmployeeScreen}
          options={{ headerShown: false }}
        />
        <EmployeeStack.Screen
          name="EmployeeWorkDetail"
          component={EmployeeWorkDetail}
          options={{ headerShown: false }}
        />
        <EmployeeStack.Screen
          name="EmployeeAddWork"
          component={EmployeeAddWork}
          options={{ headerShown: false }}
        />
        <EmployeeStack.Screen
          name="EmployeeSavedWork"
          component={EmployeeSavedWork}
          options={{
            headerShown: true,
            presentation: "formSheet",
            title: "Хадгалсан ажлын байр",
            headerLeft: () => <MyBackButton />,
          }}
        />
      </EmployeeStack.Group>
      <EmployeeStack.Group>
        <EmployeeStack.Screen
          name="ViewCompanyProfile"
          component={ViewCompanyProfile}
          options={{ headerShown: false }}
        />
        <EmployeeStack.Screen
          name="ViewUserFollower"
          component={ViewUserFollower}
          options={{ headerShown: false }}
        />
        <EmployeeStack.Screen
          name="ViewUserFollowings"
          component={ViewUserFollowings}
          options={{ headerShown: false }}
        />
      </EmployeeStack.Group>
    </EmployeeStack.Navigator>
  );
};

export default EmployeeGroup;
