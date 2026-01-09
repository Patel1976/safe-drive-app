import React, { useMemo, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { Colors } from "../../../assets/color/colors";
import Header from "../../components/Header";
import { useRoute, useNavigation } from "@react-navigation/native";

export default function PoliceEMTReport() {
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
        return { bg: "#25B736", text: "Accepted" };
      default:
        return { bg: "#D3D3D3", text: "Not Started" };
    }
  }, [status]);
  console.log("statusBadge", statusBadge);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      <Header title="SafeDrive" showBackButton={false} />

      <ScrollView style={styles.container}>
        {/* Title Section */}
        <View style={styles.profileCard}>
          <View>
            <Text style={styles.profileTitle}>Insurance Report</Text>
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
          <Text style={styles.label}>Claim Type</Text>
          <Text style={styles.value}>Auto Collision</Text>

          <Text style={styles.label}>Date of Incident</Text>
          <Text style={styles.value}>12th Jul, 2025 03:00PM</Text>

          <Text style={styles.label}>Policy Number</Text>
          <Text style={styles.value}>INS-23845-B</Text>

          <Text style={styles.label}>Policy Holder</Text>
          <Text style={styles.value}>James Wilson</Text>

          <Text style={styles.label}>Estimated Cost</Text>
          <Text style={styles.value}>50000</Text>

          <Text style={styles.label}>Agencie Name</Text>
          <Text style={styles.value}>Massy United Insurance</Text>

          <Text style={styles.label}>Agencie Phone Number</Text>
          <Text style={styles.value}>+1 123456789</Text>
        </View>

        {/* Chain of Custody Section */}
        <Text style={styles.sectionTitle}>Assessment Notes</Text>

        <View style={styles.custodyCard}>
          <View style={styles.custodyItem}>
            {/* Text Details */}
            <View style={styles.custodyContainer}>
              <Text style={styles.custodyTitle}>Vehicle Details: Hyundai Creta 2022</Text>
              <Text style={styles.custodyTitle}>Registration No. MH12AB3456</Text>
              <Text style={styles.custodyTitle}>Incident Date: 29-08-2025</Text>
            </View>
          </View>
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
    marginBottom: 10,
  },
  custodyTitle: {
    fontSize: 13,
    fontFamily: "Inter-Medium",
    color: Colors.text,
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