import React, { useMemo, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { Colors } from "../../../assets/color/colors";
import Header from "../../components/Header";
import { useRoute, useNavigation } from "@react-navigation/native";

export default function PoliceTowReport() {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { status: routeStatus } = (route.params as { status?: string }) || {};
  const [status, setStatus] = useState(routeStatus ?? "");
  console.log("status", status);

  const statusBadge = useMemo(() => {
    switch (status) {
      case "Pending":
        return { bg: "#FF8D28", text: "In Progress" };
      case "Completed":
        return { bg: "#25B736", text: "Completed" };
      default:
        return { bg: "#D3D3D3", text: "Not Started" };
    }
  }, [status]);
  console.log("statusBadge", statusBadge);

  const custodySteps = [
    {
      id: 1,
      title: "Request Received",
      time: "03rd Jul 2025, 10:30 AM",
      icon: require("../../../assets/images/Police/rightIcon.png"),
      status: "Completed",
    },
    {
      id: 2,
      title: "Tow Truck Dispatched",
      time: "03rd Jul 2025, 10:55 AM",
      icon: require("../../../assets/images/Police/towTruck.png"),
      status: status === "Pending" ? "Pending" : "Completed",
    },
    {
      id: 3,
      title: "Vehicle Pickup",
      time: status === "Completed" ? "03rd Jul 2025, 3:00 PM" : "Pending",
      icon: require("../../../assets/images/Police/towing.png"),
      status: status === "Completed" ? "Completed" : "Pending",
    },
    {
      id: 4,
      title: "Vehicle Delivered",
      time: status === "Completed" ? "03rd Jul 2025, 6:00 PM" : "Pending",
      icon: require("../../../assets/images/Police/vehicleDelivered.png"),
      status: status === "Completed" ? "Completed" : "Pending",
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      <Header title="SafeDrive" showBackButton={false} />

      <ScrollView style={styles.container}>
        {/* Title Section */}
        <View style={styles.profileCard}>
          <View>
            <Text style={styles.profileTitle}>Tow/Wrecker Report</Text>
          </View>
          <View style={styles.profileDetails}>
            <View style={styles.officerInfo}>
              <View style={[styles.statusBadge, { backgroundColor: statusBadge.bg }]}>
                <Text style={styles.statusText}>{statusBadge.text}</Text>
              </View>
              <Text style={styles.officerName}>Job #T-2025-8742</Text>
            </View>
          </View>
        </View>

        {/* Report Details */}
        <View style={styles.detailCard}>
          <Text style={styles.label}>Vehicle</Text>
          <Text style={styles.value}>2022 Honda Civic (XYZ-5678)</Text>

          <Text style={styles.label}>Requested By</Text>
          <Text style={styles.value}>Officer Smith, Badge #54321</Text>

          <Text style={styles.label}>Contact Officer</Text>
          <Text style={styles.value}>758-485-9229</Text>

          <Text style={styles.label}>Pickup Location</Text>
          <Text style={styles.value}>Main St & 5th Ave</Text>

          <Text style={styles.label}>Destination</Text>
          <Text style={styles.value}>Quick Tow Services Storage Yard</Text>

          <Text style={styles.label}>Cost (in USD)</Text>
          <Text style={styles.value}>12000</Text>
        </View>

        {/* Chain of Custody Section */}
        <Text style={styles.sectionTitle}>Chain of Custody</Text>

        <View style={styles.custodyCard}>
          {custodySteps.map((step, index, array) => (
            <View key={step.id} style={styles.custodyItem}>
              {/* Icon + Line */}
              <View style={styles.iconLineContainer}>
                <View
                  style={[
                    styles.detailsIcon,
                    {
                      backgroundColor:
                        step.status === "Completed" ? Colors.minorBtnA : Colors.white,
                    },
                  ]}
                >
                  <Image
                    source={step.icon}
                    style={{
                      tintColor:
                        step.status === "Completed" ? Colors.white : Colors.textSecondary,
                    }}
                  />
                </View>
                {index !== array.length - 1 && <View style={styles.verticalLine} />}
              </View>

              {/* Text Details */}
              <View style={styles.custodyContainer}>
                <Text style={styles.custodyTitle}>{step.title}</Text>
                <Text
                  style={[
                    styles.custodyTime,
                    step.status === "Pending" && { color: "#FF3B30" },
                  ]}
                >
                  {step.time}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Go Back Button */}
        <View style={styles.actionButton}>
          <TouchableOpacity style={styles.goBackBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.goBackText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
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
    justifyContent: "space-between",
    gap: 8,
  },
  officerInfo: {
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
  reportTitle: {
    fontSize: 22,
    fontFamily: "Inter-Bold",
    color: Colors.text,
  },
  statusBadge: {
    backgroundColor: "#FF8D28",
    alignSelf: "flex-start",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginTop: 6,
  },
  statusText: {
    color: Colors.white,
    fontFamily: "Inter-SemiBold",
    fontSize: 12,
  },
  jobId: {
    color: Colors.textSecondary,
    fontFamily: "Inter-Regular",
    fontSize: 14,
    marginTop: 4,
    marginBottom: 20,
  },
  detailCard: {
    backgroundColor: Colors.reportBg,
    borderRadius: 19,
    paddingHorizontal: 20,
    marginBottom: 25,
    marginTop: 10,
    paddingBottom: 20,
  },
  label: {
    fontSize: 15,
    color: Colors.textThird,
    fontFamily: "Inter-Medium",
    marginTop: 15,
  },
  value: {
    fontSize: 13,
    color: Colors.text,
    fontFamily: "Inter-Regular",
  },
  sectionTitle: {
    fontSize: 15,
    color: Colors.textThird,
    fontFamily: "Inter-SemiBold",
    marginBottom: 10,
  },
  custodyCard: {
    backgroundColor: Colors.reportBg,
    borderRadius: 19,
    paddingHorizontal: 20,
    marginBottom: 25,
    paddingVertical: 15,
  },
  custodyItem: {
    flexDirection: "row",
  },
  iconLineContainer: {
    width: 30,
    alignItems: "center",
  },
  detailsIcon: { height: 20, width: 20, backgroundColor: Colors.minorBtnA, borderRadius: 15, justifyContent: "center", alignItems: "center" },
  icons: { color: Colors.white },
  verticalLine: {
    width: 2,
    backgroundColor: "#E0E0E0",
    flex: 1,
    marginTop: 2,
  },
  custodyContainer: {
    marginBottom: 15,
  },
  custodyTitle: {
    fontSize: 13,
    fontFamily: "Inter-Regular",
    color: Colors.textThird,
  },
  custodyTime: {
    fontSize: 15,
    color: Colors.text,
    fontFamily: "Inter-Medium",
  },
  custodyPending: {
    fontSize: 13,
    color: "#FF3B30",
    fontFamily: "Inter-SemiBold",
  },
  actionButton: {
    marginBottom: 30,
    alignItems: "center",
    marginTop: 10,
  },
  goBackBtn: {
    width: "70%",
    backgroundColor: Colors.primary,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    height: 32,
  },
  goBackText: {
    color: Colors.white,
    fontSize: 14,
    fontFamily: "Inter-SemiBold",
  },
});