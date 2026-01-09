import React from "react";
import { View, Image, StyleSheet, TouchableOpacity, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Icons from "react-native-vector-icons/FontAwesome";
import { Colors } from "../../assets/color/colors";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/RootNavigator";

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({ showBackButton = false }) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        {showBackButton && (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons
              name="arrow-back"
              size={26}
              color={Colors.textSecondary}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.rightContainer}>
        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <TouchableOpacity
          style={styles.notificationContainer}
          onPress={() => navigation.navigate("NotificationScreen")}
        >
          <Icons name="bell" size={26} color={Colors.textSecondary} />
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationText}>3</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: Colors.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 130,
    marginRight: 5,
  },
  notificationContainer: {
    position: "relative",
    padding: 5,
  },
  notificationBadge: {
    position: "absolute",
    top: 3,
    right: 2,
    minWidth: 16,
    height: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    borderWidth: 1,
    borderColor: Colors.white,
    borderRadius: 10,
  },
  notificationText: {
    color: Colors.white,
    fontSize: 10,
    fontFamily: "Roboto-Medium",
  },
});

export default Header;