import React from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TowDashboard from "../app/tow/TowDashboard";
import TowOrdersList from "../app/tow/TowOrdersList";
import StorageList from "../app/tow/StorageList";
import TowDetails from "../app/tow/TowDetails";
import DateTime from "../app/tow/DateTime";
import TowReport from "../app/tow/TowReport";
import StorageDetails from "../app/tow/StorageDetails";
import FireNotifications from "../components/NotificationScreen";
import TowProfile from "../app/tow/TowProfile";
import { Colors } from "../../assets/color/colors";

const ReportStack = createNativeStackNavigator();
const ReportStackScreen = () => (
  <ReportStack.Navigator screenOptions={{ headerShown: false }}>
    <ReportStack.Screen name="TowOrdersList" component={TowOrdersList} />
    <ReportStack.Screen name="TowDetails" component={TowDetails} />
    <ReportStack.Screen name="DateTime" component={DateTime} />
    <ReportStack.Screen name="TowReport" component={TowReport} />
  </ReportStack.Navigator>
);
const StorageStack = createNativeStackNavigator();
const StorageStackScreen = () => (
  <StorageStack.Navigator screenOptions={{ headerShown: false }}>
    <StorageStack.Screen name="StorageList" component={StorageList} />
    <StorageStack.Screen name="StorageDetails" component={StorageDetails} />
  </StorageStack.Navigator>
);

const Tab = createBottomTabNavigator();
const TowTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarShowLabel: true,
      tabBarActiveTintColor: Colors.primary,
      tabBarInactiveTintColor: Colors.textSecondary,
      tabBarLabelStyle: {
        fontSize: 12,
        fontFamily: "Inter-SemiBold",
      },
      tabBarIcon: ({ focused, color }) => {
        let imageSource;

        switch (route.name) {
          case "Home":
            imageSource = require("../../assets/images/Tow/home.png");
            break;
          case "Report":
            imageSource = require("../../assets/images/Tow/report.png");
            break;
          case "Storage":
            imageSource = require("../../assets/images/Tow/storage.png");
            break;
          case "Profile":
            imageSource = require("../../assets/images/Tow/profile.png");
            break;
        }

        return (
          <Image
            source={imageSource}
            style={{
              width: 28,
              height: 28,
              tintColor: color,
              resizeMode: "contain",
            }}
          />
        );
      },
      tabBarStyle: {
        height: 70,
        paddingBottom: 15,
        paddingTop: 8,
        backgroundColor: Colors.white,
      },
    })}
  >
    <Tab.Screen name="Home" component={TowDashboard} />
    <Tab.Screen name="Report" component={ReportStackScreen} />
    <Tab.Screen name="Storage" component={StorageStackScreen} />
    <Tab.Screen name="Profile" component={TowProfile} />
  </Tab.Navigator>
);

const RootStack = createNativeStackNavigator();
export default function FireNavigator() {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="TowTabs" component={TowTabs} />
      <RootStack.Screen name="NotificationScreen" component={FireNotifications} />
    </RootStack.Navigator>
  );
}