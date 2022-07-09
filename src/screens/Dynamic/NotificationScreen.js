import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigation, useTheme } from "@react-navigation/native";
import { api } from "../../../Constants";
import UserContext from "../../context/UserContext";
import Header from "../../components/Header/Header";

const NotificationScreen = () => {
  const state = useContext(UserContext);
  const [notifData, setNotifData] = useState([]);
  const { colors } = useTheme();
  const navigation = useNavigation();
  const getNotification = () => {
    axios
      .get(`${api}/api/v1/notifications/${state.userId}/user?limit=1000`)
      .then((res) => {
        setNotifData(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        alert(err);
      });
  };
  useEffect(() => {
    getNotification();
  }, []);
  return (
    <SafeAreaView style={{ backgroundColor: colors.header }}>
      <Header isBack={true} />
      <FlatList
        data={notifData}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => {
          console.log(item, "aaa");
          return (
            <TouchableOpacity
              style={{
                borderWidth: 1,
                padding: 10,
                marginHorizontal: 20,
                borderColor: colors.border,
                borderRadius: 30,
                marginTop: 10,
                backgroundColor: item.isRead
                  ? colors.border
                  : colors.background,
              }}
              onPress={() => {
                navigation.navigate("NotiffPostDetailScreen", {
                  id: item.like && item.like.post,
                  isRead: item._id,
                });
              }}
            >
              {item.who && (
                <View style={{ flexDirection: "row" }}>
                  <Image
                    source={{ uri: `${api}/upload/${item.who.profile}` }}
                    style={{ width: 50, height: 50, borderRadius: 50 }}
                  />
                  <Text
                    style={{
                      color: colors.primaryText,
                      width: "80%",
                      marginLeft: 10,
                      fontFamily: item.isRead ? "Sf-bold" : "Sf-thin",
                    }}
                  >
                    {item.who.lastName} {item.who.firstName}-д таны пост
                    таалагдсан
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({});
