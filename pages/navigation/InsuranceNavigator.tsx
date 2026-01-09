import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import InsuranceDashboard from "../app/insurance/InsuranceDashboard";
import PoliceReportsList from "../app/police/PoliceReportsList";
// import PoliceNotifications from "../app/police/PoliceNotifications";
import PoliceProfile from "../app/police/PoliceProfile";

export type InsuranceTabParamList = {
  Dashboard: undefined;
  Reports: undefined;
  Notifications: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<InsuranceTabParamList>();

export default function InsuranceNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Dashboard" component={InsuranceDashboard} />
      <Tab.Screen name="Reports" component={PoliceReportsList} />
      {/* <Tab.Screen name="Notifications" component={PoliceNotifications} /> */}
      <Tab.Screen name="Profile" component={PoliceProfile} />
    </Tab.Navigator>
  );
}