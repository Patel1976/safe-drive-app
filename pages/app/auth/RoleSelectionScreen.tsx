import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";
import Icon from "react-native-vector-icons/FontAwesome5";
import Icons from "react-native-vector-icons/FontAwesome6";
import { Colors } from "../../../assets/color/colors";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { AuthStackParamList } from "../../navigation/AuthNavigator";

type UserRole = "police" | "emt" | "fire" | "wrecker" | "insurance" | "driver" | null;
type AuthNavigationProp = NativeStackNavigationProp<AuthStackParamList, "RoleSelection">;

export default function RoleSelectionScreen() {
  const { setUserRole } = useContext(AuthContext);
  const navigation = useNavigation<AuthNavigationProp>();

  const handleSelectRole = (role: Exclude<UserRole, null>) => {
    setUserRole(role);
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainHeader}>
        <Image
          source={require("../../../assets/images/MainLogo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.heading}>Welcome to SafeDrive</Text>
        <Text style={styles.description}>Login to your SafeDrive account</Text>
      </View>

      <View style={styles.roleContainer}>
        <Text style={styles.roleHeading}>Choose your role to continue</Text>

        <View style={styles.rolesGrid}>
          {/* Police */}
          <TouchableOpacity
            style={styles.roleButton}
            onPress={() => handleSelectRole("police")}
          >
            <Text style={styles.roleText}>Police</Text>
            <Image
              source={require("../../../assets/images/Role/police.png")}
              style={styles.roleImage}
              resizeMode="contain"
            />
          </TouchableOpacity>

          {/* EMT */}
          <TouchableOpacity
            style={styles.roleButton}
            onPress={() => handleSelectRole("emt")}
          >
            <Text style={styles.roleText}>EMT</Text>
            <Image
              source={require("../../../assets/images/Role/emt.png")}
              style={styles.roleImage}
              resizeMode="contain"
            />
          </TouchableOpacity>

          {/* Fire */}
          <TouchableOpacity
            style={styles.roleButton}
            onPress={() => handleSelectRole("fire")}
          >
            <Text style={styles.roleText}>Fire</Text>
            <Image
              source={require("../../../assets/images/Role/fire.png")}
              style={styles.roleImage}
              resizeMode="contain"
            />
          </TouchableOpacity>

          {/* Wrecker */}
          <TouchableOpacity
            style={styles.roleButton}
            onPress={() => handleSelectRole("wrecker")}
          >
            <Text style={styles.roleText}>Wrecker</Text>
            <Image
              source={require("../../../assets/images/Role/wrecker.png")}
              style={styles.roleImage}
              resizeMode="contain"
            />
          </TouchableOpacity>

          {/* Insurance */}
          <TouchableOpacity
            style={styles.roleButton}
            onPress={() => handleSelectRole("insurance")}
          >
            <Text style={styles.roleText}>Insurance</Text>
            <Image
              source={require("../../../assets/images/Role/insurance.png")}
              style={styles.roleImage}
              resizeMode="contain"
            />
          </TouchableOpacity>

          {/* Driver */}
          <TouchableOpacity
            style={styles.roleButton}
            onPress={() => handleSelectRole("driver")}
          >
            <Text style={styles.roleText}>Driver</Text>
            <Image
              source={require("../../../assets/images/Role/driver.png")}
              style={styles.roleImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  mainHeader: {
    padding: 20,
  },
  logo: {
    height: 100,
    marginBottom: 15,
    marginTop: 25,
  },
  heading: {
    fontSize: 26,
    fontFamily: "Roboto-Medium",
    color: Colors.text,
    marginBottom: 5,
    textAlign: "center",
  },
  description: {
    fontSize: 17,
    fontFamily: "Inter-Light",
    color: Colors.textSecondary,
    textAlign: "center",
    marginBottom: 25,
  },
  roleContainer: {
    width: "100%",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F8F7F7",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  roleHeading: {
    fontSize: 17,
    fontFamily: "Inter-SemiBold",
    color: Colors.text,
    marginBottom: 15,
    padding: 10,
  },
  rolesGrid: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  roleButton: {
    width: "47%",
    aspectRatio: 1,
    backgroundColor: Colors.roleButtonBG,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  roleText: {
    position: "absolute",
    top: 10,
    left: 10,
    color: Colors.white,
    fontSize: 14,
    fontFamily: "Inter-Medium",
  },
  roleImage: {
    width: "40%",
    height: "40%",
  },
});