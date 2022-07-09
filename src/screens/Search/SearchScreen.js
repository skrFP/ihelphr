import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect } from "react";
import UserContext from "../../context/UserContext";
import Header from "../../components/Header/Header";
import { useNavigation, useTheme } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SearchScreen = () => {
  const state = useContext(UserContext);
  const { colors } = useTheme();
  const navigation = useNavigation();
  const logout = () => {
    state.logout();
  };
  console.log(state);
  useEffect(() => {
    AsyncStorage.getItem("user")
      .then((data) => {
        if (data !== null) {
          const user = JSON.parse(data);
          console.log(user);
        }
        state.setIsLoading(false);
      })
      .catch((err) =>
        console.log("Токенийг утаснаас уншиж чадсангүй. Алдаа : " + err.message)
      );
  }, []);
  return (
    // <SafeAreaView style={{ backgroundColor: colors.header }}>
    //   <Header />
    //   <ScrollView style={{ backgroundColor: colors.background }}>
    //     <TouchableOpacity
    //       style={{
    //         padding: 10,

    //         borderWidth: 1,
    //         borderRadius: 20,
    //         marginTop: 10,
    //       }}
    //       onPress={() => navigation.navigate("UserSearch")}
    //     >
    //       <Text style={{ textAlign: "center", color: colors.primaryText }}>
    //         {" "}
    //         Хэрэглэгч хайх{" "}
    //       </Text>
    //     </TouchableOpacity>
    //     <TouchableOpacity
    //       style={{
    //         padding: 10,

    //         borderWidth: 1,
    //         borderRadius: 20,
    //         marginVertical: 10,
    //       }}
    //       onPress={() => navigation.navigate("CompanySearch")}
    //     >
    //       <Text style={{ textAlign: "center", color: colors.primaryText }}>
    //         {" "}
    //         Компани хайх{" "}
    //       </Text>
    //     </TouchableOpacity>

    //     <TouchableOpacity
    //       style={{
    //         padding: 10,

    //         borderWidth: 1,
    //         borderRadius: 20,
    //       }}
    //       onPress={() => navigation.navigate("MyJobs")}
    //     >
    //       <Text style={{ textAlign: "center", color: colors.primaryText }}>
    //         {" "}
    //         Өөрт тохирох{" "}
    //       </Text>
    //     </TouchableOpacity>
    //     <TouchableOpacity
    //       style={{
    //         padding: 10,
    //         borderWidth: 1,
    //         borderRadius: 20,
    //         marginVertical: 10,
    //       }}
    //       onPress={() => navigation.navigate("WorkSearch")}
    //     >
    //       <Text style={{ textAlign: "center", color: colors.primaryText }}>
    //         {" "}
    //         Мэргэжилээр зар хайх{" "}
    //       </Text>
    //     </TouchableOpacity>
    //     <TouchableOpacity
    //       style={{
    //         padding: 10,

    //         borderWidth: 1,
    //         borderRadius: 20,
    //       }}
    //       onPress={() => navigation.navigate("CategorySearch")}
    //     >
    //       <Text style={{ textAlign: "center", color: colors.primaryText }}>
    //         {" "}
    //         Салбараар зар хайх{" "}
    //       </Text>
    //     </TouchableOpacity>
    //   </ScrollView>
    // </SafeAreaView>
    <SafeAreaView>
      <Text style={{ fontSize: 30 }} onPress={() => state.logout()}>
        garah
      </Text>
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({});
