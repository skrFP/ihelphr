import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ImageBackground,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../../../../Constants";
import UserContext from "../../../../context/UserContext";
const fullWidth = Dimensions.get("screen").width;
const CompanyPortfolia = () => {
  const [companyProfile, setCompanyProfile] = useState(null);
  const state = useContext(UserContext);
  let isMounted = true;
  const loadCompanyProfile = () => {
    axios
      .get(`${api}/api/v1/profiles/${state.companyId}?select=portfolio`)
      .then((res) => {
        if (isMounted) {
          setCompanyProfile(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadCompanyProfile();
    return () => {
      isMounted = false;
    };
  }, []);
  if (!companyProfile) {
    return null;
  }
  return (
    <>
      {companyProfile.portfolio && (
        <>
          {/* Portfolia 1-3*/}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <ImageBackground
              source={{
                uri: `${api}/upload/${companyProfile.portfolio.image1}`,
              }}
              style={{ width: fullWidth / 3.4, height: 130, flex: 0.33 }}
            />
            <ImageBackground
              source={{
                uri: `${api}/upload/${companyProfile.portfolio.image2}`,
              }}
              style={{ width: fullWidth / 3.4, height: 130, flex: 0.33 }}
            />
            <ImageBackground
              source={{
                uri: `${api}/upload/${companyProfile.portfolio.image3}`,
              }}
              style={{ width: fullWidth / 3.4, height: 130, flex: 0.33 }}
            />
          </View>
          {/* Portfolia 3-6*/}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 15,
              marginTop: 5,
            }}
          >
            <ImageBackground
              source={{
                uri: `${api}/upload/${companyProfile.portfolio.image4}`,
              }}
              style={{ width: fullWidth / 3.4, height: 130, flex: 0.33 }}
            />
            <ImageBackground
              source={{
                uri: `${api}/upload/${companyProfile.portfolio.image5}`,
              }}
              style={{ width: fullWidth / 3.4, height: 130, flex: 0.33 }}
            />
            <ImageBackground
              source={{
                uri: `${api}/upload/${companyProfile.portfolio.image6}`,
              }}
              style={{ width: fullWidth / 3.4, height: 130, flex: 0.33 }}
            />
          </View>
        </>
      )}
    </>
  );
};

export default CompanyPortfolia;

const styles = StyleSheet.create({});
