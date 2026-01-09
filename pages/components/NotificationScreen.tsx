import React, { useContext } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { Colors } from "../../assets/color/colors";
import { AuthContext } from "../context/AuthContext";
import Header from "../components/Header";

type NotificationItem = {
  date: string;
  message: string;
  location: string;
  time: string;
  isRead: string;
};

const roleNotifications: Record<string, NotificationItem[]> = {
  police: [
    { message: "Accident reported", date: "22,Oct,2025", location: "I-95 North, Mile Marker 67", time: "12:00", isRead: "1" },
    { message: "Tow request completed", date: "30,Oct,2025", location: "Castries, LC03 101", time: "09:15", isRead: "0" },
    { message: "New traffic violation reported", date: "31,Oct,2025", location: "5th Ave & Main St", time: "15:45", isRead: "1" },
    { message: "Insurance Claim Accepted", date: "25,Oct,2025", location: "Policy Number :91J1", time: "11:41", isRead: "1" },
    { message: "Vehicle picked by wrecker", date: "30,Oct,2025", location: "Report ID :91I20", time: "12:12", isRead: "0" },
    { message: "Vehicle picked up by wrecker", date: "31,Oct,2025", location: "Report ID :91I8", time: "15:12", isRead: "0" },
    { message: "Vehicle has been towed to", date: "22,Oct,2025", location: "I-95 North, Mile Marker 67", time: "17:41", isRead: "0" },
    { message: "Insurance Claim Accepted", date: "25,Oct,2025", location: "Policy Number :91J1", time: "17:18", isRead: "1" },
  ],
  emt: [
    { date: "24/08/25", message: "New emergency case assigned", location: "Downtown Area", time: "11:30 AM", isRead: "1" },
    { date: "22/08/25", message: "Equipment maintenance scheduled", location: "N/A", time: "02:00 PM", isRead: "0" },
    { message: "Insurance Claim Accepted", date: "25,Oct,2025", location: "Policy Number :91J1", time: "11:41", isRead: "1" },
    { message: "Vehicle picked by wrecker", date: "30,Oct,2025", location: "Report ID :91I20", time: "12:12", isRead: "0" },
    { message: "Vehicle picked up by wrecker", date: "31,Oct,2025", location: "Report ID :91I8", time: "15:12", isRead: "0" },
    { message: "Vehicle has been towed to", date: "22,Oct,2025", location: "I-95 North, Mile Marker 67", time: "17:41", isRead: "0" },
    { message: "Insurance Claim Accepted", date: "25,Oct,2025", location: "Policy Number :91J1", time: "17:18", isRead: "1" },
  ],
  fire: [
    { date: "23/08/25", message: "Fire drill at Central High", location: "Central High School", time: "10:00 AM", isRead: "0" },
    { date: "21/08/25", message: "New fire safety protocols", location: "N/A", time: "01:00 PM", isRead: "1" },
    { message: "Insurance Claim Accepted", date: "25,Oct,2025", location: "Policy Number :91J1", time: "11:41", isRead: "1" },
    { message: "Vehicle picked by wrecker", date: "30,Oct,2025", location: "Report ID :91I20", time: "12:12", isRead: "0" },
    { message: "Vehicle picked up by wrecker", date: "31,Oct,2025", location: "Report ID :91I8", time: "15:12", isRead: "0" },
    { message: "Vehicle has been towed to", date: "22,Oct,2025", location: "I-95 North, Mile Marker 67", time: "17:41", isRead: "0" },
    { message: "Insurance Claim Accepted", date: "25,Oct,2025", location: "Policy Number :91J1", time: "17:18", isRead: "1" },
  ],
  wrecker: [
    { date: "24/08/25", message: "New tow request assigned", location: "I-95 South, Mile Marker 45", time: "01:00 PM", isRead: "1" },
    { date: "20/08/25", message: "Vehicle pickup completed", location: "Main St. Garage", time: "03:30 PM", isRead: "0" },
    { message: "Insurance Claim Accepted", date: "25,Oct,2025", location: "Policy Number :91J1", time: "11:41", isRead: "1" },
    { message: "Vehicle picked by wrecker", date: "30,Oct,2025", location: "Report ID :91I20", time: "12:12", isRead: "0" },
    { message: "Vehicle picked up by wrecker", date: "31,Oct,2025", location: "Report ID :91I8", time: "15:12", isRead: "0" },
    { message: "Vehicle has been towed to", date: "22,Oct,2025", location: "I-95 North, Mile Marker 67", time: "17:41", isRead: "0" },
    { message: "Insurance Claim Accepted", date: "25,Oct,2025", location: "Policy Number :91J1", time: "17:18", isRead: "1" },
  ],
  insurance: [
    { date: "24/08/25", message: "New claim received", location: "N/A", time: "10:00 AM", isRead: "1" },
    { date: "22/08/25", message: "Policy update available", location: "N/A", time: "01:00 PM", isRead: "0" },
    { message: "Insurance Claim Accepted", date: "25,Oct,2025", location: "Policy Number :91J1", time: "11:41", isRead: "1" },
    { message: "Vehicle picked by wrecker", date: "30,Oct,2025", location: "Report ID :91I20", time: "12:12", isRead: "0" },
    { message: "Vehicle picked up by wrecker", date: "31,Oct,2025", location: "Report ID :91I8", time: "15:12", isRead: "0" },
    { message: "Vehicle has been towed to", date: "22,Oct,2025", location: "I-95 North, Mile Marker 67", time: "17:41", isRead: "0" },
    { message: "Insurance Claim Accepted", date: "25,Oct,2025", location: "Policy Number :91J1", time: "17:18", isRead: "1" },
  ],
  driver: [
    { date: "23/08/25", message: "Accident reported nearby", location: "5th Ave & Main St", time: "09:00 AM", isRead: "0" },
    { date: "21/08/25", message: "Vehicle service due", location: "N/A", time: "All Day", isRead: "1" },
    { message: "Insurance Claim Accepted", date: "25,Oct,2025", location: "Policy Number :91J1", time: "11:41", isRead: "1" },
    { message: "Vehicle picked by wrecker", date: "30,Oct,2025", location: "Report ID :91I20", time: "12:12", isRead: "0" },
    { message: "Vehicle picked up by wrecker", date: "31,Oct,2025", location: "Report ID :91I8", time: "15:12", isRead: "0" },
    { message: "Vehicle has been towed to", date: "22,Oct,2025", location: "I-95 North, Mile Marker 67", time: "17:41", isRead: "0" },
    { message: "Insurance Claim Accepted", date: "25,Oct,2025", location: "Policy Number :91J1", time: "17:18", isRead: "1" },
  ],
};

