import React, { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { Colors } from "../../../assets/color/colors";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { AuthStackParamList } from "../../navigation/AuthNavigator";
import Ionicons from "react-native-vector-icons/Ionicons";

type LoginNavProp = NativeStackNavigationProp<AuthStackParamList, "Login">;

export default function LoginScreen() {
  const { userRole } = useContext(AuthContext);
  const navigation = useNavigation<LoginNavProp>();
  const [phone, setPhone] = useState("");
  const handleSendOtp = () => {
    if (!phone) return;
    console.log(`Sending OTP to ${phone} for role ${userRole}`);
    navigation.navigate("OtpVerification", { phone });
  };

  const handleDriverSignup = () => {
    console.log("Navigate to Driver Registration");
    navigation.navigate("DriverSignup");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <View style={styles.mainHeader}>
            <Image source={require("../../../assets/images/logo.png")} style={styles.logo} resizeMode="contain" />
            <Text style={styles.heading}>Welcome Back</Text>
            <Text style={styles.description}>Login to your SafeDrive account</Text>
          </View>
          <View style={styles.formContainer}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your phone number "
              maxLength={10}
              placeholderTextColor={Colors.textThird}
              keyboardType="phone-pad"
              value={phone}
              onChangeText={(text) => {
                const numericText = text.replace(/[^0-9]/g, "");
                setPhone(numericText);
              }}
            />

            <View style={styles.buttonRow}>
              <TouchableOpacity style={[styles.loginButton]} onPress={handleSendOtp}>
                <Text style={styles.buttonText}>Send OTP & Login</Text>
              </TouchableOpacity>

              {userRole === "driver" && (
                <TouchableOpacity
                  style={[styles.signupButton]}
                  onPress={handleDriverSignup}
                >
                  <Text style={styles.signupText}>Sign Up</Text>
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.backButtonContainer}>
              <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <View style={styles.backButtonContent}>
                  <Ionicons name="arrow-back" style={styles.backButtonIcon} />
                  {userRole != "driver" && (
                    <Text style={styles.backButtonText}>
                      Go Back
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.imageContainer}>
            <Image
              source={require("../../../assets/images/LoginImage.png")}
              resizeMode="contain"
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1, justifyContent: "center" },
  container: { flex: 1, alignItems: "center", backgroundColor: Colors.background },
  mainHeader: { paddingHorizontal: 30, marginBottom: 25, marginTop: 35, alignItems: "center" },
  logo: { width: 300, height: 170 },
  heading: { fontSize: 26, fontFamily: "Roboto-Medium", color: Colors.text, marginBottom: 5, textAlign: "center" },
  description: { fontSize: 17, fontFamily: "Inter-Light", color: Colors.textSecondary, textAlign: "center", marginBottom: 20 },
  formContainer: { paddingHorizontal: 30, width: "100%", alignItems: "center" },
  label: { alignSelf: "flex-start", fontSize: 13, fontFamily: "Inter-Regular", color: Colors.textThird, marginBottom: 5 },
  input: {
    width: "100%",
    height: 40,
    backgroundColor: Colors.inputBG,
    borderRadius: 5,
    paddingHorizontal: 18,
    fontSize: 14,
    fontFamily: "Inter-Light",
    color: Colors.text,
    marginBottom: 20,
  },
  buttonRow: {
    width: "70%",
    marginTop: 10,
  },
  loginButton: {
    height: 35,
    backgroundColor: Colors.primary,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: { color: Colors.white, fontSize: 14, fontFamily: "Inter-SemiBold" },
  signupButton: {
    marginTop: 15,
    alignItems: "center",
  },
  signupText: { color: Colors.primary, fontSize: 14, fontFamily: "Inter-SemiBold" },
  backButtonContainer: {
    marginTop: 10,
    alignItems: "center",
    width: "100%",
  },
  backButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  backButtonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButtonIcon: {
    fontSize: 22,
    color: Colors.text,
    marginRight: 5,
  },
  backButtonText: {
    color: Colors.text,
    fontSize: 14,
    fontFamily: "Inter-Regular",
  },
  imageContainer: { flex: 1, justifyContent: "flex-end", alignItems: "center", width: "100%" },
});