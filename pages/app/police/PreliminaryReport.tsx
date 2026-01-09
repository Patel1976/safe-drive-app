  import React, { useState } from "react";
  import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView, Pressable } from "react-native";
  import { Colors } from "../../../assets/color/colors";
  import Icon from "react-native-vector-icons/FontAwesome6";
  import { useRoute, useNavigation } from "@react-navigation/native";
  import Header from "../../components/Header";

  export default function PreliminaryReport() {
    const navigation = useNavigation<any>();
    const [note, setNote] = useState("");
    const route = useRoute();
    const { status: routeStatus } = (route.params as { status?: string }) || {};
    const [status, setStatus] = useState(routeStatus ?? "");
    console.log("status", status);
    const images = [
      { id: 1, uri: require("../../../assets/images/Police/image1.jpg") },
      { id: 2, uri: require("../../../assets/images/Police/image2.jpg") },
      { id: 3, uri: require("../../../assets/images/Police/image3.jpg") },
    ];

    const handleAction = (action: string) => {
      if (action === "Request Tow Services") {
        navigation.navigate("Home", { screen: "TowRequest" });
      } else if (action === "Request EMT Services") {
        navigation.navigate("Home", { screen: "EmtRequest" });
      } else if (action === "Submit To HQ") {
        navigation.navigate("Report", { screen: "PoliceReportsList" });
      } else if (action === "EMT Report") {
        navigation.navigate("Report", { screen: "EMTReport", params: { status } });
      } else if (action === "Fire Report") {
        navigation.navigate("Report", { screen: "FireReport", params: { status } });
      } else if (action === "Insurance Report") {
        navigation.navigate("Report", { screen: "InsuranceReport", params: { status } });
      } else if (action === "Tow Report") {
        navigation.navigate("Report", { screen: "TowReport", params: { status } });
      }
    };

    // const buttonsToShow =
    let reportOptions = [];
    if (status === "Pending") {
      reportOptions = [
        { id: 1, label: "EMT Report", image: require("../../../assets/images/Police/emtReport.png") },
        { id: 2, label: "Fire Report", image: require("../../../assets/images/Police/fireReport.png") },
        { id: 4, label: "Insurance Report", image: require("../../../assets/images/Police/insuranceReport.png") },
      ];
    } else if (status === "Completed") {
      reportOptions = [
        { id: 1, label: "EMT Report", image: require("../../../assets/images/Police/emtReport.png") },
        { id: 2, label: "Fire Report", image: require("../../../assets/images/Police/fireReport.png") },
        { id: 3, label: "Tow Report", image: require("../../../assets/images/Police/towReport.png") },
        { id: 4, label: "Insurance Report", image: require("../../../assets/images/Police/insuranceReport.png") },
      ];
    } else {
      reportOptions = [
        { id: 1, label: "Submit To HQ", image: require("../../../assets/images/Police/hqSubmit.png") },
        { id: 2, label: "Request Tow Services", image: require("../../../assets/images/Police/requestTow.png") },
        { id: 4, label: "Request EMT Services", image: require("../../../assets/images/Police/emtRequest.png") },
      ];
    }


    return (
      <View style={{ flex: 1 }}>
        <Header title="SafeDrive" showBackButton={true} />
        <ScrollView style={styles.container}>
          {/* Officer Card */}
          <View style={styles.profileCard}>
            <View>
              <Text style={styles.profileTitle}>Preliminary Report</Text>
            </View>
            <View style={styles.profileDetails}>
              <View style={styles.officerInfo}>
                <Image
                  source={require("../../../assets/images/Police/profile.png")}
                  style={styles.officerImage}
                />
                <Text style={styles.officerName}>Accident #A-2025-0423</Text>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate("Add")}>
                {status != "Completed" && <Icon name="edit" size={17} color={Colors.text} />}
              </TouchableOpacity>
            </View>
          </View>

          {/* Incident Title + Text */}
          <View style={styles.section}>
            <View style={styles.detailsRow}>
              <View style={styles.detailsIcon}>
                <Image source={require("../../../assets/images/Police/incidentDetails.png")} />
              </View>
              <View style={{ flexDirection: "column" }}>
                <Text style={styles.label}>Incident Details</Text>
                <Text style={styles.descriptionText}>Vehicle Collision • Minor Injury</Text>
              </View>
            </View>
          </View>

          {/* Location Title + Text */}
          <View style={styles.section}>
            <View style={styles.detailsRow}>
              <View style={styles.detailsIcon}>
                <Image source={require("../../../assets/images/Police/location.png")} />
              </View>
              <View style={{ flexDirection: "column" }}>
                <Text style={styles.label}>Location</Text>
                <Text style={styles.descriptionText}>Micoud Hwy, St Lucia</Text>
              </View>
            </View>
          </View>

          {/* Date & Time */}
          <View style={styles.section}>
            <View style={styles.detailsRow}>
              <View style={styles.detailsIcon}>
                <Image source={require("../../../assets/images/Police/dateTime.png")} />
              </View>
              <View style={{ flexDirection: "column" }}>
                <Text style={styles.label}>Date & Time</Text>
                <Text style={styles.descriptionText}>August 22, 2025 • 10:23 AM</Text>
              </View>
            </View>
          </View>

          {/* Vehicles Title + Text */}
          <View style={styles.section}>
            <View style={styles.detailsRow}>
              <View style={styles.detailsIcon}>
                <Image source={require("../../../assets/images/Police/vehicle.png")} />
              </View>
              <View style={{ flexDirection: "column" }}>
                <Text style={styles.label}>VEHICLES INVOLVED</Text>
                <Text style={styles.descriptionText}>Toyota Camry - Car (John Smith)</Text>
                <Text style={styles.descriptionText}>Honda Civic - Bike (John Doe)</Text>
              </View>
            </View>
          </View>

          {/* Location Coordinates */}
          <View style={styles.coordinatesSection}>
            <View style={styles.sectionGps}>
              <Text style={styles.labelGps}>GPS: 40.7128° N, 74.0060° W</Text>
            </View>
            <View style={styles.sectionGps}>
              <Text style={styles.labelGps}>Insurance Policies: Indus Bank Insurance Policy</Text>
            </View>
          </View>

          {/* Note Title + TextBox */}
          <View style={styles.section}>
            <Text style={styles.labelNote}>Officer Notes :</Text>
            <TextInput
              style={styles.textArea}
              multiline
              numberOfLines={3}
              placeholder="Enter details here..."
              value={note}
              onChangeText={setNote}
            />
          </View>

          {/* Image Title + Images */}
          <View style={styles.section}>
            <Text style={styles.labelNote}>Images</Text>
            <View style={styles.imageContainer}>
              {images.map((img) => (
                <Image key={img.id} source={img.uri} style={styles.image} />
              ))}
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButton}>
            {status === "Pending" ? (
              <TouchableOpacity
                style={styles.submitBtn}
                onPress={() => navigation.navigate("TowRequest")}
              >
                <Text style={styles.submitText}>Request Tow Service</Text>
              </TouchableOpacity>
            ) : status === "Completed" ? (
              <TouchableOpacity
                style={styles.submitBtn}
                onPress={() => navigation.navigate("PoliceTabs", { screen: "Add" })}
              >
                <Text style={styles.submitText}>Edit Report</Text>
              </TouchableOpacity>
            ) : null}
          </View>
          {/* ✅ Bottom Buttons (Filtered by Status) */}
          <View style={styles.buttonContainer}>
            {reportOptions.map((btn) => (
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
        </ScrollView>
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
      marginBottom: 8,
    },
    profileTitle: {
      fontSize: 26,
      fontFamily: "Roboto-Medium",
      color: Colors.text,
    },
    profileDetails: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 8,
    },
    officerInfo: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    officerImage: {
      width: 25,
      height: 25,
    },
    officerName: {
      color: Colors.textSecondary,
      fontSize: 14,
      fontFamily: "Inter-Regular",
    },
    section: {
      marginTop: 15,
      paddingHorizontal: 10,
    },
    coordinatesSection: {
      marginTop: 15,
    },
    sectionGps: {
      marginTop: 5,
      paddingHorizontal: 10,
    },
    detailsRow: {
      flexDirection: "row",
    },
    detailsIcon: { height: 25, width: 25, backgroundColor: Colors.sortBtn, borderRadius: 10.5, marginRight: 10, justifyContent: "center", alignItems: "center" },
    icons: { color: Colors.primary },
    label: {
      fontSize: 14,
      fontFamily: "Inter-SemiBold",
      color: Colors.text,
    },
    labelGps: {
      fontSize: 13,
      fontFamily: "Inter-SemiBold",
      color: Colors.text,
    },
    labelNote: {
      fontSize: 15,
      fontFamily: "Inter-Medium",
      color: Colors.text,
      marginTop: 10,
    },
    descriptionText: {
      fontSize: 13,
      fontFamily: "Inter-Regular",
      color: Colors.textThird,
    },
    Text: {
      fontSize: 14,
      color: Colors.muted,
    },
    textArea: {
      borderWidth: 1,
      borderColor: Colors.inputBG,
      borderRadius: 10,
      paddingHorizontal: 15,
      marginTop: 10,
      minHeight: 82,
      textAlignVertical: "top",
      color: Colors.textThird,
      fontFamily: "Inter-Regular",
      fontSize: 15,
    },
    imageContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: 10,
      marginTop: 10,
    },
    image: {
      width: 99,
      height: 101,
      borderRadius: 10,
    },
    actionButton: {
      marginBottom: 20,
      marginTop: 40,
      alignItems: "center",
    },
    submitBtn: {
      width: "80%",
      backgroundColor: Colors.primary,
      paddingVertical: 10,
      borderRadius: 5,
      alignItems: "center",
    },
    submitText: {
      color: Colors.white,
      fontSize: 14,
      fontFamily: "Inter-SemiBold",
    },
    buttonContainer: {
      marginBottom: 25,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      gap: 8,
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
      backgroundColor: Colors.white,
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
  });