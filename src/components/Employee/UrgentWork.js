import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import { api } from "../../../Constants";
import DataCountDown from "./DataCountDown";
import Icon from "@expo/vector-icons/Entypo";
import axios from "axios";
import UserContext from "../../context/UserContext";
import { Ionicons } from "@expo/vector-icons";
const UrgentWork = (props) => {
  const { id, createUser, occupation, type, urgent, salary } = props;
  const navigation = useNavigation();
  const state = useContext(UserContext);
  const { colors } = useTheme();
  const [checkLikeId, setCheckLikeId] = useState([]);
  const [isLike, setIsLike] = useState(false);
  const getCheckLike = () => {
    axios
      .get(`${api}/api/v1/likes/${state.userId}/job?limit=100`)
      .then((res) => {
        setCheckLikeId(res.data.data);
      })
      .catch((err) => {
        // alert(err);
      });
  };
  useEffect(() => {
    getCheckLike();
  }, []);
  useEffect(() => {
    setIsLike(checkLikeId.includes(`${id}`));
  }, [checkLikeId]);

  const unLiked = () => {
    axios
      .delete(`${api}/api/v1/likes/${id}/job`)
      .then((res) => {
        setIsLike(false);
        Alert.alert("Амжилттай устгалаа");
      })
      .catch((err) => {
        // alert(err);
      });
  };
  const liked = () => {
    axios
      .post(`${api}/api/v1/likes/${id}/job`)
      .then((res) => {
        setIsLike(true);
        Alert.alert("Амжилттай хадгаллаа");
      })
      .catch((err) => {
        // alert(err);
      });
  };
  const sendCv = (id) => {
    axios
      .post(`${api}/api/v1/applies/${id}`)
      .then((res) => {
        Alert.alert("Таны CV амжилттай илгээгдлээ.");
      })
      .catch((err) => {
        Alert.alert(err.response.data.error.message);
      });
  };
  return (
    <View
      style={{
        backgroundColor: "#2c3539",
        marginHorizontal: 5,
        paddingVertical: 5,
        marginVertical: 4,
        borderRadius: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 4,
        }}
      >
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={() =>
            navigation.navigate("WorkDetailScreen", {
              id: id,
              isLiked: isLike,
            })
          }
        >
          <Image
            source={{
              uri: `${api}/upload/${createUser.profile}`,
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
              {occupation.name}
              {/* Борлуулалт мэдээлэлийн ажилтан */}
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: colors.primaryText,
                fontFamily: "Sf-bold",
                fontWeight: "bold",
                width: "95%",
              }}
            >
              {/* {occupation.name} */}
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
              {salary}₮
            </Text>
            <Text
              style={{
                color: colors.primaryText,
                fontFamily: "Sf-regular",
                fontWeight: "200",
              }}
            >
              {type} - {createUser.name}
            </Text>
          </View>
        </TouchableOpacity>
        {!state.isCompany && (
          <View style={{ flexDirection: "row", marginRight: 10 }}>
            <Ionicons
              // send
              name="send-outline"
              size={26}
              color="white"
              style={{ marginRight: 10, top: 1 }}
              onPress={() => sendCv(id)}
            />
            <Icon
              name={isLike ? "heart" : "heart-outlined"}
              size={30}
              color={"white"}
              onPress={isLike ? unLiked : liked}
              style={{ textAlign: "right" }}
            />
          </View>
        )}
      </View>
      {urgent && <DataCountDown createdAt={urgent} />}
    </View>
  );
};

export default UrgentWork;

const styles = StyleSheet.create({});
