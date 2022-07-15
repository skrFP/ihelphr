import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../../Constants";
import Posts from "../../components/Network/Posts";

const ViewUserPost = (props) => {
  const { id } = props.route.params;
  const [activityData, setActivityData] = useState([]);

  const getActivityData = () => {
    axios
      .get(`${api}/api/v1/posts/${id}/user`)
      .then((res) => {
        setActivityData(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err.response, "aaa1");
      });
  };

  useEffect(() => {
    getActivityData();
  }, []);
  return (
    <ScrollView>
      {activityData &&
        activityData.map((item) => {
          return (
            <View key={item._id} style={{}}>
              {item.createUser && (
                <Posts
                  postId={item._id}
                  createUser={item.createUser}
                  createdAt={item.createdAt}
                  body={item.body}
                  photo={item.photo}
                  isShared={item.isShare}
                  sharedUser={item.sharePost && item.sharePost.createUser}
                  sharedCreatedAt={item.sharePost && item.sharePost.createdAt}
                  sharedBody={item.sharePost && item.sharePost.body}
                  sharedPhoto={item.sharePost && item.sharePost.photo}
                  likeCount={item.like}
                  commentCount={item.comment}
                  shareCount={item.share}
                  isLiked={item.isLiked}
                  isCompany={item.createUser.organization}
                  isBoost={item.isBoost}
                />
              )}
            </View>
          );
        })}
    </ScrollView>
  );
};

export default ViewUserPost;

const styles = StyleSheet.create({});
