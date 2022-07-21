import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { api } from "../../../Constants";
import { useNavigation, useTheme } from "@react-navigation/native";
import MyJobsDatas from "./Work/MyJobsDatas";
const MyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const { colors } = useTheme();
  const navigation = useNavigation();
  const getJobs = () => {
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
      data={jobs.sort((a, b) => b.percent - a.percent)}
      keyExtractor={(item, index) => index}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => {
        return (
          <MyJobsDatas
            id={item._id}
            createUser={item.createUser}
            occupation={item.occupation}
            type={item.type}
            salary={item.salary}
            percent={item.percent}
          />
        );
      }}
    />
  );
};

export default MyJobs;

const styles = StyleSheet.create({});
