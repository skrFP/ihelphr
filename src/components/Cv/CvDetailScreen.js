import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import { api } from "../../../Constants";
import CompanyHeader from "../Header/CompanyHeader";
import { useNavigation, useTheme } from "@react-navigation/native";
import useUserProfile from "../../hooks/ProfileDetail/User/useUserProfile";
import MyButton from "../MyButton";
import Border from "../Border";

const CvDetailScreen = (props) => {
  const { id } = props.route.params;
  const [data, setData] = useState([]);
  const { colors } = useTheme();
  const [userProfile] = useUserProfile(id);
  const navigation = useNavigation();
  const getCvData = () => {
    axios
      .get(`${api}/api/v1/questionnaires/${id}`)
      .then((res) => {
        console.log(res.data.data, "ggwp");
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getCvData();
  }, []);
  if (!userProfile) {
    return null;
  }
  const html = `
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
    </head>
    <body>
    <h2 style="text-align: center;">
    <strong>${data.lastName} ${data.firstName}</strong>
  </h2>
  <p>&nbsp;</p>
  <div>
    <div class="row" style="display: flex;">
      <div class="column" style="flex: 50%;">
        <p style="padding-left: 40px; text-align: left;">
          <img src="${api}/upload/${data.profile}" width="172" height="255" />
        </p>
      </div>
      <div class="column" style="flex: 50%;">
        <p style="text-align: right;">
          <span style="color: #0000ff; background-color: #00ffff;">
            <strong>ХОЛБОО БАРИХ</strong>
          </span>
        </p>
        <p style="text-align: right;">
          <span style="font-weight: 400;">Born in ${data.birthPlace}</span>
        </p>
        <p style="text-align: right;">
          <span style="font-weight: 400;">Lives in ${data.location}</span>
        </p>
        <p style="text-align: right;">
          <span style="font-weight: 400;">Хаяг</span>
        </p>  
        <p style="text-align: right;">
            <span style="font-weight: 400;">${userProfile.email}</span>
        </p>
        <p style="text-align: right;">
          <span style="font-weight: 400;">И-мэйл</span>
        </p>
        <p style="text-align: right;">
          <span style="font-weight: 400;">${userProfile.phone}</span>
        </p>
        <p style="text-align: right;">
          <span style="font-weight: 400;">Утасны дугаар</span>
        </p>
      </div>
    </div>         
    <p style="padding-left: 40px;">
      <span style="color: #0000ff; background-color: #00ffff;">
        <strong>Ажлын туршлага</strong>
      </span>
    </p>
    ${
      data.experience &&
      data.experience.map((element) => {
        <ul>
          <li style="list-style-type: none;">
            <ul>
              <li style="font-weight: 400;" aria-level="1">
                <span style="font-weight: 400;">${element.position}</span>
                <strong>, ${element.company} </strong>
                <span style="font-weight: 400;">, </span>
                <em>
                  <span style="font-weight: 400;">${element.location}</span>
                </em>
                <span style="font-weight: 400;">, ${element.type}</span>
              </li>
            </ul>
          </li>
        </ul>;
      })
    }
    <p style="padding-left: 40px;">
      <span style="color: #0000ff; background-color: #00ffff;">
        <strong>EDUCATION</strong>
      </span>
    </p>
    <ul>
      <li style="list-style-type: none;">
        <ul>
          <li style="font-weight: 400;" aria-level="1">
            <span style="font-weight: 400;">International Business Management &amp; Marketing, Pre-master&rsquo;s program, </span>
            <em>
              <span style="font-weight: 400;">University of Sheffield, UK, 2019-2020</span>
            </em>
          </li>
          <li style="font-weight: 400;" aria-level="1">
            <span style="font-weight: 400;">Bachelor of International Economic Relations, </span>
            <em>
              <span style="font-weight: 400;">National University of Mongolia (NUM), School of International Relations and Public Administration (SIRPA), 2012 to 2016</span>
            </em>
          </li>
          <li style="font-weight: 400;" aria-level="1">
            <span style="font-weight: 400;">High school education, </span>
            <em>
              <span style="font-weight: 400;">Erdmiin san school, Erdenet city, Mongolia, 2009-2012</span>
            </em>
          </li>
        </ul>
      </li>
    </ul>
    <p style="padding-left: 40px;">
      <span style="color: #0000ff; background-color: #00ffff;">
        <strong>AWARDS</strong>
      </span>
    </p>
    <ul>
      <li style="list-style-type: none;">
        <ul>
          <li style="font-weight: 400;" aria-level="1">
            <span style="font-weight: 400;">Best of the year, Bloomberg TV Mongolia, National News Corporation LLC, 2019&nbsp;&nbsp;</span>
          </li>
          <li style="font-weight: 400;" aria-level="1">
            <span style="font-weight: 400;">The Leader Youngman of the Year, Mongolian Youth Organization, 2018</span>
          </li>
          <li style="font-weight: 400;" aria-level="1">
            <span style="font-weight: 400;">The first place in the essay contest, &ldquo;Passport to the world&rdquo;, Education USA /EARC/, 2016</span>
          </li>
          <li style="font-weight: 400;" aria-level="1">
            <span style="font-weight: 400;">The best delegate prize of the Model United Nations, awarded by NUM-SIRPA, 2015</span>
          </li>
          <li style="font-weight: 400;" aria-level="1">
            <span style="font-weight: 400;">Student&rsquo;s scholarship awarded by Zorig Foundation &amp; LG, 2014&nbsp;</span>
          </li>
          <li style="font-weight: 400;" aria-level="1">
            <span style="font-weight: 400;">3rd place in essay contest of World peaceful day, 2012</span>
          </li>
        </ul>
      </li>
    </ul>
    <p style="padding-left: 40px;">
      <span style="color: #0000ff; background-color: #00ffff;">
        <strong>LANGUAGE</strong>
      </span>
    </p>
    <ul>
      <li style="list-style-type: none;">
        <ul>
          <li style="font-weight: 400;" aria-level="1">
            <span style="font-weight: 400;">Native:</span>
            <span style="font-weight: 400;"> Mongolian, </span>
            <span style="font-weight: 400;">Advanced:</span>
            <span style="font-weight: 400;"> English</span>
          </li>
        </ul>
      </li>
    </ul>
    <p style="padding-left: 40px;">
      <span style="color: #0000ff; background-color: #00ffff;">
        <strong>Huviin ur chadvar</strong>
      </span>
    </p>
    <p style="padding-left: 40px;">
      <span style="color: #0000ff; background-color: #00ffff;">
        <strong>Ger buliin medeelel</strong>
      </span>
    </p>
  </div>
    </body>
  </html>
  `;
  const printToFile = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    const { uri } = await Print.printToFileAsync({
      html,
    });
    await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
  };

  return (
    <SafeAreaView style={{ backgroundColor: colors.header }}>
      <CompanyHeader isBack={true} />
      <ScrollView
        style={{ backgroundColor: colors.background }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{ marginHorizontal: 10, flexDirection: "row", marginTop: 10 }}
        >
          <Image
            source={{ uri: `${api}/upload/${data.profile}` }}
            style={{ width: 100, height: 100 }}
          />
          {/* Holboo barih */}
          <View
            style={{
              alignContent: "flex-end",
              width: "75%",
            }}
          >
            <Text
              style={{
                color: colors.primaryText,
                fontFamily: "Sf-bold",
                fontSize: 18,
                textAlign: "right",
              }}
            >
              Холбоо барих
            </Text>
            <Text style={{ color: colors.primaryText, textAlign: "right" }}>
              Born in {data.birthPlace}
            </Text>
            <Text style={{ color: colors.primaryText, textAlign: "right" }}>
              Lives in {data.location}
            </Text>
            <Text style={{ color: colors.primary, textAlign: "right" }}>
              {userProfile.email}
            </Text>
            <Text style={{ color: colors.primaryText, textAlign: "right" }}>
              И-мэйл
            </Text>
            <Text style={{ color: colors.primary, textAlign: "right" }}>
              {userProfile.phone}
            </Text>
            <Text style={{ color: colors.primaryText, textAlign: "right" }}>
              Утасны дугаар
            </Text>
          </View>
          {/* Experience */}
        </View>

        <View style={{ marginHorizontal: 10 }}>
          {data.experience && (
            <>
              <Text
                style={{
                  color: colors.primary,
                  fontFamily: "Sf-bold",
                  fontSize: 22,
                }}
              >
                Ажлын туршлага
              </Text>
              {data.experience.map((e) => {
                return (
                  <>
                    <View
                      style={{
                        flexDirection: "row",
                        width: "70%",
                        alignItems: "center",
                        marginTop: 10,
                      }}
                      key={e._id}
                    >
                      <Image
                        source={{ uri: `${api}/upload/${e.companyPhoto}` }}
                        style={{ width: 60, height: 60 }}
                      />
                      <View style={{ marginLeft: 10 }}>
                        <Text
                          style={{
                            fontFamily: "Sf-bold",
                            color: colors.primaryText,
                          }}
                        >
                          Компани: {e.company}
                        </Text>
                        <Text style={{ color: colors.primaryText }}>
                          Албан тушаал: {e.position}
                        </Text>
                        <Text style={{ color: colors.primaryText }}>
                          Цагийн төрөл: {e.type}
                        </Text>
                        <Text style={{ color: colors.primaryText }}>
                          Хаяг: {e.location}
                        </Text>
                        <Text style={{ color: colors.primaryText }}>
                          Ажилд орсон: {e.start && e.start.slice(0, 10)}
                        </Text>
                        <Text style={{ color: colors.primaryText }}>
                          Ажлаас гарсан: {e.end && e.end.slice(0, 10)}
                        </Text>
                        <Text style={{ color: colors.primaryText }}>
                          Ажлаас гарсан шалтгаан: {e.exitCause}
                        </Text>
                      </View>
                    </View>
                    <Border margin={10} />
                  </>
                );
              })}
            </>
          )}
          {data.course && (
            <>
              <Text
                style={{
                  color: colors.primary,
                  fontFamily: "Sf-bold",
                  fontSize: 22,
                }}
              >
                Боловсрол
              </Text>
              {data.course.map((e) => {
                return (
                  <>
                    <View
                      style={{
                        flexDirection: "row",
                        width: "70%",
                        alignItems: "center",
                        marginTop: 10,
                      }}
                      key={e._id}
                    >
                      <Image
                        source={{ uri: `${api}/upload/${e.schoolPhoto}` }}
                        style={{ width: 60, height: 60 }}
                      />
                      <View style={{ marginLeft: 10 }}>
                        <Text
                          style={{
                            fontFamily: "Sf-bold",
                            color: colors.primaryText,
                          }}
                        >
                          Сургууль: {e.school}
                        </Text>
                        <Text style={{ color: colors.primaryText }}>
                          Анги: {e.grade}
                        </Text>
                        <Text style={{ color: colors.primaryText }}>
                          Чиглэл: {e.field}
                        </Text>
                        <Text style={{ color: colors.primaryText }}>
                          Элссэн огноо: {e.start && e.start.slice(0, 10)}
                        </Text>
                        {e.end ? (
                          <Text style={{ color: colors.primaryText }}>
                            Гарсан огноо: {e.end && e.end.slice(0, 10)}
                          </Text>
                        ) : (
                          <Text style={{ color: colors.primaryText }}>
                            Төгссөн
                          </Text>
                        )}
                      </View>
                    </View>
                    <Border margin={10} />
                  </>
                );
              })}
            </>
          )}
          {data.achievement && (
            <>
              <Text
                style={{
                  color: colors.primary,
                  fontFamily: "Sf-bold",
                  fontSize: 22,
                }}
              >
                Шагнал медал
              </Text>
              {data.achievement.map((e) => {
                return (
                  <>
                    <View
                      style={{
                        width: "70%",
                        marginTop: 10,
                      }}
                      key={e._id}
                    >
                      <Text
                        style={{
                          fontFamily: "Sf-bold",
                          color: colors.primaryText,
                        }}
                      >
                        Компани: {e.company}
                      </Text>
                      <Text style={{ color: colors.primaryText }}>
                        Нэр: {e.name}
                      </Text>
                      <Text style={{ color: colors.primaryText }}>
                        Он: {e.year}
                      </Text>
                    </View>
                    <Border margin={10} />
                  </>
                );
              })}
            </>
          )}
          {data.language && (
            <>
              <Text
                style={{
                  color: colors.primary,
                  fontFamily: "Sf-bold",
                  fontSize: 22,
                }}
              >
                Хэлний чадвар
              </Text>
              {data.language.map((e) => {
                return (
                  <>
                    <View
                      style={{
                        width: "70%",
                        marginTop: 10,
                      }}
                      key={e._id}
                    >
                      <Text
                        style={{
                          fontFamily: "Sf-bold",
                          color: colors.primaryText,
                        }}
                      >
                        Улс: {e.country}
                      </Text>
                      <Text style={{ color: colors.primaryText }}>
                        Чадвар: {e.level}
                      </Text>
                    </View>
                    <Border margin={10} />
                  </>
                );
              })}
            </>
          )}
          {data.family && (
            <>
              <Text
                style={{
                  color: colors.primary,
                  fontFamily: "Sf-bold",
                  fontSize: 22,
                }}
              >
                Гэр бүлийн мэдээлэл
              </Text>
              {data.family.map((e) => {
                return (
                  <>
                    <View
                      style={{
                        width: "70%",
                        marginTop: 10,
                      }}
                      key={e._id}
                    >
                      {e.who && (
                        <Text style={{ color: colors.primaryText }}>
                          Хэн болох: {e.who}
                        </Text>
                      )}
                      {e.lastName && e.firstName && (
                        <Text
                          style={{
                            color: colors.primaryText,
                          }}
                        >
                          Овог нэр: {e.lastName} {e.firstName}
                        </Text>
                      )}
                      {e.profession && (
                        <Text style={{ color: colors.primaryText }}>
                          Мэргэжил: {e.profession}
                        </Text>
                      )}
                      {e.birthPlace && (
                        <Text style={{ color: colors.primaryText }}>
                          Төрсөн газар: {e.birthPlace}
                        </Text>
                      )}
                      {e.birthYear && (
                        <Text style={{ color: colors.primaryText }}>
                          Төрсөн он: {e.birthYear}
                        </Text>
                      )}
                      {e.workingCompany && (
                        <Text style={{ color: colors.primaryText }}>
                          Ажилдаг газар: {e.workingCompany}
                        </Text>
                      )}
                    </View>
                    <Border margin={10} />
                  </>
                );
              })}
            </>
          )}
          {data.skill && (
            <>
              <Text
                style={{
                  color: colors.primary,
                  fontFamily: "Sf-bold",
                  fontSize: 22,
                }}
              >
                Хувийн ур чадвар
              </Text>

              <View
                style={{
                  width: "70%",
                  marginTop: 10,
                }}
              >
                {data.skill.advantage1 && (
                  <Text style={{ color: colors.primaryText }}>
                    Чадвар1: {data.skill.advantage1}
                  </Text>
                )}
                {data.skill.advantage2 && (
                  <Text style={{ color: colors.primaryText }}>
                    Чадвар2: {data.skill.advantage2}
                  </Text>
                )}
                {data.skill.advantage3 && (
                  <Text style={{ color: colors.primaryText }}>
                    Чадвар3: {data.skill.advantage3}
                  </Text>
                )}
                {data.skill.advantage4 && (
                  <Text style={{ color: colors.primaryText }}>
                    Чадвар4: {data.skill.advantage4}
                  </Text>
                )}
                {data.skill.disAdvantage1 && (
                  <Text style={{ color: colors.primaryText }}>
                    Сул тал1: {data.skill.disAdvantage1}
                  </Text>
                )}
                {data.skill.disAdvantage2 && (
                  <Text style={{ color: colors.primaryText }}>
                    Сул тал2: {data.skill.disAdvantage2}
                  </Text>
                )}
                {data.skill.disAdvantage3 && (
                  <Text style={{ color: colors.primaryText }}>
                    Сул тал3: {data.skill.disAdvantage3}
                  </Text>
                )}
                {data.skill.disAdvantage4 && (
                  <Text style={{ color: colors.primaryText }}>
                    Сул тал4: {data.skill.disAdvantage4}
                  </Text>
                )}
              </View>
              <Border margin={10} />
            </>
          )}
        </View>
        <MyButton
          text={"Татах"}
          onPress={printToFile}
          style={{ marginHorizontal: 20, marginTop: 10 }}
        />
        <MyButton
          text={"Ажлын санал тавих"}
          style={{ marginHorizontal: 20, marginTop: 10 }}
          onPress={() => navigation.navigate("UserSendWorkRequest", { id: id })}
        />
        <MyButton
          text={"Профайл руу очих"}
          style={{ marginHorizontal: 20, marginTop: 10 }}
          onPress={() => navigation.navigate("ViewUserProfile", { id: id })}
        />

        <View style={{ marginVertical: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default CvDetailScreen;

const styles = StyleSheet.create({});
