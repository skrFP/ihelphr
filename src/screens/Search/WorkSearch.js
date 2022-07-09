import { SafeAreaView, Text, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import axios from "axios";
import { api } from "../../../Constants";
import MyButton from "../../components/MyButton";
import Empty from "../../components/Empty";
import SearchByOccupation from "./Work/SearchByOccupation";
import NormalWork from "../../components/Employer/NormalWork";
import Header from "../../components/Header/Header";
const WorkSearch = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [works, setWorks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [choosedId, setChoosedId] = useState("62905a514be9675d77e52356");
  const [choosedName, setChoosedName] = useState("Сонгох");
  const [refresh, setRefresh] = useState(false);
  const getWorkSearch = () => {
    axios
      .get(
        `${api}/api/v1/jobs/${choosedId}/occupation?limit=1000?select=_id createUser occupation type salary`
      )
      .then((res) => {
        setWorks(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    setRefresh(false);
    getWorkSearch();
  }, [refresh]);
  return (
    <>
      <SafeAreaView
        style={{ backgroundColor: "#141414", opacity: modalVisible ? 0.2 : 1 }}
      >
        <Header isBack={true} />
        <View style={{ height: "100%", backgroundColor: colors.background }}>
          <MyButton
            text={choosedName}
            onPress={() => setModalVisible(true)}
            style={{ marginTop: 20 }}
          />
          {works.length > 0 ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={works}
              keyExtractor={(item, index) => index}
              renderItem={({ item }) => {
                return (
                  <View style={{ marginTop: 5 }}>
                    <NormalWork
                      id={item._id}
                      createUser={item.createUser}
                      occupation={item.occupation}
                      type={item.type}
                      salary={item.salary}
                    />
                  </View>
                );
              }}
            />
          ) : (
            <View style={{ marginTop: 200 }}>
              <Empty text="Таны хайсан ажлын байр одоогоор байхгүй байна" />
            </View>
          )}
        </View>
      </SafeAreaView>
      <SearchByOccupation
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        setChoosedId={setChoosedId}
        setRefresh={setRefresh}
        setChoosedName={setChoosedName}
      />
    </>
  );
};

export default WorkSearch;
