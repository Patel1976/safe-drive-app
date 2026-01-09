import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { Colors } from "../../../assets/color/colors";
import { AuthContext } from "../../context/AuthContext";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { AuthStackParamList } from "../../navigation/AuthNavigator";

type LoginNavProp = NativeStackNavigationProp<AuthStackParamList, "Login">;

export default function DriverRegistrationScreen() {
  const { userRole } = useContext(AuthContext);
  const navigation = useNavigation<LoginNavProp>();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [licenseNo, setLicenseNo] = useState("");

  const handleSignup = () => {
    if (!phone) return;
    console.log("Driver Registration:", { name, phone, location, email, licenseNo });
    navigation.navigate("OtpVerification", { phone });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.mainHeader}>
          <Image
            source={require("../../../assets/images/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.heading}>Registration</Text>
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor={Colors.textThird}
            value={name}
            onChangeText={setName}
          />
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter phone number"
            placeholderTextColor={Colors.textThird}
            keyboardType="phone-pad"
            maxLength={10}
            value={phone}
            onChangeText={(text) => setPhone(text.replace(/[^0-9]/g, ""))}
          />
          <Text style={styles.label}>Location</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter location"
            placeholderTextColor={Colors.textThird}
            value={location}
            onChangeText={setLocation}
          />
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter email address"
            placeholderTextColor={Colors.textThird}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <Text style={styles.label}>License No</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter license number"
            placeholderTextColor={Colors.textThird}
            value={licenseNo}
            onChangeText={setLicenseNo}
          />

          <TouchableOpacity style={styles.button} onPress={handleSignup}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.backButtonContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <View style={styles.backButtonContent}>
              <Ionicons name="arrow-back" style={styles.backButtonIcon} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={require("../../../assets/images/LoginImage.png")}
            resizeMode="cover"
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  mainHeader: { paddingHorizontal: 30, marginBottom: 15, marginTop: 5, alignItems: "center" },
  logo: {
    width: 300,
    height: 110,
  },
  heading: { fontSize: 26, fontFamily: "Roboto-Medium", color: Colors.text, textAlign: "center" },
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
    marginBottom: 15,
  },
  button: {
    width: "70%",
    height: 35,
    backgroundColor: Colors.primary,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
  imageContainer: { flex: 1, justifyContent: "flex-end", alignItems: "center", width: "100%", height: 120, zIndex: -1 },
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
});