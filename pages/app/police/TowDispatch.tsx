import React, { useState } from "react";
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../../assets/color/colors";
import Icon from "react-native-vector-icons/FontAwesome6";
import Icons from "react-native-vector-icons/FontAwesome";
import Header from "../../components/Header";
// import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import { PoliceStackParamList } from "../../navigation/PoliceNavigator";

export default function TowDispatch() {
  const navigation = useNavigation<any>();

  const allReports = [
    {
      id: "1",
      title: "Vehicle Collision • Minor Injury",
      date: "24/08/25",
      location: "I-95 North, Mile Marker 67",
      reportId: "91J2",
      status: "Pending",
    },
    {
      id: "2",
      title: "Vehicle Collision • Moderate Damage",
      date: "21/08/25",
      location: "Main St & 7th Ave, Downtown District",
      reportId: "91J2",
      status: "Pending",
    },
    {
      id: "3",
      title: "Interstates • I-70 Collision",
      date: "25/08/25",
      location: "Route 66, Near Pine Grove Exit",
      reportId: "91J1",
      status: "Pending",
    },
    {
      id: "4",
      title: "Highway Breakdown • No Injuries",
      date: "21/08/25",
      location: "I-90 East, Mile Marker 245",
      reportId: "91J3",
      status: "Pending",
    },
    {
      id: "5",
      title: "Rear-end • Lewis Place",
      date: "25/08/25",
      location: "Lewis Place",
      reportId: "91J2",
      status: "Pending",
    },
    {
      id: "6",
      title: "Rear-End Crash • Minor Injury",
      date: "21/08/25",
      location: "Route 66, Near Pine Grove Exit",
      reportId: "91J5",
      status: "Pending",
    },
    {
      id: "7",
      title: "Highway Breakdown • No Injuries",
      date: "21/08/25",
      location: "I-90 East, Mile Marker 245",
      reportId: "91J3",
      status: "Pending",
    },
  ];

  const [reports, setReports] = useState(allReports);
  const [isSorted, setIsSorted] = useState(false);

  const handleSort = () => {
    if (!isSorted) {
      const sorted = [...reports].sort((a, b) => {
        const [dayA, monthA, yearA] = a.date.split("/").map(Number);
        const [dayB, monthB, yearB] = b.date.split("/").map(Number);
        const dateA = new Date(yearA, monthA - 1, dayA);
        const dateB = new Date(yearB, monthB - 1, dayB);
        return dateB.getTime() - dateA.getTime();
      });
      setReports(sorted);
      setIsSorted(true);
    } else {
      setReports(allReports);
      setIsSorted(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return Colors.primary;
      default:
        return Colors.text;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header title="SafeDrive" showBackButton={true} />
      <View style={styles.container}>
        {/* Officer Card */}
        <View style={styles.profileCard}>
          <View>
            <Text style={styles.profileTitle}>Tow Required Reports</Text>
          </View>
          <View style={styles.profileDetails}>
            <Image
              source={require("../../../assets/images/Police/profile.png")}
              style={styles.officerImage}
            />
            <Text style={styles.officerName}>Officer Johnson | Badge #12345</Text>
          </View>
        </View>
        <TouchableOpacity
          style={[
            styles.sortBtn,
            { backgroundColor: isSorted ? Colors.text : Colors.sortBtn },
          ]}
          onPress={handleSort}
        >
          <View style={styles.sortContainer}>
            <Text style={[styles.sortBtnText, { color: isSorted ? Colors.white : Colors.text }]}>
              Sort
            </Text>
            <View style={styles.sortIcons}>
              <Icon name="arrow-up" style={[styles.sortIcon, { color: isSorted ? Colors.white : Colors.text }]} size={13} />
              <Icon name="arrow-down" style={[styles.sortIcon, { color: isSorted ? Colors.white : Colors.text }]} size={13} />
            </View>
          </View>
        </TouchableOpacity>

        {/* Reports List */}
        <FlatList
          data={reports}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("TowRequest")}
              style={styles.reportCard}
              activeOpacity={0.8}
            >
              <View style={styles.reportRow}>
                {/* LEFT SIDE: Report Info */}
                <View style={styles.reportLeft}>
                  <Text style={styles.reportTitle}>{item.title}</Text>

                  <View style={styles.locationRow}>
                    <View style={styles.locationIcon}>
                      <Icons name="map-marker" size={9} style={styles.icons} />
                    </View>
                    <Text style={styles.locationText}>{item.location}</Text>
                  </View>

                  <Text style={styles.reportId}>Report ID: <Text style={styles.reportIdText}>{item.reportId}</Text></Text>
                </View>

                {/* RIGHT SIDE: Date + Status */}
                <View style={styles.reportRight}>
                  <Text style={styles.dateText}>{item.date}</Text>
                  <View
                    style={[
                      styles.statusButton,
                      { backgroundColor: getStatusColor(item.status) },
                    ]}
                  >
                    <Text style={styles.statusButtonText}>{item.status}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  profileCard: {
    paddingHorizontal: 5,
    marginBottom: 8,
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
  sortBtn: {
    alignSelf: "flex-end",
    backgroundColor: Colors.primary,
    paddingHorizontal: 13,
    paddingVertical: 4,
    borderRadius: 5,
    marginBottom: 15,
  },
  sortContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 3
  },
  sortIcons: {
    flexDirection: "row",
  },
  sortBtnText: {
    fontSize: 13,
    fontFamily: "Inter-SemiBold",
  },
  sortIcon: {},
  separator: {
    height: 1,
    backgroundColor: Colors.inputBG,
    marginVertical: 7,
  },
  reportCard: {
    flexDirection: "column",
    paddingVertical: 10,
    paddingHorizontal: 8,
    backgroundColor: Colors.background,
    borderRadius: 8,
  },
  reportRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  reportLeft: {
    flex: 1,
    paddingRight: 10,
  },
  reportRight: {
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: 6,
  },
  row: {
    flexDirection: "column",
    marginBottom: 6,
  },
  dateStatus: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  reportTitle: {
    fontSize: 15,
    fontFamily: "Inter-Medium",
    color: Colors.text,
  },
  dateText: {
    fontSize: 13,
    fontFamily: "Roboto-Medium",
    color: Colors.textThird,
  },
  locationRow: {
    flexDirection: "row",
  },
  locationIcon: { height: 14, width: 14, backgroundColor: Colors.inputBG, borderRadius: 10, marginRight: 5, justifyContent: "center", alignItems: "center", marginTop: 3, },
  icons: { color: Colors.text },
  locationText: {
    fontSize: 13,
    fontFamily: "Inter-Regular",
    color: Colors.textThird,
    flexShrink: 1,
  },
  reportId: {
    fontSize: 13,
    fontFamily: "Inter-Regular",
    color: Colors.text,
  },
  reportIdText: {
    color: Colors.textThird
  },
  statusButton: {
    width: 74,
    paddingVertical: 4,
    borderRadius: 5,
    alignItems: "center",
  },
  statusButtonText: {
    color: Colors.white,
    fontSize: 13,
    fontFamily: "Roboto-Medium",
  },
});