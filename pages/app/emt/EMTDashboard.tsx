import React from "react";
import { View, Text, Image } from "react-native";
import { StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Colors } from "../../../assets/color/colors";
import { useNavigation } from "@react-navigation/native";
import Header from "../../components/Header";

const activities = [
  {
    id: "1",
    title: "2 Injured at Gros Piton",
    time: "25th Jan, 10:23 AM",
  },
  {
    id: "2",
    title: "3 Injured at Pigeon Island",
    time: "12th Jan, 10:02 AM",
  },
  {
    id: "3",
    title: "4 Injured at Marigot Bay",
    time: "01st Jan, 10:00 AM",
  },
];

const getActivityDetails = (id: string) => {
  const icon = require("../../../assets/images/EMT/recentActivity.png");

  switch (id) {
    case "1":
      return { icon, bgColor: "#FBBC04" };
    case "2":
      return { icon, bgColor: "#E2141E" };
    case "3":
      return { icon, bgColor: "#090A50" };
    default:
      return { icon, bgColor: "#000000" };
  }
};

export default function EMTDashboard() {
  const navigation = useNavigation<any>();
  return (
    <View style={{ flex: 1 }}>
      <Header title="SafeDrive" showBackButton={false} />
      <View style={styles.container}>
        {/* Officer Info */}
        <View style={styles.profileCard}>
          <View>
            <Text style={styles.profileTitle}>EMT Request</Text>
          </View>
          <View style={styles.profileDetails}>
            <Text style={styles.officerName}>Record details for incident report</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={[styles.actionCard]}
            onPress={() => navigation.navigate('EmtRequest')}
          >
            <View style={styles.cardContentColumn}>
              <Text style={styles.actionText}>Severe Cases</Text>
              <Text style={styles.actionDesc}>19</Text>

              {/* image row aligned to right */}
              <Image
                source={require("../../../assets/images/EMT/savereCases.png")}
                style={styles.actionImage}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionCard]}
            onPress={() => navigation.navigate('TowDispatch')}
          >
            <View style={styles.cardContentColumn}>
              <Text style={styles.actionText}>Other Cases</Text>
              <Text style={styles.actionDesc}>23</Text>

              <Image
                source={require("../../../assets/images/EMT/otherCases.png")}
                style={styles.actionImageTow}
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* Recent Activities */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Recent Activities</Text>
          <FlatList
            data={activities}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 20 }}
            renderItem={({ item }) => {
              const { icon, bgColor } = getActivityDetails(item.id);
              return (
                <View style={styles.listItem}>
                  <View style={[styles.iconSection, { backgroundColor: bgColor }]}>
                    <Image source={icon} style={[styles.activityIcon]} />
                  </View>
                  <View style={styles.listText}>
                    <Text style={styles.activityTitle}>{item.title}</Text>
                    <Text style={styles.activityTime}>{item.time}</Text>
                  </View>
                </View>
              );
            }}
          />
        </View>
      </View >
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
  },
  profileCard: {
    backgroundColor: Colors.background,
    paddingHorizontal: 5,
    marginBottom: 40,
  },
  profileTitle: {
    fontSize: 26,
    fontFamily: "Roboto-Medium",
    color: Colors.text,
  },
  profileDetails: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  officerImage: {
    width: 25,
    height: 25,
  },
  officerName: {
    color: Colors.textSecondary,
    fontSize: 14,
    fontFamily: "Inter-Regular",
  },
  actionsRow: {
    flexDirection: "row",
    gap: 20,
    paddingHorizontal: 5,
    marginBottom: 30,
  },
  actionCard: {
    flex: 1,
    borderRadius: 17,
    paddingVertical: 8,
    paddingHorizontal: 13,
    justifyContent: "flex-start",
    backgroundColor: Colors.sortBtn,
    borderWidth: 1,
    borderColor: Colors.inputBG
  },
  cardContentColumn: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  actionText: {
    fontSize: 17,
    fontFamily: "Inter-Medium",
    color: Colors.primary,
  },
  actionDesc: {
    fontSize: 26,
    fontFamily: "Inter-Medium",
    color: Colors.primary,
  },
  actionImage: {
    width: 50,
    height: 42,
    resizeMode: "contain",
    alignSelf: "flex-end",
  },
  actionImageTow: {
    width: 59,
    height: 42,
    resizeMode: "contain",
    alignSelf: "flex-end",
  },
  sectionContainer: {
    flex: 1,
    paddingHorizontal: 5,
    paddingVertical: 15,
  },
  sectionTitle: {
    fontSize: 15,
    fontFamily: "Roboto-Medium",
    color: Colors.text,
    marginBottom: 20,
  },
  listItem: {
    flexDirection: "row",
    marginBottom: 25,
    paddingHorizontal: 10,
  },
  iconSection: {
    width: 18,
    height: 18,
    borderRadius: 10,
    marginRight: 9,
    marginTop: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  activityIcon: {
    resizeMode: "contain",
  },
  listText: {
  },
  activityTitle: {
    fontSize: 13,
    fontFamily: "Inter-Regular",
    color: Colors.textSecondary,
  },
  activityTime: {
    fontSize: 13,
    fontFamily: "Inter-Regular",
    color: Colors.textSecondary,
  },
});