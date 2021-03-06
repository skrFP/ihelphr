import { StyleSheet, View, FlatList, SafeAreaView } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useTheme } from "@react-navigation/native";
import DynamicFollowing from "../../components/Dynamic/DynamicFollowing";
import { api } from "../../../Constants";
import Empty from "../../components/Empty";
import UserContext from "../../context/UserContext";
const FollowedCompany = () => {
  const state = useContext(UserContext);
  const [followingData, setFollowingData] = useState([]);
  const { colors } = useTheme();
  const getFollowerData = () => {
    axios
      .get(
        `${api}/api/v1/follows/${
          state.isCompany ? state.companyId : state.userId
        }/cv`
      )
      .then((res) => {
        setFollowingData(res.data.data);
      })
      .catch((err) => {
        alert(`${err} aaa`);
      });
  };

  useEffect(() => {
    getFollowerData();
  }, []);
  return (
    <SafeAreaView style={{ backgroundColor: colors.header }}>
      <View style={{ backgroundColor: colors.background }}>
        {followingData.length > 0 ? (
          <FlatList
            data={followingData}
            keyExtractor={(item, index) => index}
            renderItem={({ item }) => {
              return (
                <View>
                  {state.isCompany ? (
                    <>
                      {!item.followUser.organization && (
                        <DynamicFollowing
                          followUser={item.followUser}
                          isFollowing={item.isFollowing}
                        />
                      )}
                    </>
                  ) : (
                    <>
                      {item.followUser.organization && (
                        <DynamicFollowing
                          followUser={item.followUser}
                          isFollowing={item.isFollowing}
                        />
                      )}
                    </>
                  )}
                </View>
              );
            }}
          />
        ) : (
          <Empty text="?????????? ?????? ???????????????? ??????????" />
        )}
      </View>
    </SafeAreaView>
  );
};

export default FollowedCompany;

const styles = StyleSheet.create({});
