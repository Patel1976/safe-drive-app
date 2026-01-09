import React from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PoliceDashboard from "../app/police/PoliceDashboard";
import PoliceReportsList from "../app/police/PoliceReportsList";
import PoliceReportNew from "../app/police/PoliceReportForm";
import PoliceProfile from "../app/police/PoliceProfile";
import Signatures from "../app/police/Signatures";
import EmtRequest from "../app/police/EmtRequest";
import TowDispatch from "../app/police/TowDispatch";
import TowRequest from "../app/police/TowRequest";
import PreliminaryReport from "../app/police/PreliminaryReport";
import EMTReport from "../app/police/PoliceEMTReport";
import FireReport from "../app/police/PoliceFireReport";
import TowReport from "../app/police/PoliceTowReport";
import InsuranceReport from "../app/police/PoliceInsuranceReport";
import NotificationScreen from "../components/NotificationScreen";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Colors } from "../../assets/color/colors";

const HomeStack = createNativeStackNavigator();
const HomeStackScreen = () => (
  <HomeStack.Navigator screenOptions={{ headerShown: false }}>
    <HomeStack.Screen name="HomeMain" component={PoliceDashboard} />
    <HomeStack.Screen name="EmtRequest" component={EmtRequest} />
    <HomeStack.Screen name="TowDispatch" component={TowDispatch} />
    <HomeStack.Screen name="TowRequest" component={TowRequest} />
    <HomeStack.Screen name="Signatures" component={Signatures} />
    <HomeStack.Screen name="PreliminaryReport" component={PreliminaryReport} />
  </HomeStack.Navigator>
);

const ReportStack = createNativeStackNavigator();
const ReportStackScreen = () => (
  <ReportStack.Navigator screenOptions={{ headerShown: false }}>
    <ReportStack.Screen name="PoliceReportsList" component={PoliceReportsList} />
    <ReportStack.Screen name="PreliminaryReport" component={PreliminaryReport} />
    <ReportStack.Screen name="EMTReport" component={EMTReport} />
    <ReportStack.Screen name="FireReport" component={FireReport} />
    <ReportStack.Screen name="InsuranceReport" component={InsuranceReport} />
    <ReportStack.Screen name="TowReport" component={TowReport} />
  </ReportStack.Navigator>
);

const AddReportStack = createNativeStackNavigator();
const AddReportStackScreen = () => (
  <AddReportStack.Navigator screenOptions={{ headerShown: false }}>
    <AddReportStack.Screen name="Add" component={PoliceReportNew} />
    <AddReportStack.Screen name="Signatures" component={Signatures} />
    <AddReportStack.Screen name="PreliminaryReport" component={PreliminaryReport} />
    <AddReportStack.Screen name="PoliceReportsList" component={PoliceReportsList} />
  </AddReportStack.Navigator>
);

const Tab = createBottomTabNavigator();
const PoliceTabs = () => (
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
          case "Add":
            imageSource = require("../../assets/images/Tow/add.png");
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
    <Tab.Screen name="Home" component={HomeStackScreen} />
    <Tab.Screen name="Report" component={ReportStackScreen} />
    <Tab.Screen name="Add" component={AddReportStackScreen} />
    <Tab.Screen name="Profile" component={PoliceProfile} />
  </Tab.Navigator>
);

const RootStack = createNativeStackNavigator();

export default function PoliceNavigator() {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="PoliceTabs" component={PoliceTabs} />
      <RootStack.Screen name="NotificationScreen" component={NotificationScreen} />
      <RootStack.Screen name="TowRequest" component={TowRequest} />
    </RootStack.Navigator>
  );
}