import React from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EMTDashboard from "../app/emt/EMTDashboard";
import EMTCasesList from "../app/emt/EMTCasesList";
import EmtCaseDetail from "../app/emt/EMTCaseDetail";
import EMTPreliminaryReport from "../app/emt/EMTPreliminaryReport";
import EMTNotifications from "../components/NotificationScreen";
import EMTProfile from "../app/emt/EMTProfile";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Colors } from "../../assets/color/colors";

const ReportStack = createNativeStackNavigator();
const ReportStackScreen = () => (
  <ReportStack.Navigator screenOptions={{ headerShown: false }}>
    <ReportStack.Screen name="EMTCasesList" component={EMTCasesList} />
    <ReportStack.Screen name="EmtCaseDetail" component={EmtCaseDetail} />
    <ReportStack.Screen name="EMTPreliminaryReport" component={EMTPreliminaryReport} />
  </ReportStack.Navigator>
);

const Tab = createBottomTabNavigator();
const EMTTabs = () => (
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
    <Tab.Screen name="Home" component={EMTDashboard} />
    <Tab.Screen name="Report" component={ReportStackScreen} />
    <Tab.Screen name="Profile" component={EMTProfile} />
  </Tab.Navigator>
);

const RootStack = createNativeStackNavigator();
export default function EMTNavigator() {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="EMTTabs" component={EMTTabs} />
      <RootStack.Screen name="NotificationScreen" component={EMTNotifications} />
    </RootStack.Navigator>
  );
}