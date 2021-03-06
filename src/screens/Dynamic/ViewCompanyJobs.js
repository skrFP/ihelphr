import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import useCompanyJobs from "../../hooks/ProfileDetail/Company/useCompanyJobs";
import CompanyJobs from "../../components/Profile/Company/CompanyJobs";

const ViewCompanyJobs = (props) => {
  const { id } = props.route.params;
  const [companyJobs, loading] = useCompanyJobs(id);
  return (
    <ScrollView>
      {companyJobs.map((data) => {
        return (
          <View key={data._id}>
            <CompanyJobs
              id={data._id}
              createUser={data.createUser}
              occupation={data.occupation}
              type={data.type}
              salary={data.salary}
              count={data.count}
            />
          </View>
        );
      })}
    </ScrollView>
  );
};

export default ViewCompanyJobs;

const styles = StyleSheet.create({});
