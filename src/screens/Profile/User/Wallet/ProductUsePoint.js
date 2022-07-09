import { Text, View, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import axios from "axios";
import { Feather } from "@expo/vector-icons";
import { api } from "../../../../../Constants";
const ProductUsePoint = ({ route }) => {
  const { type } = route.params;
  const { colors } = useTheme();
  const [posts, setPosts] = useState([]);
  const navigation = useNavigation();
  const getPosts = () => {
    axios
      .get(`${api}/api/v1/posts/cv?select=photo body isBoost`)
      .then((res) => {
        setPosts(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <View style={{ backgroundColor: colors.background }}>
      {type === "post" ? (
        <>
          {posts.map((item) => {
            return (
              <View
                key={item._id}
                style={{
                  marginHorizontal: 20,
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: 20,
                  padding: 10,
                  marginTop: 10,
                }}
              >
                {!item.sharePost && (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                    key={item._id}
                  >
                    {item.photo ? (
                      <Image
                        source={{ uri: `${api}/upload/${item.photo}` }}
                        style={{ width: 50, height: 50 }}
                      />
                    ) : (
                      <Image
                        source={require("../../../../../assets/ihelp/companyhead.png")}
                        style={{ width: 50, height: 50 }}
                      />
                    )}
                    <Text
                      style={{
                        color: colors.primaryText,
                        width: "76%",
                        marginLeft: 10,
                      }}
                    >
                      {item.body}{" "}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("BoostPost", { data: item });
                      }}
                    >
                      <Feather
                        name={item.isBoost ? "battery-charging" : "battery"}
                        size={24}
                        color={item.isBoost ? "green" : colors.primaryText}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            );
          })}
        </>
      ) : null}
    </View>
  );
};

export default ProductUsePoint;
