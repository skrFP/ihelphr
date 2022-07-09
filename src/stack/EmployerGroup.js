import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EmployerScreen from "../screens/Employer/EmployerScreen";
import EmployerWorkDetail from "../screens/Employer/EmployerWorkDetail";
import ViewCompanyProfile from "../screens/Dynamic/ViewCompanyProfile";
import EmployerAddWork from "../screens/Employer/EmployerAddWork";
import MyBackButton from "../components/Header/MyBackButton";
import UserSavedWork from "../screens/Profile/User/Settings/UserSavedWork";
import UserWorkDetail from "../screens/Profile/User/Settings/UserWorkDetail";
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
          options={{ headerShown: false }}
        />
        <EmployerStack.Screen
          name="EmployerAddWork"
          component={EmployerAddWork}
          options={{ headerShown: false }}
        />
      </EmployerStack.Group>
      <EmployerStack.Group>
        <EmployerStack.Screen
          name="ViewCompanyProfile"
          component={ViewCompanyProfile}
          options={{ headerShown: false }}
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
      </EmployerStack.Group>
    </EmployerStack.Navigator>
  );
};

export default EmployerGroup;
