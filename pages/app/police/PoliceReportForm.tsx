import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Platform, PermissionsAndroid, Alert, Pressable, Image } from "react-native";
import Icons from "react-native-vector-icons/FontAwesome";
import { Colors } from "../../../assets/color/colors";
import { useNavigation } from "@react-navigation/native";
import Header from "../../components/Header";
import Geolocation from "@react-native-community/geolocation";
import MapView, { Marker } from "react-native-maps";
// import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import { PoliceStackParamList } from "../../navigation/PoliceNavigator";

export default function PoliceReportNew() {
  const [vehicles, setVehicles] = useState([{ type: "", driver: "", number: "" }]);
  const [drivers, setDrivers] = useState([{ name: "", proof: "", proofNo: "" }]);
  const [witnesses, setWitnesses] = useState([{ name: "", proof: "", proofNo: "" }]);
  const addVehicle = () => setVehicles([...vehicles, { type: "", driver: "", number: "" }]);
  const removeVehicle = (index: number) => setVehicles(vehicles.filter((_, i) => i !== index));
  const addDriver = () => setDrivers([...drivers, { name: "", proof: "", proofNo: "" }]);
  const removeDriver = (index: number) => setDrivers(drivers.filter((_, i) => i !== index));
  const addWitness = () => setWitnesses([...witnesses, { name: "", proof: "", proofNo: "" }]);
  const removeWitness = (index: number) => setWitnesses(witnesses.filter((_, i) => i !== index));
  const [selected, setSelected] = useState<string | null>(null);
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const navigation = useNavigation<any>();

  const handleAction = (action: string) => {
    console.log(`${action} clicked`);
  };

  const buttonsToShow = [
    { id: 1, label: "Take Photos", image: require("../../../assets/images/Police/takePhoto.png") },
    { id: 2, label: "AR Measure", image: require("../../../assets/images/Police/arMeasure.png") },
    { id: 3, label: "Scan License", image: require("../../../assets/images/Police/scanLicense.png") },
    { id: 4, label: "Scan QR Code", image: require("../../../assets/images/Police/scanQrCode.png") },
  ];

  useEffect(() => {
    const requestLocation = async () => {
      try {
        if (Platform.OS === "android") {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
          );
          if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            Alert.alert("Permission Denied", "Location permission is required.");
            return;
          }
        }
        Geolocation.getCurrentPosition(
          (position) => {
            const coords = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
            setLocation(coords);
            console.log("📍 Current Location:", coords);
            fetchAddressFromCoords(coords.latitude, coords.longitude);
          },
          (error) => {
            console.error("Location Error:", error);
            Alert.alert("Error", "Unable to fetch location.");
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      } catch (err) {
        console.error(err);
      }
    };
    requestLocation();
  }, []);
  const fetchAddressFromCoords = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyALe4gbjN204rjxAJThlSaGVSzo8fLf31s`
      );
      const json = await response.json();
      console.log("📍 Geocoding API Response:", json);

      if (json.results && json.results.length > 0) {
        setAddress(json.results[0].formatted_address);
        console.log("📍 Address:", json.results[0].formatted_address);
      } else {
        console.log("⚠️ No address found, status:", json.status);
      }
    } catch (error) {
      console.error("Geocoding Error:", error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header title="SafeDrive" showBackButton={false} />
      <ScrollView
        style={styles.container}
      >
        {/* Header */}
        <View style={styles.profileCard}>
          <Text style={styles.profileTitle}>New Accident</Text>
          <Text style={styles.officerName}>Record details for incident report</Text>
        </View>

        {/* Map / Photo Section */}
        <View style={styles.mapBox}>
          {location ? (
            <MapView
              style={styles.map}
              region={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
            >
              <Marker coordinate={location} title={address || "You are here"} />
            </MapView>
          ) : (
            <Icons name="map-marker" size={40} color={Colors.muted} />
          )}
        </View>
        {location && (
          <View style={{ flexDirection: "row" }}>
            <View style={styles.locationIcon}>
              <Icons name="map-marker" size={14} style={styles.icons} />
            </View>
            <Text style={styles.location}>
              {address ? address : "Fetching address..."}
            </Text>
          </View>
        )}
        <View style={styles.formView}>
          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            {buttonsToShow.map((btn) => (
              <Pressable key={btn.id} onPress={() => handleAction(btn.label)} style={styles.btnContainer}>
                {({ pressed }) => (
                  <>
                    <View style={[styles.buttonImage, pressed && { backgroundColor: Colors.sortBtn }]}>
                      <Image source={btn.image} />
                    </View>
                    <Text style={styles.buttonText}>{btn.label}</Text>
                  </>
                )}
              </Pressable>
            ))}
          </View>

          {/* Severity */}
          <View style={styles.formContainer}>
            <Text style={styles.sectionTitle}>Severity :</Text>
            <View style={styles.severityRow}>
              <TouchableOpacity
                style={[styles.minorBtn, styles.severityBtn]}
                onPress={() => setSelected("Minor")}
              >
                <View style={styles.radioContainer}>
                  <Icons
                    name={selected === "Minor" ? "check-circle" : "circle"}
                    size={16}
                    color={selected === "Minor" ? Colors.minorBtnA : Colors.minorBtnA}
                    style={styles.radioIcon}
                  />
                  <Text style={[styles.severityText, styles.minorBtnA]}>
                    Minor
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.moderateBtn, styles.severityBtn]}
                onPress={() => setSelected("Moderate")}
              >
                <View style={styles.radioContainer}>
                  <Icons
                    name={selected === "Moderate" ? "check-circle" : "circle"}
                    size={16}
                    color={selected === "Moderate" ? Colors.moderateBtnA : Colors.moderateBtnA}
                    style={styles.radioIcon}
                  />
                  <Text style={[styles.severityText, styles.moderateBtnA]}>
                    Moderate
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.severeBtn, styles.severityBtn]}
                onPress={() => setSelected("Severe")}
              >
                <View style={styles.radioContainer}>
                  <Icons
                    name={selected === "Severe" ? "check-circle" : "circle"}
                    size={16}
                    color={selected === "Severe" ? Colors.severeBtnA : Colors.severeBtnA}
                    style={styles.radioIcon}
                  />
                  <Text style={[styles.severityText, styles.severeBtnA]}>
                    Severe
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Add Vehicles */}
          <View style={styles.formContainer}>
            <Text style={styles.sectionTitle}>Add Vehicles</Text>
            {vehicles.map((v, i) => (
              <View key={i} style={styles.formRow}>
                <View style={styles.inputGroup}>
                  {i === 0 && <Text style={styles.label}>Vehicle Type</Text>}
                  <TextInput
                    style={styles.input}
                    placeholder="Vehicle Type"
                    value={v.type}
                  />
                </View>

                <View style={styles.inputGroup}>
                  {i === 0 && <Text style={styles.label}>Driver's Name</Text>}
                  <TextInput
                    style={styles.input}
                    placeholder="Driver's Name"
                    value={v.driver}
                  />
                </View>

                <View style={styles.inputGroup}>
                  {i === 0 && <Text style={styles.label}>Vehicle No</Text>}
                  <TextInput
                    style={styles.input}
                    placeholder="Vehicle Number"
                    value={v.number}
                  />
                </View>

                <TouchableOpacity onPress={() => removeVehicle(i)} style={styles.deleteBtn}>
                  <Icons name="trash" size={15} color="red" />
                </TouchableOpacity>
              </View>
            ))}
            <View style={styles.addContainer}>
              <TouchableOpacity style={styles.addBtn} onPress={addVehicle}>
                <Text style={styles.addBtnText}><Icons name="plus" size={13} /> Add Vehicle</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Add Drivers */}
          <View style={styles.formContainer}>
            <Text style={styles.sectionTitle}>Add Drivers</Text>
            {drivers.map((d, i) => (
              <View key={i} style={styles.formRow}>
                <View style={styles.inputGroup}>
                  {i === 0 && <Text style={styles.label}>Driver Name</Text>}
                  <TextInput
                    style={styles.input}
                    placeholder="Driver Name"
                    value={d.name}
                  />
                </View>

                <View style={styles.inputGroup}>
                  {i === 0 && <Text style={styles.label}>Proof Type</Text>}
                  <TextInput
                    style={styles.input}
                    placeholder="Proof Type"
                    value={d.proof}
                  />
                </View>

                <View style={styles.inputGroup}>
                  {i === 0 && <Text style={styles.label}>Proof ID No</Text>}
                  <TextInput
                    style={styles.input}
                    placeholder="Proof ID No"
                    value={d.proofNo}
                  />
                </View>
                <TouchableOpacity onPress={() => removeDriver(i)} style={styles.deleteBtn}>
                  <Icons name="trash" size={15} color="red" />
                </TouchableOpacity>
              </View>
            ))}
            <View style={styles.addContainer}>
              <TouchableOpacity style={styles.addBtn} onPress={addDriver}>
                <Text style={styles.addBtnText}><Icons name="plus" size={13} /> Add Driver</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Add Witnesses */}
          <View style={styles.formContainer}>
            <Text style={styles.sectionTitle}>Add Eye Witnesses</Text>
            {witnesses.map((w, i) => (
              <View key={i} style={styles.formRow}>
                <View style={styles.inputGroup}>
                  {i === 0 && <Text style={styles.label}>Name</Text>}
                  <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={w.name}
                  />
                </View>

                <View style={styles.inputGroup}>
                  {i === 0 && <Text style={styles.label}>Proof Type</Text>}
                  <TextInput
                    style={styles.input}
                    placeholder="Proof Type"
                    value={w.proof}
                  />
                </View>

                <View style={styles.inputGroup}>
                  {i === 0 && <Text style={styles.label}>Proof ID No</Text>}
                  <TextInput
                    style={styles.input}
                    placeholder="Proof ID No"
                    value={w.proofNo}
                  />
                </View>

                <TouchableOpacity onPress={() => removeWitness(i)} style={styles.deleteBtn}>
                  <Icons name="trash" size={15} color="red" />
                </TouchableOpacity>
              </View>
            ))}
            <View style={styles.addContainer}>
              <TouchableOpacity style={styles.addBtn} onPress={addWitness}>
                <Text style={styles.addBtnText}><Icons name="plus" size={13} /> Add Witness</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Continue Button */}
          <View style={styles.continueBtnContainer}>
            <TouchableOpacity style={styles.continueBtn} onPress={() => navigation.navigate("Signatures")}>
              <Text style={styles.continueText}>Continue To Signatures</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: Colors.white, paddingHorizontal: 20 },
  profileCard: { backgroundColor: Colors.background, paddingHorizontal: 5, borderRadius: 10, marginBottom: 20 },
  profileTitle: { fontSize: 26, fontFamily: "Roboto-Medium", color: Colors.text },
  officerName: { fontSize: 14, fontFamily: "Inter-Regular", color: Colors.textSecondary },
  mapBox: { height: 165, backgroundColor: Colors.background, borderWidth: 2, borderColor: Colors.inputBG, borderRadius: 10, justifyContent: "center", alignItems: "center", marginBottom: 8 },
  map: { ...StyleSheet.absoluteFillObject },
  locationIcon: { height: 22, width: 22, backgroundColor: Colors.inputBG, borderRadius: 10, marginRight: 5, justifyContent: "center", alignItems: "center", },
  icons: { color: Colors.primary },
  location: { fontSize: 14, fontFamily: "Inter-Regular", color: Colors.text, marginBottom: 20 },
  formView: {
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "#0000001A",
    paddingHorizontal: 15,
    marginBottom: 30
  },
  buttonContainer: {
    marginBottom: 15,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 25,
  },
  btnContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
    borderRadius: 10,
    paddingVertical: 10,
    marginHorizontal: 2,
  },
  buttonImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    backgroundColor: Colors.primary,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 3.6,
    elevation: 0.5,
  },
  buttonText: {
    color: Colors.text,
    fontSize: 13,
    fontFamily: "Inter-SemiBold",
    textAlign: "center",
    flexWrap: "wrap",
    width: 65,
    lineHeight: 16,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  radioIcon: {
    marginRight: 6,
  },
  formContainer: {
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.inputBG,
    marginBottom: 15,
  },
  sectionTitle: { fontSize: 15, fontFamily: "Inter-SemiBold", color: Colors.text, marginBottom: 10 },
  severityRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 25, gap: 10 },
  severityBtn: { flex: 1, borderRadius: 5, alignItems: "center", height: 33, justifyContent: "center" },
  severityText: { fontSize: 13, fontFamily: "Inter-Medium", color: Colors.textSecondary },
  activeBtn: { backgroundColor: Colors.primary },
  activeText: { color: Colors.white },
  formRow: { flexDirection: "row", marginBottom: 15, alignItems: "flex-end" },
  label: { fontSize: 13, fontFamily: "Inter-Medium", color: Colors.text, marginBottom: 3 },
  inputGroup: { flex: 1, marginRight: 5 },
  deleteBtn: { justifyContent: "center", alignItems: "center", height: 25, backgroundColor: Colors.sortBtn, borderRadius: 50, paddingHorizontal: 5, marginBottom: 3 },
  input: { borderWidth: 1, borderColor: Colors.inputBG, borderRadius: 3, paddingHorizontal: 8, paddingVertical: 0, color: Colors.textThird, fontSize: 13, fontFamily: "Roboto-Regular" },
  addContainer: { alignItems: "flex-end" },
  addBtn: { width: "35%", backgroundColor: Colors.text, paddingVertical: 5, borderRadius: 23, alignItems: "center", marginBottom: 20 },
  addBtnText: { color: Colors.white, fontSize: 14, fontFamily: "Inter-SemiBold" },
  continueBtnContainer: { alignItems: "center" },
  continueBtn: { width: "85%", backgroundColor: Colors.primary, paddingVertical: 8, borderRadius: 5, alignItems: "center", marginTop: 20, },
  continueText: { color: Colors.white, fontSize: 14, fontFamily: "Inter-SemiBold" },
  minorBtn: { backgroundColor: "#C0FFC7" },
  moderateBtn: { backgroundColor: "#FAFDA9" },
  severeBtn: { backgroundColor: "#FFC8CB" },
  minorBtnA: { color: "#25B736" },
  moderateBtnA: { color: "#B8921D" },
  severeBtnA: { color: "#E2141E" },
});