import React from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FireDashboard from "../app/fire/FireDashboard";
import FireCasesList from "../app/fire/FireCasesList";
import FireCaseDetail from "../app/fire/FireCaseDetail";
import FirePreliminaryReport from "../app/fire/FirePreliminaryReport";
import FireNotifications from "../components/NotificationScreen";
import FireProfile from "../app/fire/FireProfile";
import { Colors } from "../../assets/color/colors";

const ReportStack = createNativeStackNavigator();
const ReportStackScreen = () => (
  <ReportStack.Navigator screenOptions={{ headerShown: false }}>
    <ReportStack.Screen name="FireCasesList" component={FireCasesList} />
    <ReportStack.Screen name="FireCaseDetail" component={FireCaseDetail} />
    <ReportStack.Screen name="FirePreliminaryReport" component={FirePreliminaryReport} />
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
    <Tab.Screen name="Home" component={FireDashboard} />
    <Tab.Screen name="Report" component={ReportStackScreen} />
    <Tab.Screen name="Profile" component={FireProfile} />
  </Tab.Navigator>
);

const RootStack = createNativeStackNavigator();
export default function FireNavigator() {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="EMTTabs" component={EMTTabs} />
      <RootStack.Screen name="NotificationScreen" component={FireNotifications} />
    </RootStack.Navigator>
  );
}