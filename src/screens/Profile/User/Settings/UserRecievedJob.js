import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigation, useTheme } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import Empty from "../../../../components/Empty";
import { api } from "../../../../../Constants";
import UserContext from "../../../../context/UserContext";
const UserRecievedJob = () => {
  const state = useContext(UserContext);
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [work, setWork] = useState([]);
  const getWorkRequest = () => {
    axios
      .get(`${api}/api/v1/invitations/${state.userId}/cv`)
      .then((res) => {
        setWork(res.data.data);
      })
      .catch((err) => {
        alert(err);
        console.log(err);
      });
  };
  useEffect(() => {
    getWorkRequest();
  }, []);

  return (
    <View>
      {work.length === 0 ? (
        <Empty text={"Танд ажлын санал ирээгүй байна"} />
      ) : (
        <FlatList
          data={work}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => {
            return (
              <>
                {item.createUser && (
                  <TouchableOpacity
                    style={{
                      marginHorizontal: 20,
                      marginTop: 20,
                      borderWidth: 1,
                      padding: 10,
                    }}
                    onPress={() =>
                      item.createUser.organization
                        ? navigation.navigate("CompanyProfileDetail", {
                            id: item.createUser._id,
                          })
                        : navigation.navigate("UserProfileDetail", {
                            id: item.createUser._id,
                          })
                    }
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <Image
                          source={{
                            uri: `${api}/upload/${item.createUser.profile}`,
                          }}
                          style={{ width: 50, height: 50, borderRadius: 50 }}
                        />
                        {item.createUser.organization ? (
                          <Text style={{ color: colors.primaryText }}>
                            {item.createUser.name}
                          </Text>
                        ) : (
                          <Text style={{ color: colors.primaryText }}>
                            {item.createUser.firstName}{" "}
                            {item.createUser.lastName}
                          </Text>
                        )}
                      </View>

                      <AntDesign
                        name="caretright"
                        size={24}
                        color={colors.primary}
                      />
                    </View>

                    <View>
                      <Text style={{ color: colors.primaryText }}>
                        Албан тушаал: {item.occupation}{" "}
                      </Text>
                      <Text style={{ color: colors.primaryText }}>
                        Цалин: {item.salary}{" "}
                      </Text>
                      <Text style={{ color: colors.primaryText }}>
                        Хийх ажил: {item.description}{" "}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              </>
            );
          }}
        />
      )}
    </View>
  );
};

export default UserRecievedJob;

const styles = StyleSheet.create({});
