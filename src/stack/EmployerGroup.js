import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EmployerScreen from "../screens/Employer/EmployerScreen";
import EmployerWorkDetail from "../screens/Employer/EmployerWorkDetail";
import ViewCompanyProfile from "../screens/Dynamic/ViewCompanyProfile";
import EmployerAddWork from "../screens/Employer/EmployerAddWork";
import MyBackButton from "../components/Header/MyBackButton";
import UserSavedWork from "../screens/Profile/User/Settings/UserSavedWork";
import UserWorkDetail from "../screens/Profile/User/Settings/UserWorkDetail";
import CompanyWorkDetail from "../screens/Profile/Company/CompanyWorkDetail";
import ViewCompanyJobs from "../screens/Dynamic/ViewCompanyJobs";
import NotificationScreen from "../screens/Dynamic/NotificationScreen";
const EmployerGroup = () => {
  const EmployerStack = createNativeStackNavigator();
  return (
    <EmployerStack.Navigator>
      <EmployerStack.Group>
        <EmployerStack.Screen
          name="EmployerScreen"
          component={EmployerScreen}
          options={{ headerShown: false }}
        />
        <EmployerStack.Screen
          name="EmployerWorkDetail"
          component={EmployerWorkDetail}
          options={{ headerShown: false, fullScreenGestureEnabled: true }}
        />
        <EmployerStack.Screen
          name="EmployerAddWork"
          component={EmployerAddWork}
          options={{ headerShown: false, fullScreenGestureEnabled: true }}
        />
      </EmployerStack.Group>
      <EmployerStack.Group>
        <EmployerStack.Screen
          name="ViewCompanyProfile"
          component={ViewCompanyProfile}
          options={{ headerShown: false, fullScreenGestureEnabled: true }}
        />
        <EmployerStack.Screen
          name="UserSavedWork"
          component={UserSavedWork}
          options={{
            headerShown: true,
            presentation: "formSheet",
            title: "Хадгалсан ажлын байр",
            headerLeft: () => <MyBackButton />,
          }}
        />
        <EmployerStack.Screen
          name="UserWorkDetail"
          component={UserWorkDetail}
          options={{
            headerShown: true,
            presentation: "formSheet",
            title: "Хадгалсан ажлын байр",
            headerLeft: () => <MyBackButton />,
          }}
        />
        <EmployerStack.Screen
          name="ViewCompanyJobs"
          component={ViewCompanyJobs}
          options={{
            headerShown: true,
            presentation: "formSheet",
            title: "Ажлын зар",
            headerLeft: () => <MyBackButton />,
          }}
        />
        <EmployerStack.Screen
          name="NotificationScreen"
          component={NotificationScreen}
          options={{ headerShown: false, fullScreenGestureEnabled: true }}
        />
        <EmployerStack.Screen
          name="CompanyWorkDetail"
          component={CompanyWorkDetail}
          options={{
            headerShown: true,
            presentation: "formSheet",
            title: "Ажлын зар",
            headerLeft: () => <MyBackButton />,
          }}
        />
      </EmployerStack.Group>
    </EmployerStack.Navigator>
  );
};

export default EmployerGroup;
