import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../../Constants";
import Empty from "../../components/Empty";
import EmployeeWork from "../../components/Employee/EmployeeWork";
import UserContext from "../../context/UserContext";
const EmployeeSavedWork = () => {
  const state = useContext(UserContext);
  const [savedWork, setSavedWork] = useState([]);
  const getSavedWork = () => {
    axios
      .get(`${api}/api/v1/likes/${state.userId}/announcements`)
      .then((res) => {
        setSavedWork(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };
  useEffect(() => {
    getSavedWork();
  }, []);
  return (
    <ScrollView>
      {savedWork.length > 0 ? (
        savedWork.map((item) => {
          return (
            <View key={item._id}>
              {item.announcement && (
                <EmployeeWork
                  id={item.announcement._id}
                  createUser={item.announcement.createUser}
                  occupation={item.announcement.occupation}
                  type={item.announcement.skill}
                  salary={item.announcement.price}
                />
              )}
            </View>
          );
        })
      ) : (
        <Empty text={"Та ажлын зар хадгалаагүй байна"} />
      )}
    </ScrollView>
  );
};

export default EmployeeSavedWork;

const styles = StyleSheet.create({});
