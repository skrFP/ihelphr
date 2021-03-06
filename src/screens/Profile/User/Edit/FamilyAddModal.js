import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  View,
} from "react-native";
import React, { useState } from "react";
import FormText from "../../../../components/FormText";
import axios from "axios";
import { api } from "../../../../../Constants";
import { useNavigation, useTheme } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
const FamilyAddModal = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const sendPersonalDetail = () => {
    axios
      .post(`${api}/api/v1/questionnaires/family`, family)
      .then((res) => navigation.goBack())
      .catch((err) => alert(err));
  };
  const [family, setFamily] = useState({
    birthPlace: "",
    birthYear: "",
    firstName: "",
    lastName: "",
    phone: "",
    profession: "",
    who: "",
  });

  const [error, setError] = useState({
    birthPlace: false,
    birthYear: false,
    firstName: false,
    lastName: false,
    phone: false,
    profession: false,
    who: false,
  });
  const checkBirthPlace = (text) => {
    setError({
      ...error,
      birthPlace: text.length < 2,
    });

    setFamily({
      ...family,
      birthPlace: text,
    });
  };
  const checkBirthYear = (text) => {
    setError({
      ...error,
      birthYear: text.length < 2,
    });

    setFamily({
      ...family,
      birthYear: text,
    });
  };
  const checkFirstName = (text) => {
    setError({
      ...error,
      firstName: text.length < 5,
    });

    setFamily({
      ...family,
      firstName: text,
    });
  };
  const checkLastName = (text) => {
    setError({
      ...error,
      lastName: text.length < 2,
    });

    setFamily({
      ...family,
      lastName: text,
    });
  };
  const checkPhone = (text) => {
    setError({
      ...error,
      phone: text.length < 5,
    });

    setFamily({
      ...family,
      phone: text,
    });
  };
  const checkProfession = (text) => {
    setError({
      ...error,
      profession: text.length < 2,
    });

    setFamily({
      ...family,
      profession: text,
    });
  };
  const checkWho = (text) => {
    setError({
      ...error,
      who: text.length < 2,
    });

    setFamily({
      ...family,
      who: text,
    });
  };
  return (
    <ScrollView style={{ marginHorizontal: 20 }}>
      <View style={{ marginBottom: 10 }} />
      <Text style={[styles.textTitle, { color: colors.primaryText }]}>
        ???????? ?????? ??????????
      </Text>
      <FormText
        value={family.who}
        onChangeText={checkWho}
        errorText="???????? ?????? ?????????? 2-20 ???????????????????? ??????????????."
        errorShow={error.who}
      />

      <Text style={[styles.textTitle, { color: colors.primaryText }]}>
        ????????
      </Text>
      <FormText
        value={family.lastName}
        onChangeText={checkLastName}
        errorText="???????? 2-20 ???????????????????? ??????????????."
        errorShow={error.lastName}
      />
      <Text style={[styles.textTitle, { color: colors.primaryText }]}>??????</Text>
      <FormText
        value={family.firstName}
        onChangeText={checkFirstName}
        errorText="??????  3-20 ???????????????????? ??????????????."
        errorShow={error.firstName}
      />
      <Text style={[styles.textTitle, { color: colors.primaryText }]}>
        ?????????? ???????????? ????????
      </Text>
      <FormText
        value={family.birthPlace}
        onChangeText={checkBirthPlace}
        errorText="?????????? ???????????? ????????  4-20 ???????????????????? ??????????????."
        errorShow={error.birthPlace}
      />
      <Text style={[styles.textTitle, { color: colors.primaryText }]}>
        ???????????? ??????
      </Text>
      <FormText
        value={family.birthYear.toString()}
        onChangeText={checkBirthYear}
        errorText="???????????? ?????? 3-20 ???????????????????? ??????????????."
        errorShow={error.birthYear}
      />

      <Text style={[styles.textTitle, { color: colors.primaryText }]}>
        ???????????? ?????????? ????????????
      </Text>
      <FormText
        value={family.phone.toString()}
        onChangeText={checkPhone}
        errorText=" ???????????? ?????????? ???????????? 3-20 ???????????????????? ??????????????."
        errorShow={error.phone}
      />
      <Text style={[styles.textTitle, { color: colors.primaryText }]}>
        ????????????????
      </Text>
      <FormText
        value={family.profession}
        onChangeText={checkProfession}
        errorText="???????????????? 3-20 ???????????????????? ??????????????."
        errorShow={error.profession}
      />

      <TouchableOpacity
        onPress={sendPersonalDetail}
        style={{
          marginTop: 20,
          borderRadius: 20,
        }}
      >
        <LinearGradient
          colors={["#3A1C71", "#D76D77", "#FFAF7B"]}
          style={{
            paddingVertical: 10,
            borderRadius: 20,
          }}
          start={[0.0, 0.5]}
          end={[1.0, 0.5]}
        >
          <Text style={{ color: colors.primaryText, textAlign: "center" }}>
            {" "}
            ????????????????{" "}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default FamilyAddModal;

const styles = StyleSheet.create({
  textTitle: {
    fontFamily: "Sf-thin",
    marginVertical: 8,
  },
});
