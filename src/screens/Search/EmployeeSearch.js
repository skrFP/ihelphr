import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation, useTheme } from "@react-navigation/native";
import { api } from "../../../Constants";

const EmployeeSearch = () => {
  const [filterData, setFilterData] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [search, setSearch] = useState("");
  const { colors } = useTheme();
  const navigation = useNavigation();
  useEffect(() => {
    fetchCompany();
    return () => {};
  }, []);
  const fetchCompany = () => {
    const apiURL = `${api}/api/v1/profiles?select=isEmployee profile firstName category&limit=1000`;
    fetch(apiURL)
      .then((response) => response.json())
      .then((responseJson) => {
        setFilterData(responseJson.data);
        setMasterData(responseJson.data);
      })
      .catch((error) => {
        alert(error);
      });
  };
  const searchFilter = (text) => {
    if (text) {
      const newData = masterData.filter((item) => {
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilterData(newData);
      setSearch(text);
    } else {
      setFilterData(masterData);
      setSearch(text);
    }
  };
  const ItemView = ({ item }) => {
    return (
      <>
        {item.isEmployee === true && (
          <>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                marginHorizontal: 10,
                alignItems: "center",
              }}
              onPress={() =>
                navigation.navigate("ViewCompanyProfile", { id: item._id })
              }
            >
              <Image
                source={{ uri: `${api}/upload/${item.profile}` }}
                style={{ width: 50, height: 50, borderRadius: 30 }}
              />
              <View style={{ marginLeft: 10 }}>
                <Text style={{ color: colors.primaryText }}>
                  {item.firstName}
                </Text>
                <Text style={{ color: colors.secondaryText }}>
                  {item.category && item.category.name}
                </Text>
              </View>
            </TouchableOpacity>
            <View
              style={{
                borderWidth: 1,
                borderColor: colors.border,
                marginVertical: 10,
              }}
            />
          </>
        )}
      </>
    );
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#141414", height: "100%" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginHorizontal: 10,
        }}
      >
        <AntDesign
          name="left"
          size={24}
          color={colors.primaryText}
          onPress={() => navigation.goBack()}
        />
        <TextInput
          placeholder="Хайх утга..."
          value={search}
          onChangeText={(text) => searchFilter(text)}
          style={{
            backgroundColor: colors.border,
            padding: 15,
            width: "90%",
            marginLeft: 10,
            borderRadius: 20,
            color: colors.primaryText,
          }}
        />
      </View>
      <FlatList
        data={filterData}
        keyExtractor={(item, index) => index}
        renderItem={ItemView}
        ListHeaderComponent={
          <>
            <Text
              style={{
                color: colors.primaryText,
                fontFamily: "Sf-bold",
                fontSize: 20,
                marginHorizontal: 10,
                marginVertical: 20,
              }}
            >
              Ажил хайгч компани
            </Text>
          </>
        }
      />
    </SafeAreaView>
  );
};

export default EmployeeSearch;

const styles = StyleSheet.create({});