const NotificationScreen: React.FC = () => {
  const { userRole } = useContext(AuthContext);
  const notifications = userRole ? roleNotifications[userRole] || [] : [];

  const renderItem = ({ item }: { item: NotificationItem }) => (
    <View style={styles.card}>
      {/* Row 1 */}
      <View style={styles.row}>
        <Text style={styles.message}>{item.message}</Text>
        <View style={styles.timeContainer}>
          {/* dot color based on isRead */}
          <Text style={styles.time}>{item.time}</Text>
          <View
            style={[
              styles.dot,
              { backgroundColor: item.isRead === "1" ? "#25B736" : "#D9D9D9" },
            ]}
          />
        </View>
      </View>
      {/* Row 2 */}
      <View style={styles.row}>
        <Text style={styles.location}>{item.location}</Text>
      </View>
      {/* Row 3 */}
      <View style={styles.row}>
        <Text style={styles.date}>{item.date}</Text>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <Header title="SafeDrive" showBackButton={true} />
      <View style={styles.container}>
        <Text style={styles.title}>Notifications</Text>
        {notifications.length > 0 ? (
          <FlatList
            data={notifications}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderItem}
          />
        ) : (
          <Text style={styles.noData}>No notifications</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    fontFamily: "Roboto-Medium",
    color: Colors.text,
    marginBottom: 20,
  },
  card: {
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: "#00000009",
    marginBottom: 15,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timeContainer: {
    flexDirection: "row",
    gap: 5,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 4,
  },

  message: {
    fontSize: 13,
    fontFamily: "Inter-Regular",
    color: Colors.text,
  },
  date: {
    fontSize: 12,
    fontFamily: "Inter-Regular",
    color: Colors.textThird,
    textAlign: "right",
    flex: 1,
    marginTop: -8,
  },
  location: {
    fontSize: 13,
    fontFamily: "Inter-Regular",
    color: Colors.textThird,
  },
  time: {
    fontSize: 12,
    fontFamily: "Inter-Regular",
    color: Colors.textThird,
  },
  noData: {
    textAlign: "center",
    fontSize: 16,
    color: Colors.textSecondary,
    marginTop: 20,
  },
});

export default NotificationScreen;