import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "../context/AuthContext";

import AuthNavigator from "./AuthNavigator";
import PoliceNavigator from "./PoliceNavigator";
import EMTNavigator from "./EMTNavigator";
import FireNavigator from "./FireNavigator";
import WreckerNavigator from "./WreckerNavigator";
import InsuranceNavigator from "./InsuranceNavigator";
import DriverNavigator from "./DriverNavigator";

export type RootStackParamList = {
  Auth: undefined;
  Police: undefined;
  EMT: undefined;
  Fire: undefined;
  Wrecker: undefined;
  Insurance: undefined;
  Driver: undefined;
  NotificationScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const { isLoggedIn, userRole } = useContext(AuthContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isLoggedIn ? (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      ) : (
        <>
          {userRole === "police" && (
            <Stack.Screen name="Police" component={PoliceNavigator} />
          )}
          {userRole === "emt" && (
            <Stack.Screen name="EMT" component={EMTNavigator} />
          )}
          {userRole === "fire" && (
            <Stack.Screen name="Fire" component={FireNavigator} />
          )}
          {userRole === "wrecker" && (
            <Stack.Screen name="Wrecker" component={WreckerNavigator} />
          )}
          {userRole === "insurance" && (
            <Stack.Screen name="Insurance" component={InsuranceNavigator} />
          )}
          {userRole === "driver" && (
            <Stack.Screen name="Driver" component={DriverNavigator} />
          )}
        </>
      )}
    </Stack.Navigator>
  );
}