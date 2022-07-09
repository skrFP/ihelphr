import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { api } from "../../../Constants";
import { useNavigation, useTheme } from "@react-navigation/native";
import CircularProgress from "react-native-circular-progress-indicator";
const MyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const { colors } = useTheme();
  const navigation = useNavigation();
  const getJobs = () => {
    {
      /* profile occupationName salary type companyName */
    }
    axios
      .get(
        `${api}/api/v1/jobs?select=createUser occupation salary type percent&limit=1000`
      )
      .then((res) => {
        console.log(res.data.data);
        setJobs(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getJobs();
  }, []);

  return (
    <FlatList
      data={jobs}
      keyExtractor={(item, index) => index}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => {
        return (
          <View
            style={{
              backgroundColor: colors.background,
              marginHorizontal: 10,
              paddingVertical: 5,
              marginVertical: 4,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center" }}
                onPress={() => navigation.navigate("WorkDetailScreen", { id })}
              >
                <Image
                  source={{
                    uri: `${api}/upload/${item.createUser.profile}`,
                  }}
                  style={{
                    width: 75,
                    height: 75,
                    borderRadius: 30,
                    marginHorizontal: 5,
                  }}
                />

                <View>
                  <Text
                    style={{
                      fontSize: 15,
                      color: colors.primaryText,
                      fontFamily: "Sf-bold",
                      fontWeight: "bold",
                      width: "95%",
                    }}
                  >
                    {item.occupation && item.occupation.name}
                    {/* Борлуулалт мэдээлэлийн ажилтан */}
                  </Text>

                  <Text
                    style={{
                      paddingVertical: 5,
                      color: colors.primaryText,
                      fontFamily: "Sf-thin",
                      fontSize: 14,
                    }}
                  >
                    {item.salary}₮
                  </Text>
                  <Text
                    style={{
                      color: colors.primaryText,
                      fontFamily: "Sf-regular",
                      fontWeight: "200",
                    }}
                  >
                    {item.type} - {item.createUser.firstName}
                  </Text>
                </View>
              </TouchableOpacity>
              <View style={{ right: 10 }}>
                <CircularProgress
                  value={item.percent}
                  activeStrokeColor={colors.primary}
                  activeStrokeSecondaryColor={"#D76D77"}
                  inActiveStrokeOpacity={0.5}
                  progressValueColor={colors.border}
                  valueSuffix={"%"}
                  delay={1000}
                  radius={18}
                  activeStrokeWidth={5}
                  inActiveStrokeWidth={5}
                />
              </View>
            </View>
          </View>
        );
      }}
    />
  );
};

export default MyJobs;

const styles = StyleSheet.create({});
