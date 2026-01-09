import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Image, Platform, PermissionsAndroid, Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Colors } from "../../../assets/color/colors";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";
import Header from "../../components/Header";

export default function EmtRequest() {
    const [injurySeverity, setInjurySeverity] = useState<string | null>(null);
    const [urgency, setUrgency] = useState<string | null>(null);
    const [numberOfInjured, setNumberOfInjured] = useState("");
    const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
    const [address, setAddress] = useState<string | null>(null);

    const defaultLocation = {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };

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
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyA1H9O30j-Ig1R22WNy5i3WwMGRrjsk0xE`
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


    const handleSubmit = () => {
        console.log("Submitted:", { numberOfInjured, injurySeverity, urgency, location });
    };

    return (
        <View style={{ flex: 1 }}>
            <Header title="SafeDrive" showBackButton={true} />
            <ScrollView style={styles.container}>
                {/* Header */}
                <View style={styles.profileCard}>
                    <Text style={styles.profileTitle}>EMT Request</Text>
                    <Text style={styles.officerName}>Record details for incident report</Text>
                </View>

                {/* Map / Photo Section */}
                <View style={styles.mapBox}>
                    {location ? (
                        console.log("locations", location),
                        <MapView
                            provider={PROVIDER_GOOGLE}
                            style={styles.map}
                            region={{
                                latitude: 23.113798,
                                longitude: 72.544312,
                                latitudeDelta: 0.01,
                                longitudeDelta: 0.01,
                            }}
                            showsUserLocation={true}
                            showsMyLocationButton={true}
                        >
                            <Marker coordinate={{ latitude: 23.113798, longitude: 72.544312 }} title={address || "You are here"} />
                        </MapView>
                    ) : (
                        <Icon name="map-marker" size={40} color={Colors.muted} />
                    )}
                </View>
                {location && (
                    <View style={{ flexDirection: "row" }}>
                        <View style={styles.locationIcon}>
                            <Icon name="map-marker" size={14} style={styles.icons} />
                        </View>
                        <Text style={styles.location}>
                            {address ? address : "Fetching address..."}
                        </Text>
                    </View>
                )}
                {/* Description Field */}
                <Text style={styles.sectionTitle}>Number Of Injured</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textBox}
                        value={numberOfInjured}
                        onChangeText={setNumberOfInjured}
                        keyboardType="numeric"
                    />
                    <Image
                        source={require('../../../assets/images/Police/NumberofInjured.png')}
                        style={styles.inputIcon}
                    />
                </View>

                {/* Injury Severity */}
                <Text style={styles.sectionTitle}>Injury Severity</Text>
                <View style={styles.severityRow}>
                    <TouchableOpacity
                        style={[styles.minorBtn, styles.severityBtn, injurySeverity === "Minor" && styles.minorBtnA]}
                        onPress={() => setInjurySeverity("Minor")}
                    >
                        <Text style={[styles.severityText, injurySeverity === "Minor" && styles.activeText]}>
                            Minor
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.moderateBtn, styles.severityBtn, injurySeverity === "Moderate" && styles.moderateBtnA]}
                        onPress={() => setInjurySeverity("Moderate")}
                    >
                        <Text style={[styles.severityText, injurySeverity === "Moderate" && styles.activeText]}>
                            Moderate
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.severeBtn, styles.severityBtn, injurySeverity === "Severe" && styles.severeBtnA]}
                        onPress={() => setInjurySeverity("Severe")}
                    >
                        <Text style={[styles.severityText, injurySeverity === "Severe" && styles.activeText]}>
                            Severe
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Urgency */}
                <Text style={styles.sectionTitle}>Urgency</Text>
                <View style={styles.severityRow}>
                    <TouchableOpacity
                        style={[styles.minorBtn, styles.severityBtn, urgency === "Low" && styles.minorBtnA]}
                        onPress={() => setUrgency("Low")}
                    >
                        <Text style={[styles.severityText, urgency === "Low" && styles.activeText]}>
                            Low
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.moderateBtn, styles.severityBtn, urgency === "Moderate" && styles.moderateBtnA]}
                        onPress={() => setUrgency("Moderate")}
                    >
                        <Text style={[styles.severityText, urgency === "Moderate" && styles.activeText]}>
                            Moderate
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.severeBtn, styles.severityBtn, urgency === "Critical" && styles.severeBtnA]}
                        onPress={() => setUrgency("Critical")}
                    >
                        <Text style={[styles.severityText, urgency === "Critical" && styles.activeText]}>
                            Critical
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Submit Button */}
                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
                        <Text style={styles.submitText}>Request EMT</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.white, paddingHorizontal: 20 },
    profileCard: { backgroundColor: Colors.background, paddingHorizontal: 5, borderRadius: 10, marginBottom: 20 },
    profileTitle: { fontSize: 26, fontFamily: "Roboto-Medium", color: Colors.text },
    officerName: { fontSize: 14, fontFamily: "Inter-Regular", color: Colors.textSecondary },
    mapBox: { height: 165, backgroundColor: Colors.background, borderWidth: 2, borderColor: Colors.inputBG, borderRadius: 10, justifyContent: "center", alignItems: "center", marginBottom: 8 },
    map: { ...StyleSheet.absoluteFillObject, borderRadius: 10, },
    locationIcon: { height: 22, width: 22, backgroundColor: Colors.inputBG, borderRadius: 10, marginRight: 5, justifyContent: "center", alignItems: "center", },
    icons: { color: Colors.text },
    location: { fontSize: 14, fontFamily: "Inter-Regular", color: Colors.text, marginBottom: 20 },
    sectionTitle: { fontSize: 14, fontFamily: "Inter-Medium", color: Colors.text, marginBottom: 10 },
    severityRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 25, gap: 30 },
    severityBtn: { flex: 1, borderRadius: 5, alignItems: "center", height: 44, justifyContent: "center" },
    severityText: { fontSize: 13, fontFamily: "Inter-Medium", color: Colors.textSecondary },
    activeBtn: { backgroundColor: Colors.primary },
    activeText: { color: Colors.white },
    inputContainer: { flexDirection: "row", alignItems: "center", maxHeight: 39, borderWidth: 1, borderColor: Colors.inputBG, borderRadius: 5, paddingHorizontal: 15, backgroundColor: Colors.background, marginBottom: 25 },
    inputIcon: { width: 16, height: 15 },
    textBox: { flex: 1, fontSize: 14, fontFamily: "Inter-Medium", color: Colors.textSecondary },
    buttonRow: { alignItems: "center", marginTop: 10 },
    submitBtn: { width: "70%", height: 35, backgroundColor: Colors.primary, borderRadius: 5, justifyContent: "center", alignItems: "center" },
    submitText: { color: Colors.white, fontSize: 14, fontFamily: "Inter-SemiBold" },
    minorBtn: { backgroundColor: "#C0FFC7" },
    moderateBtn: { backgroundColor: "#FAFDA9" },
    severeBtn: { backgroundColor: "#FFC8CB" },
    minorBtnA: { backgroundColor: "#0A6715" },
    moderateBtnA: { backgroundColor: "#AD8911" },
    severeBtnA: { backgroundColor: "#E2141E" },
});