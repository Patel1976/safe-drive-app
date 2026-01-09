import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { Colors } from "../../../assets/color/colors";
import Header from "../../components/Header";

export default function FireProfile() {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      <Header title="SafeDrive" showBackButton={false} />

      <ScrollView style={styles.container}>
        {/* Heading */}
        <Text style={styles.heading}>Your Profile</Text>

        {/* Profile Image with Camera Icon */}
        <View style={styles.imageWrapper}>
          <View style={styles.imageBorder}>
            <Image
              source={require("../../../assets/images/Police/profileImage.png")}
              style={styles.profileImage}
            />
          </View>
          <TouchableOpacity style={styles.cameraIcon}>
            <Image
              source={require("../../../assets/images/Police/camera.png")}
              style={styles.camera}
            />
          </TouchableOpacity>
        </View>

        {/* Profile Details */}
        <View style={styles.card}>
          <View style={styles.detail}>
            <Text style={styles.label}>Full Name</Text>
            <Text style={styles.value}>Anthony Manning</Text>
          </View>

          <View style={styles.detail}>
            <Text style={styles.label}>Location</Text>
            <Text style={styles.value}>Micoud Hwy, St Lucia. LC15 101</Text>
          </View>

          <View style={styles.detail}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>antman@yahoo.com</Text>
          </View>

          <View style={styles.detail}>
            <Text style={styles.label}>Fire Station</Text>
            <Text style={styles.value}>New Fire Station</Text>
          </View>

          <View style={styles.detail}>
            <Text style={styles.label}>Phone Number</Text>
            <Text style={styles.value}>+33 91891 81918</Text>
          </View>

          <View style={styles.detail}>
            <Text style={styles.label}>Badge / Firefighter ID</Text>
            <Text style={styles.value}>NFJ36373</Text>
          </View>
        </View>

        {/* Sign Out Button */}
        <View style={styles.actionButton}>
          <TouchableOpacity style={styles.signOutBtn}>
            <Image
              source={require("../../../assets/images/Police/logOut.png")}
              style={styles.logOut}
            />
            <Text style={styles.signOutText}>Sign Out</Text>
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
    paddingHorizontal: 25,
    marginBottom: 30
  },
  heading: {
    fontSize: 26,
    fontFamily: "Roboto-Medium",
    color: Colors.text,
    marginBottom: 20,
  },
  imageWrapper: {
    alignItems: "center",
    marginBottom: 20,
    zIndex: 1,
  },
  imageBorder: {
    borderWidth: 3,
    borderColor: Colors.primary,
    borderRadius: 100,
    padding: 3,
  },
  profileImage: {
    width: 114,
    height: 114,
    borderRadius: 60,
  },
  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: "33%",
    backgroundColor: Colors.white,
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderRadius: 20,
  },
  camera: {
    height: 16,
    width: 20,
  },
  card: {
    backgroundColor: Colors.reportBg,
    borderRadius: 15,
    paddingTop: 70,
    paddingHorizontal: 20,
    marginBottom: 25,
    marginTop: -80,
  },
  detail: {
    marginBottom: 20,
  },
  label: {
    fontSize: 17,
    fontFamily: "Inter-Medium",
    color: Colors.text,
    marginBottom: 3,
  },
  value: {
    fontSize: 15,
    fontFamily: "Inter-Medium",
    color: Colors.textThird,
  },
  actionButton: {
    marginBottom: 30,
    alignItems: "center",
    marginTop: 10,
  },
  signOutBtn: {
    width: "70%",
    height: 32,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    borderRadius: 5,
  },
  logOut: {
    height: 20,
    width: 15
  },
  signOutText: {
    color: Colors.white,
    fontSize: 14,
    fontFamily: "Inter-SemiBold",
    marginLeft: 8,
  },
});