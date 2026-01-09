import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from "react-native";
import Icons from "react-native-vector-icons/FontAwesome";
import { Colors } from "../../../assets/color/colors";
import { Dropdown } from "react-native-element-dropdown";
import Header from "../../components/Header";

export default function TowRequest() {
  const [vehicle, setVehicle] = useState(null);
  const [note, setNote] = useState("");
  const [towLocation, setTowLocation] = useState("Home");

  const vehicleData = [
    { label: "Car - ABC123", value: "car1" },
    { label: "Truck - XYZ456", value: "truck1" },
    { label: "Bike - LMN789", value: "bike1" },
    { label: "Bus - BUS432", value: "bus1" },
  ];

  return (
    <View style={{ flex: 1 }}>
      <Header title="SafeDrive" showBackButton={true} />
      <View style={styles.container}>
        {/* Officer Info */}
        <View style={styles.profileCard}>
          <View>
            <Text style={styles.profileTitle}>Tow Request</Text>
          </View>
          <Text style={styles.profileDetails}>Accident #A-2025-0423</Text>
        </View>

        {/* Searchable Dropdown */}
        <View style={styles.vehiclesCard}>
          <Text style={styles.label}>Vehicles To Tow</Text>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={vehicleData}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Select vehicle"
            searchPlaceholder="Search..."
            value={vehicle}
            onChange={(item) => {
              setVehicle(item.value);
            }}
          />
        </View>

        {/* Location Title + Text */}
        <View style={styles.section}>
          <View style={styles.currentLocationRow}>
            <View style={styles.locationIcon}>
              <Icons name="map-marker" size={18} style={styles.icons} />
            </View>
            <View style={{ flexDirection: "column" }}>
              <Text style={styles.label}>Location</Text>
              <Text style={styles.locationText}>Micoud Hwy, St Lucia</Text>
            </View>
          </View>
        </View>

        {/* Additional Note */}
        <View style={styles.section}>
          <Text style={styles.label}>Additional Note</Text>
          <TextInput
            style={styles.textArea}
            multiline
            numberOfLines={3}
            placeholder="Enter details here..."
            value={note}
            onChangeText={setNote}
          />
        </View>

        {/* Tow Location Radio Buttons */}
        <View style={styles.section}>
          <View style={styles.currentLocationRow}>
            <View style={styles.towImage}>
              <Image source={require("../../../assets/images/Police/towLocation.png")} />
            </View>
            <View style={{ flexDirection: "column" }}>
              <Text style={styles.label}>Tow Location</Text>
              <View style={styles.radioRow}>
                <TouchableOpacity
                  style={styles.radioBtn}
                  onPress={() => setTowLocation("Home")}
                >
                  <Icons
                    name={towLocation === "Home" ? "check-circle-o" : "circle-o"}
                    size={15}
                    color={towLocation === "Home" ? Colors.primary : Colors.primary}
                  />
                  <Text style={styles.radioText}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.radioBtn}
                  onPress={() => setTowLocation("Garage")}
                >
                  <Icons
                    name={towLocation === "Garage" ? "check-circle-o" : "circle-o"}
                    size={15}
                    color={towLocation === "Garage" ? Colors.text : Colors.text}
                  />
                  <Text style={styles.radioText}>Garage</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Location Icon + Text */}
        <View style={styles.section}>
          <View style={styles.locationRow}>
            <View style={styles.locationIcon}>
              <Icons name="map-marker" size={18} style={styles.icons} />
            </View>
            <Text style={styles.currentLocationText}>Micoud Hwy, St Lucia</Text>
          </View>
        </View>

        {/* Send Tow Request Button */}
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity style={styles.submitBtn}>
            <Text style={styles.submitText}>Send Tow Request</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
  },
  profileCard: {
    paddingHorizontal: 5,
    marginBottom: 20,
  },
  profileTitle: {
    fontSize: 26,
    fontFamily: "Roboto-Medium",
    color: Colors.text,
  },
  profileDetails: {
    color: Colors.textSecondary,
    fontSize: 14,
    fontFamily: "Inter-Regular",
  },
  vehiclesCard: {
    paddingHorizontal: 5,
  },
  label: {
    fontSize: 14,
    fontFamily: "Inter-SemiBold",
    color: Colors.text,
  },
  dropdown: {
    height: 37,
    borderColor: Colors.inputBG,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 10,
    marginTop: 12,
    color: Colors.textThird,
  },
  placeholderStyle: {
    fontSize: 13,
    fontFamily: "Inter-Medium",
    color: Colors.textThird,
  },
  selectedTextStyle: {
    fontSize: 13,
    fontFamily: "Inter-Medium",
    color: Colors.textThird,
  },
  inputSearchStyle: {
    height: 40,
    borderRadius: 8,
    fontSize: 13,
    fontFamily: "Inter-Medium",
    color: Colors.textThird,
  },
  iconStyle: {
    height: 25,
    color: Colors.textThird,
  },
  section: {
    marginBottom: 15,
    marginTop: 15,
    paddingHorizontal: 5,
  },
  textArea: {
    borderWidth: 1,
    borderColor: Colors.inputBG,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginTop: 12,
    minHeight: 70,
    textAlignVertical: "top",
    color: Colors.textThird,
    fontFamily: "Inter-Regular",
    fontSize: 13,
  },
  radioRow: {
    flexDirection: "row",
    gap: 20,
    marginTop: 2,
  },
  radioBtn: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioText: {
    marginLeft: 5,
    fontSize: 13,
    fontFamily: "Roboto-Regular",
    color: Colors.textThird,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  currentLocationRow: {
    flexDirection: "row",
  },
  locationIcon: { height: 29, width: 29, backgroundColor: Colors.sortBtn, borderRadius: 7, marginRight: 10, justifyContent: "center", alignItems: "center" },
  icons: { color: Colors.primary },
  towImage: {
    height: 29,
    width: 29,
    backgroundColor: Colors.towLocation,
    borderRadius: 7,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  locationText: {
    fontSize: 13,
    fontFamily: "Inter-Regular",
    color: Colors.textThird,
  },
  currentLocationText: {
    fontSize: 14,
    fontFamily: "Inter-SemiBold",
    color: Colors.text,
  },
  submitBtn: {
    width: "90%",
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  submitText: {
    color: Colors.white,
    fontSize: 14,
    fontFamily: "Inter-SemiBold",
  },
});