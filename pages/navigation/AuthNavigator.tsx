import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RoleSelectionScreen from "../app/auth/RoleSelectionScreen";
import LoginScreen from "../app/auth/LoginScreen";
import OtpVerificationScreen from "../app/auth/OtpVerificationScreen";
import DriverSignupScreen from "../app/auth/DriverRegistrationScreen";

export type AuthStackParamList = {
  RoleSelection: undefined;
  Login: undefined;
  OtpVerification: { phone: string };
  DriverSignup: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="OtpVerification" component={OtpVerificationScreen} options={{ headerShown: false }} />
      <Stack.Screen name="DriverSignup" component={DriverSignupScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}