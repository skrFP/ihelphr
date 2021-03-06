import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TextInput,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import AntDesign from "@expo/vector-icons/AntDesign";
import { api } from "../../../Constants";

const UserSearch = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [filterData, setFilterData] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    fetchUser();
    return () => {};
  }, []);
  const fetchUser = () => {
    const apiURL = `${api}/api/v1/cvs?select=isFollowing firstName lastName profile workingCompany status&limit=1000&organization=false`;
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
        const itemData = item.lastName
          ? item.lastName.toUpperCase()
          : "".toUpperCase();
        item.firstName ? item.firstName.toUpperCase() : "".toUpperCase();
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
      <TouchableOpacity
        style={{
          flexDirection: "row",
          marginHorizontal: 10,
          alignItems: "center",
        }}
        onPress={() => navigation.navigate("ViewUserProfile", { id: item._id })}
      >
        <ImageBackground
          style={{ width: 50, height: 50 }}
          source={{ uri: `${api}/upload/${item.profile}` }}
          imageStyle={{ borderRadius: 50 }}
        >
          <Image
            source={
              item.status === "opentowork"
                ? require("../../../assets/open.png")
                : item.status === "lookingForJob"
                ? require("../../../assets/looking.png")
                : item.status === "getEmployee"
                ? require("../../../assets/hiring.png")
                : null
            }
            style={{ width: 54, height: 54, right: 2, bottom: 2 }}
          />
        </ImageBackground>
        <View style={{ marginLeft: 10 }}>
          <Text style={{ color: colors.primaryText }}>
            {item.lastName} {item.firstName}
          </Text>
          <Text style={{ color: colors.secondaryText }}>
            {item.workingCompany ? item.workingCompany : "????????????"}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const ItemSeparatorView = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: "100%",
          backgroundColor: colors.border,
          marginVertical: 10,
        }}
      />
    );
  };
  return (
    <SafeAreaView>
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
          placeholder="???????? ????????..."
          value={search}
          onChangeText={(text) => searchFilter(text)}
          style={{
            backgroundColor: colors.border,
            padding: 10,
            width: "90%",
            marginLeft: 10,
            borderRadius: 20,
            color: colors.primaryText,
          }}
        />
      </View>
      <View
        style={{
          borderWidth: 1,
          borderColor: colors.border,
          marginVertical: 10,
        }}
      />
      <FlatList
        data={filterData}
        keyExtractor={(item, index) => index}
        ItemSeparatorComponent={ItemSeparatorView}
        renderItem={ItemView}
        ListHeaderComponent={
          <>
            <Text
              style={{
                color: colors.primaryText,
                fontFamily: "Sf-bold",
                fontSize: 20,
                marginBottom: 10,
                marginHorizontal: 10,
              }}
            >
              ?????????????????? ????????
            </Text>
          </>
        }
      />
    </SafeAreaView>
  );
};

export default UserSearch;

const styles = StyleSheet.create({});
