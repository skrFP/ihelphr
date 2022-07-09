import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { api } from "../../../../../Constants";
import UserContext from "../../../../context/UserContext";
const CompanyUsedProduct = () => {
  const state = useContext(UserContext);
  const [history, setHistory] = useState([]);
  const getHistory = () => {
    axios
      .get(`${api}/api/v1/transactions/${state.companyId}/cv`)
      .then((res) => {
        setHistory(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getHistory();
  }, []);
  return (
    <View>
      {history.map((e) => {
        return (
          <View key={e._id}>
            <Text> {moment(e.createdAt).format("YYYY-MM-DD")} </Text>
            <Text>{e.explanation}</Text>
            <Text>{e.firstPoint}</Text>
            <Text>{e.point}</Text>
            <Text>{e.job}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default CompanyUsedProduct;

const styles = StyleSheet.create({});
