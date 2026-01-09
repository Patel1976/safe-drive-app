import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DriverDashboard from "../app/driver/DriverDashboard";
import PoliceReportsList from "../app/police/PoliceReportsList";
// import PoliceNotifications from "../app/police/PoliceNotifications";
import PoliceProfile from "../app/police/PoliceProfile";

export type DriverTabParamList = {
  Dashboard: undefined;
  Reports: undefined;
  Notifications: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<DriverTabParamList>();

export default function DriverNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Dashboard" component={DriverDashboard} />
      <Tab.Screen name="Reports" component={PoliceReportsList} />
      {/* <Tab.Screen name="Notifications" component={PoliceNotifications} /> */}
      <Tab.Screen name="Profile" component={PoliceProfile} />
    </Tab.Navigator>
  );
}