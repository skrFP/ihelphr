import {
  StyleSheet,
  Text,
  FlatList,
  View,
  SafeAreaView,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import React, { useState, useCallback, useContext } from "react";
import { useTheme } from "@react-navigation/native";
import useUrgentWork from "../../hooks/EmployeeHook/useUrgentWork";
import useSpecialWork from "../../hooks/EmployeeHook/useSpecialWork";
import useNormalWork from "../../hooks/EmployeeHook/useNormalWork";
import useSpecialCompany from "../../hooks/EmployeeHook/useSpecialCompany";
import useNormalCompany from "../../hooks/EmployeeHook/useNormalCompany";
import UrgentWork from "../../components/Employee/UrgentWork";
import SpecialWork from "../../components/Employee/SpecialWork";
import NormalWork from "../../components/Employee/NormalWork";
import SpecialCompany from "../../components/Employee/SpecialCompany";
import NormalCompany from "../../components/Employee/NormalCompany";
import Header from "../../components/Header/Header";
import UserContext from "../../context/UserContext";
import CompanyHeader from "../../components/Header/CompanyHeader";
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
const EmployeeScreen = () => {
  const [refresh, setRefresh] = useState(false);
  const [urgentWork, urgentError, urgentLoading] = useUrgentWork(refresh);
  const [specialWork, specialError, specialLoading] = useSpecialWork(refresh);
  const [normalWork, normalError, normalLoading] = useNormalWork(refresh);
  const [specialCompany, specialCompanyError, specialCompanyLoading] =
    useSpecialCompany(refresh);
  const [normalCompany, normalCompanyError, normalCompanyLoading] =
    useNormalCompany(refresh);
  const [isEnabled, setIsEnabled] = useState(false);
  const state = useContext(UserContext);
  const { colors } = useTheme();
  const onRefresh = useCallback(() => {
    setRefresh(true);
    wait(2000).then(() => setRefresh(false));
  });
  return (
    <SafeAreaView style={{ backgroundColor: "#141414", marginBottom: 115 }}>
      {state.isCompany ? (
        <CompanyHeader isEmployeeAddWork={true} />
      ) : (
        <Header isEmployeeSaved={true} />
      )}

      <View
        style={{
          justifyContent: "space-evenly",
          flexDirection: "row",
          paddingTop: 5,
        }}
      >
        <TouchableOpacity
          style={{
            padding: 10,
            margin: 10,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "white",
            backgroundColor: isEnabled ? colors.background : "white",
          }}
          onPress={() => setIsEnabled(false)}
        >
          <Text
            style={{
              fontWeight: "bold",
              paddingHorizontal: 30,
              color: isEnabled ? colors.primaryText : "black",
            }}
          >
            Ажлын зар
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: 10,
            margin: 10,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "white",
            backgroundColor: isEnabled ? "white" : colors.background,
          }}
          onPress={() => setIsEnabled(true)}
        >
          <Text
            style={{
              fontWeight: "bold",
              paddingHorizontal: 40,
              color: isEnabled ? colors.background : colors.primaryText,
            }}
          >
            Koмпани
          </Text>
        </TouchableOpacity>
      </View>
      {isEnabled ? (
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <>
              <SpecialCompany
                data={specialCompany}
                error={specialCompanyError}
                loading={specialCompanyLoading}
              />
            </>
          }
          data={normalCompany}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => {
            return <NormalCompany data={item} />;
          }}
        />
      ) : (
        <>
          {normalError && <Text> aldaa! {urgentError} </Text>}
          <FlatList
            refreshControl={
              <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
            }
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              <>
                {urgentWork.map((data) => {
                  return (
                    <View key={data._id}>
                      <UrgentWork
                        id={data._id}
                        createUser={data.createUser}
                        occupation={data.occupation}
                        type={data.type}
                        urgent={data.urgent}
                        salary={data.salary}
                      />
                    </View>
                  );
                })}
                {specialWork.map((data) => {
                  return (
                    <View key={data._id}>
                      <SpecialWork
                        id={data._id}
                        createUser={data.createUser}
                        occupation={data.occupation}
                        type={data.type}
                        salary={data.salary}
                      />
                    </View>
                  );
                })}
              </>
            }
            data={normalWork}
            keyExtractor={(item, index) => index}
            renderItem={({ item }) => {
              return (
                <>
                  <NormalWork
                    id={item._id}
                    createUser={item.createUser}
                    occupation={item.occupation}
                    price={item.price}
                    job={item.do}
                  />
                </>
              );
            }}
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default EmployeeScreen;

const styles = StyleSheet.create({});
