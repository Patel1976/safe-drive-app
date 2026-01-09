import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { Colors } from "../../../assets/color/colors";
import { RouteProp, useRoute } from "@react-navigation/native";
import type { AuthStackParamList } from "../../navigation/AuthNavigator";
import OTPInput from "../../components/OTPInput";

type OtpRouteProp = RouteProp<AuthStackParamList, "OtpVerification">;

export default function OtpVerificationScreen() {
  const { setIsLoggedIn } = useContext(AuthContext);
  const route = useRoute<OtpRouteProp>();
  const [otp, setOtp] = useState("");

  const handleVerifyOtp = () => {
    if (!otp) return;
    console.log(`Verifying OTP ${otp} for ${route.params.phone}`);
    setIsLoggedIn(true);
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.container}>
        <View style={styles.mainHeader}>
          <Image source={require("../../../assets/images/logo.png")} style={styles.logo} resizeMode="contain" />
          <Text style={styles.heading}>Verification</Text>
          <Text style={styles.description}>Enter the 6-digit code send to your phone number</Text>
        </View>
        <View style={styles.formContainer}>
          <OTPInput
            length={6}
            value={otp}
            onChange={setOtp}
          />
          <TouchableOpacity style={styles.button} onPress={handleVerifyOtp}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log("Resend code")}>
            <Text style={styles.resendbtn}>Resend code</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={require("../../../assets/images/LoginImage.png")}
            resizeMode="contain"
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", backgroundColor: Colors.background },
  mainHeader: { paddingHorizontal: 30, marginBottom: 25, marginTop: 35, alignItems: "center" },
  logo: { width: 300, height: 170 },
  heading: { fontSize: 26, fontFamily: "Roboto-Medium", color: Colors.text, marginBottom: 5, textAlign: "center" },
  description: { fontSize: 17, fontFamily: "Inter-Light", color: Colors.textSecondary, textAlign: "center", marginBottom: 20, paddingHorizontal: 50 },
  formContainer: { paddingHorizontal: 30, width: "100%", alignItems: "center" },
  button: { width: "70%", height: 35, backgroundColor: Colors.primary, borderRadius: 8, justifyContent: "center", alignItems: "center" },
  buttonText: { color: Colors.white, fontSize: 14, fontFamily: "Inter-SemiBold" },
  resendbtn: { color: Colors.text, marginTop: 20, fontSize: 14, fontFamily: "Inter-Regular" },
  imageContainer: { flex: 1, justifyContent: "flex-end", alignItems: "center", width: "100%" },
});