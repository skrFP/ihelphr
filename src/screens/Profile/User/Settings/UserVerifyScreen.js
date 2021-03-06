import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { ScrollView } from "react-native-gesture-handler";
import { api } from "../../../../../Constants";
import { LinearGradient } from "expo-linear-gradient";
import Border from "../../../../components/Border";
import MyButton from "../../../../components/MyButton";
const UserVerifyScreen = (props) => {
  const { data, cv } = props.route.params;
  const { colors } = useTheme();
  const [frontIdCard, setFrontIdCardImage] = useState("");
  const [backIdCard, setBackIdCardImage] = useState("");
  const [selfie, setSelfie] = useState("");
  const [uploadTotal, setUploadTotal] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);
  const navigation = useNavigation();
  const handleUploadComplete = () => {
    setUploadProgress(0);
    setUploadTotal(0);
    // props.navigation.navigate("Detail", { id: bookId });
  };
  const handleUploadProgress = (event) => {
    if (uploadTotal === 0) setUploadTotal(event.total);

    setUploadProgress((uploadProgress) => {
      return Math.round((event.loaded * 100) / event.total);
    });
  };

  // Front Camera
  const cameraImageFrontCardLibrary = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("zurgiin erhiig neene uu");
    }
    if (status === "granted") {
      const response = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [16, 9],
      });
      if (!response.cancelled) {
        setFrontIdCardImage(response.uri);
      }
    }
  };
  const openImageFrontCardLibrary = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("zurgiin erhiig neene uu");
    }
    if (status === "granted") {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
      });
      if (!response.cancelled) {
        setFrontIdCardImage(response.uri);
      }
    }
  };
  const uploadFrontIdCard = async () => {
    const xhr = new XMLHttpRequest();
    const fileExt = frontIdCard.substring(frontIdCard.lastIndexOf(".") + 1);
    xhr.addEventListener("load", (event) => handleUploadComplete(event));
    xhr.upload.addEventListener("progress", handleUploadProgress);
    const formData = new FormData();
    formData.append("file", {
      uri: frontIdCard,
      type: `image/${fileExt}`,
      name: "new__profile",
    });
    xhr.open("PUT", `${api}/api/v1/cvs/profile`);
    xhr.send(formData);
    Alert.alert("?????????????????? ??????????????????", "", [
      { text: "????", onPress: () => navigation.goBack() },
    ]);
  };
  // Back camera
  const cameraImageBackCardLibrary = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("zurgiin erhiig neene uu");
    }
    if (status === "granted") {
      const response = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [16, 9],
      });
      if (!response.cancelled) {
        setBackIdCardImage(response.uri);
      }
    }
  };
  const openImageBackCardLibrary = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("zurgiin erhiig neene uu");
    }
    if (status === "granted") {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
      });
      if (!response.cancelled) {
        setBackIdCardImage(response.uri);
      }
    }
  };
  const uploadBackIdCard = async () => {
    const xhr = new XMLHttpRequest();
    const fileExt = backIdCard.substring(backIdCard.lastIndexOf(".") + 1);
    xhr.addEventListener("load", (event) => handleUploadComplete(event));
    xhr.upload.addEventListener("progress", handleUploadProgress);
    const formData = new FormData();
    formData.append("file", {
      uri: backIdCard,
      type: `image/${fileExt}`,
      name: "new__profile",
    });
    xhr.open("PUT", `${api}/api/v1/cvs/profile`);
    xhr.send(formData);
    Alert.alert("?????????????????? ??????????????????", "", [
      { text: "????", onPress: () => navigation.goBack() },
    ]);
  };
  // Selfie
  const cameraImageSelfieLibrary = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("zurgiin erhiig neene uu");
    }
    if (status === "granted") {
      const response = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [16, 9],
      });
      if (!response.cancelled) {
        setSelfie(response.uri);
      }
    }
  };
  const openImageSelfieLibrary = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("zurgiin erhiig neene uu");
    }
    if (status === "granted") {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
      });
      if (!response.cancelled) {
        setSelfie(response.uri);
      }
    }
  };

  if (uploadTotal < 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text
          style={{
            marginBottom: 20,
            fontWeight: "bold",
            fontSize: 16,
            color: colors.primaryText,
            fontFamily: "Sf-thin",
          }}
        >
          ?????? ?????????????? ????. ?????????????? ???????????? ??????????...
        </Text>
        <ActivityIndicator size={"small"} color={colors.primaryText} />
      </View>
    );
  }
  return (
    <ScrollView style={{ marginTop: 20 }}>
      <Image
        source={{
          uri: `${api}/upload/${data.profile}`,
        }}
        style={{
          height: 150,
          width: 150,
          alignSelf: "center",
          borderRadius: 100,
          resizeMode: "contain",
          marginBottom: 20,
        }}
      />
      <Text
        style={{
          color: colors.primaryText,
          fontWeight: "bold",
          fontSize: 18,
          textAlign: "center",
        }}
      >
        {data.lastName.slice(0, 1)}.{data.firstName}
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignSelf: "center",
          marginVertical: 5,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: colors.primaryText,
          }}
        >
          {data.workingCompany}{" "}
        </Text>
        <Text
          style={{
            color: colors.primaryText,
          }}
        >
          @{data.profession}
        </Text>
      </View>
      <Text
        style={{
          fontSize: 12,
          color: colors.secondaryText,
          fontFamily: "Sf-thin",
          textAlign: "justify",
          marginHorizontal: 15,
          marginVertical: 10,
        }}
      >
        ??????????????: ???? ???????????? ?????????????? ???????????????????????????????? ???????????? ihelp ????????????????????
        ?????????????????? ???????????? ?????????? ???????????? ???????? ?????????? ??????????. ?????????? ????: ???????? ?????????? ??????
        ???????? ???????????? ?????? ?????????? ?????????? ???? ????????????????, ???????????????? ?????????????? ??????????????,
        ???????????? ?????????? ?????????????????? ?????????? ???????????????????? ?????????? ???????????????? ?????????????? ????????????
        ??????????????.
      </Text>
      {/* Front Camera */}
      <View
        style={{
          borderWidth: 1,
          borderColor: colors.border,
          marginVertical: 20,
        }}
      />
      <Text
        style={{
          color: colors.primaryText,
          fontSize: 18,
          marginBottom: 10,
          marginLeft: 15,
        }}
      >
        ???????????? ????????????
      </Text>
      <Text
        style={{
          color: colors.primaryText,
          marginLeft: 15,
          marginVertical: 10,
          fontFamily: "Sf-thin",
        }}
      >
        1. ?????????????? ?????????????? (?????? ??????)
      </Text>
      <View
        style={{
          width: "80%",
          height: 200,
          marginVertical: 10,
          alignSelf: "center",
          backgroundColor: colors.border,
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <AntDesign
          name="camerao"
          size={30}
          color={"black"}
          style={{ marginTop: 80 }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          marginVertical: 10,
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <TouchableOpacity
          style={{
            borderRadius: 20,
            paddingVertical: 10,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: colors.border,
            paddingHorizontal: 20,
          }}
          onPress={cameraImageFrontCardLibrary}
        >
          <Text style={{ textAlign: "center", color: colors.primaryText }}>
            ?????????? ??????????
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderRadius: 20,
            paddingVertical: 10,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: colors.border,
            paddingHorizontal: 20,
          }}
          onPress={openImageFrontCardLibrary}
        >
          <Text style={{ textAlign: "center", color: colors.primaryText }}>
            ?????????? ????????????
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderRadius: 20,
            paddingVertical: 10,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: colors.border,
            paddingHorizontal: 20,
            backgroundColor: "#FFB6C1",
          }}
          onPress={openImageFrontCardLibrary}
        >
          <Text style={{ textAlign: "center", color: "black" }}>????????????????</Text>
        </TouchableOpacity>
      </View>

      {/* Front Camera end */}

      {/* Back camera */}
      <View
        style={{
          borderWidth: 1,
          borderColor: colors.border,
          marginVertical: 20,
        }}
      />

      <Text
        style={{
          color: colors.primaryText,
          marginLeft: 15,
          marginVertical: 10,
          fontFamily: "Sf-thin",
        }}
      >
        2. ?????????????? ?????????????? (?????? ??????)
      </Text>
      <View
        style={{
          width: "80%",
          height: 200,
          marginVertical: 10,
          alignSelf: "center",
          backgroundColor: colors.border,
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <AntDesign
          name="camerao"
          size={30}
          color={"black"}
          style={{ marginTop: 80 }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          marginVertical: 10,
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <TouchableOpacity
          style={{
            borderRadius: 20,
            paddingVertical: 10,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: colors.border,
            paddingHorizontal: 20,
          }}
          onPress={cameraImageFrontCardLibrary}
        >
          <Text style={{ textAlign: "center", color: colors.primaryText }}>
            ?????????? ??????????
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderRadius: 20,
            paddingVertical: 10,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: colors.border,
            paddingHorizontal: 20,
          }}
          onPress={openImageFrontCardLibrary}
        >
          <Text style={{ textAlign: "center", color: colors.primaryText }}>
            ?????????? ????????????
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderRadius: 20,
            paddingVertical: 10,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: colors.border,
            paddingHorizontal: 20,
            backgroundColor: "#FFB6C1",
          }}
          onPress={openImageFrontCardLibrary}
        >
          <Text style={{ textAlign: "center", color: "black" }}>????????????????</Text>
        </TouchableOpacity>
      </View>
      {/* Back Camera End */}
      {/* ???????????? camera */}
      <View
        style={{
          borderWidth: 1,
          borderColor: colors.border,
          marginVertical: 20,
        }}
      />

      <Text
        style={{
          color: colors.primaryText,
          marginLeft: 15,
          marginVertical: 10,
          fontFamily: "Sf-thin",
        }}
      >
        3. ?????????????? ???????????????????? ???????? selfie ??????????
      </Text>
      <Text
        style={{
          color: colors.primaryText,
          marginLeft: 15,
          marginVertical: 10,
          fontFamily: "Sf-thin",
          fontSize: 12,
        }}
      >
        ??????????????: ?????????????? ?????????????????? ???????????? ?????????? ?????????? ?????? ???????????????? ???????????? selfie
        ?????????????? ?????? ????????????
      </Text>
      <View
        style={{
          width: "80%",
          height: 200,
          marginVertical: 10,
          alignSelf: "center",
          backgroundColor: colors.border,
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <AntDesign
          name="camerao"
          size={30}
          color={"black"}
          style={{ marginTop: 80 }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          marginVertical: 10,
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <TouchableOpacity
          style={{
            borderRadius: 20,
            paddingVertical: 10,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: colors.border,
            paddingHorizontal: 20,
          }}
          onPress={cameraImageFrontCardLibrary}
        >
          <Text style={{ textAlign: "center", color: colors.primaryText }}>
            ?????????? ??????????
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderRadius: 20,
            paddingVertical: 10,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: colors.border,
            paddingHorizontal: 20,
          }}
          onPress={openImageFrontCardLibrary}
        >
          <Text style={{ textAlign: "center", color: colors.primaryText }}>
            ?????????? ????????????
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderRadius: 20,
            paddingVertical: 10,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: colors.border,
            paddingHorizontal: 20,
            backgroundColor: "#FFB6C1",
          }}
          onPress={openImageFrontCardLibrary}
        >
          <Text style={{ textAlign: "center", color: "black" }}>????????????????</Text>
        </TouchableOpacity>
      </View>
      {/* Back Camera End */}
      {/* ?????????????? */}
      <View
        style={{
          borderWidth: 1,
          borderColor: colors.border,
          marginVertical: 20,
        }}
      />

      <Text
        style={{
          color: colors.primaryText,
          marginLeft: 15,
          marginVertical: 10,
          fontFamily: "Sf-thin",
        }}
      >
        4. ???????????? ???????????? ??????????????
      </Text>
      <Text
        style={{
          color: colors.primaryText,
          marginLeft: 15,
          marginVertical: 10,
          fontFamily: "Sf-thin",
          fontSize: 12,
        }}
      >
        ??????????????: ???? ???????????? ???????????????? ???????????????? ???????????? ???????? ?????????? ???????????? ??????????????????
        ?????????????? ???? ???????? ?????????????? ????.
      </Text>
      <Text
        style={{
          color: colors.primaryText,
          marginLeft: 15,
          fontFamily: "Sf-thin",
          fontSize: 12,
        }}
      >
        ?????????? ????:
      </Text>
      <View
        style={{
          backgroundColor: "white",
          marginVertical: 10,
          paddingVertical: 10,
          paddingBottom: 15,
          borderWidth: 1,
          borderRadius: 10,
          marginHorizontal: 10,
          borderColor: colors.border,
        }}
      >
        <Text
          style={{
            fontFamily: "Sf-thin",
            fontSize: 12,
            textAlign: "center",
            marginTop: 10,
          }}
        >
          ???????????????? ??????-??
        </Text>
        <Text
          style={{
            fontFamily: "Sf-thin",
            fontSize: 12,
            marginTop: 10,
            marginLeft: 30,
          }}
        >
          ?????????????? ???????????? ????:
        </Text>
        <Text
          style={{
            fontFamily: "Sf-thin",
            fontSize: 12,
            marginTop: 10,
            textAlign: "justify",
            marginHorizontal: 30,
          }}
        >
          {"     "}?????????? ?????? ........ ?????????????? ....... ???? (?????????????????????? N??:
          ............) ???????????????? ??????-?????? ihelp ???????????????????? ???????????????????????? ??????????????????
          ???????????????? ???????????????? ???????????? ???????????? ???????????????? ???????? ?????????????? ??????????????????????????
          ???????????? ?????? ???????????????????????? ???????? ?????? ?????????????? ????????????????. ???????? ?????????? ????????????
          ?????????????????????????? ?????????? ???????? ???????????? ???????? ????.
        </Text>
        <Text
          style={{
            fontFamily: "Sf-thin",
            fontSize: 12,
            marginTop: 10,
            marginHorizontal: 30,
            textAlign: "right",
          }}
        >
          ?????????????? ????????????????: (?????????? ????????)
        </Text>
        <Text
          style={{
            fontFamily: "Sf-thin",
            fontSize: 12,
            marginTop: 10,
            marginHorizontal: 30,
            textAlign: "right",
          }}
        >
          ??????????: (??????.??????.????????)
        </Text>
      </View>
      <View
        style={{
          width: "80%",
          height: 200,
          marginVertical: 10,
          alignSelf: "center",
          backgroundColor: colors.border,
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <AntDesign
          name="camerao"
          size={30}
          color={"black"}
          style={{ marginTop: 80 }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          marginVertical: 10,
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <TouchableOpacity
          style={{
            borderRadius: 20,
            paddingVertical: 10,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: colors.border,
            paddingHorizontal: 20,
          }}
          onPress={cameraImageFrontCardLibrary}
        >
          <Text style={{ textAlign: "center", color: colors.primaryText }}>
            ?????????? ??????????
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderRadius: 20,
            paddingVertical: 10,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: colors.border,
            paddingHorizontal: 20,
          }}
          onPress={openImageFrontCardLibrary}
        >
          <Text style={{ textAlign: "center", color: colors.primaryText }}>
            ?????????? ????????????
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderRadius: 20,
            paddingVertical: 10,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: colors.border,
            paddingHorizontal: 20,
            backgroundColor: "#FFB6C1",
          }}
          onPress={openImageFrontCardLibrary}
        >
          <Text style={{ textAlign: "center", color: "black" }}>????????????????</Text>
        </TouchableOpacity>
      </View>
      {/* Back Camera End */}
      <TouchableOpacity
        onPress={props.onClick}
        style={{
          borderRadius: 20,
          paddingVertical: 10,
          borderRadius: 20,
          marginBottom: 20,
          marginHorizontal: 10,
        }}
      >
        <LinearGradient
          colors={["#3A1C71", "#D76D77", "#FFAF7B"]}
          style={{
            paddingVertical: 10,
            borderRadius: 20,
            paddingHorizontal: 20,
          }}
          start={[0.0, 0.5]}
          end={[1.0, 0.5]}
        >
          <Text style={{ color: "white", textAlign: "center" }}> ???????????? </Text>
        </LinearGradient>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default UserVerifyScreen;

const styles = StyleSheet.create({});
