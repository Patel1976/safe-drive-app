import React, { useMemo, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from "react-native";
import { Colors } from "../../../assets/color/colors";
import Icons from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import Header from "../../components/Header";
import { useRoute, useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function TowDetails() {
    const navigation = useNavigation<any>();
    const route = useRoute();
    const { status: routeStatus } = (route.params as { status?: string }) || {};
    const [status, setStatus] = useState(routeStatus ?? "");
    console.log("status", status);
    const [towLocation, setTowLocation] = useState("Yes");
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

    const onChange = (event: any, selectedDate: Date | undefined) => {
        setShowPicker(false);
        if (selectedDate) {
            setDate(selectedDate);
        }
    };
    const formatDate = (d: Date) => {
        const day = d.getDate().toString().padStart(2, "0");
        const month = d.toLocaleString("en-US", { month: "short" }).toUpperCase();
        const year = d.getFullYear();
        return `${day} ${month} ${year}`;
    };

    const statusBadge = useMemo(() => {
        switch (status) {
            case "Details":
                return { bg: "#FF8D28", text: "In Progress" };
            case "Accept":
                return { bg: "#25B736", text: "Completed" };
            default:
                return { bg: "#D3D3D3", text: "Not Started" };
        }
    }, [status]);

    const custodySteps = [
        {
            id: 1,
            title: "Request Received",
            time: "03rd Jul 2025, 10:30 AM",
            icon: require("../../../assets/images/Police/rightIcon.png"),
            status: "Completed",
        },
        {
            id: 2,
            title: "Tow Truck Dispatched",
            time: "03rd Jul 2025, 10:55 AM",
            icon: require("../../../assets/images/Police/towTruck.png"),
            status: status === "Pending" ? "Pending" : "Completed",
        },
        {
            id: 3,
            title: "Vehicle Pickup",
            time: "03rd Jul 2025, 3:00 PM",
            icon: require("../../../assets/images/Police/towing.png"),
            status: status === "Pending" ? "Pending" : "Completed",
        },
        {
            id: 4,
            title: "Vehicle Delivered",
            time: status === "Completed" ? "03rd Jul 2025, 6:00 PM" : "Pending",
            icon: require("../../../assets/images/Police/vehicleDelivered.png"),
            status: status === "Completed" ? "Completed" : "Pending",
        },
    ];

    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
            <Header title="SafeDrive" showBackButton={true} />

            <ScrollView style={styles.container}>
                {/* Title Section */}
                <View style={styles.profileCard}>
                    <View>
                        <Text style={styles.profileTitle}>Tow/Wrecker Details</Text>
                    </View>
                    <View style={styles.profileDetails}>
                        <View style={styles.officerInfo}>
                            <View style={[styles.statusBadge, { backgroundColor: statusBadge.bg }]}>
                                <Text style={styles.statusText}>{statusBadge.text}</Text>
                            </View>
                            <Text style={styles.officerName}>Job #T-2025-8742</Text>
                        </View>
                    </View>
                </View>

                {/* Report Details */}
                <View style={styles.detailCard}>
                    <Text style={styles.label}>Vehicle</Text>
                    <Text style={styles.value}>2022 Honda Civic (XYZ-5678)</Text>

                    <Text style={styles.label}>Requested By</Text>
                    <Text style={styles.value}>Officer Smith, Badge #54321</Text>

                    <Text style={styles.label}>Contact Officer</Text>
                    <Text style={styles.value}>758-485-9229</Text>
                </View>

                <View style={styles.inputCard}>
                    <Text style={styles.label}>Pickup Location</Text>
                    <TextInput style={styles.inputBox}>Main St & 5th Ave</TextInput>

                    <Text style={styles.label}>Destination</Text>
                    <TextInput style={styles.inputBox}>Quick Tow Services Storage Yard</TextInput>

                    <Text style={styles.label}>COST (In USD)</Text>
                    <TextInput style={styles.inputBox}>12000</TextInput>
                </View>

                <View style={styles.storeContainer}>
                    <View style={{ flexDirection: "column" }}>
                        <Text style={styles.label}>Store Vehicle</Text>
                        <View style={styles.radioRow}>
                            <TouchableOpacity
                                style={styles.radioBtn}
                                onPress={() => setTowLocation("Yes")}
                            >
                                <Icons
                                    name={towLocation === "Yes" ? "check-circle-o" : "circle-o"}
                                    size={15}
                                    color={towLocation === "Yes" ? Colors.primary : Colors.primary}
                                />
                                <Text style={styles.radioText}>Yes</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.radioBtn}
                                onPress={() => setTowLocation("No")}
                            >
                                <Icons
                                    name={towLocation === "No" ? "check-circle-o" : "circle-o"}
                                    size={15}
                                    color={towLocation === "No" ? Colors.text : Colors.text}
                                />
                                <Text style={styles.radioText}>No</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flexDirection: "column" }}>
                        <Text style={styles.label}>Storage Date</Text>
                        <View style={styles.dateRow}>
                            <TouchableOpacity
                                style={styles.dateInput}
                                onPress={() => setShowPicker(true)}
                            >
                                <Text style={styles.dateText}>{formatDate(date)}</Text>
                                <Ionicons name="calendar" style={styles.calendarIcon} />
                            </TouchableOpacity>

                            {showPicker && (
                                <DateTimePicker
                                    value={date}
                                    mode="date"
                                    display="default"
                                    onChange={onChange}
                                />
                            )}
                        </View>
                    </View>
                </View>

                {/* Chain of Custody Section */}
                <View style={styles.custodySection}>
                    <Text style={styles.sectionTitle}>Chain of Custody</Text>
                    <TouchableOpacity style={styles.pickupBtn} onPress={() => navigation.navigate("DateTime", { status })}>
                        <Text style={styles.pickupText}>Vehicle Pickup</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.custodyCard}>
                    {custodySteps.map((step, index, array) => (
                        <View key={step.id} style={styles.custodyItem}>
                            {/* Icon + Line */}
                            <View style={styles.iconLineContainer}>
                                <View
                                    style={[
                                        styles.detailsIcon,
                                        {
                                            backgroundColor:
                                                step.status === "Completed" ? Colors.minorBtnA : Colors.white,
                                        },
                                    ]}
                                >
                                    <Image
                                        source={step.icon}
                                        style={{
                                            tintColor:
                                                step.status === "Completed" ? Colors.white : Colors.textSecondary,
                                        }}
                                    />
                                </View>
                                {index !== array.length - 1 && <View style={styles.verticalLine} />}
                            </View>

                            {/* Text Details */}
                            <View style={styles.custodyContainer}>
                                <Text style={styles.custodyTitle}>{step.title}</Text>
                                <Text
                                    style={[
                                        styles.custodyTime,
                                    ]}
                                >
                                    {step.time}
                                </Text>
                            </View>
                        </View>
                    ))}
                </View>

                {/* Go Back Button */}
                <View style={styles.actionButton}>
                    <TouchableOpacity style={styles.goBackBtn} onPress={() => navigation.navigate("FireCasesList")}>
                        <Text style={styles.goBackText}>Update</Text>
                    </TouchableOpacity>
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
    reportTitle: {
        fontSize: 22,
        fontFamily: "Inter-Bold",
        color: Colors.text,
    },
    statusBadge: {
        backgroundColor: "#FF8D28",
        alignSelf: "flex-start",
        borderRadius: 6,
        paddingHorizontal: 10,
        paddingVertical: 4,
        marginTop: 6,
    },
    statusText: {
        color: Colors.white,
        fontFamily: "Inter-SemiBold",
        fontSize: 12,
    },
    jobId: {
        color: Colors.textSecondary,
        fontFamily: "Inter-Regular",
        fontSize: 14,
        marginTop: 4,
        marginBottom: 20,
    },
    detailCard: {
        backgroundColor: Colors.reportBg,
        borderRadius: 19,
        paddingHorizontal: 20,
        marginBottom: 15,
        marginTop: 10,
        paddingBottom: 20,
    },
    label: {
        fontSize: 15,
        color: Colors.textThird,
        fontFamily: "Inter-Medium",
        marginTop: 15,
    },
    value: {
        fontSize: 13,
        color: Colors.text,
        fontFamily: "Inter-Regular",
    },
    inputCard: {
        marginBottom: 25,
        paddingHorizontal: 10,
    },
    inputBox: {
        borderWidth: 1,
        borderColor: Colors.inputBG,
        borderRadius: 5,
        paddingHorizontal: 15,
        marginTop: 10,
        color: Colors.text,
        fontFamily: "Inter-Regular",
        fontSize: 13,
        height: 39,
    },
    storeContainer: {
        flexDirection: "row",
        gap: 50,
        paddingHorizontal: 10,
        marginBottom: 40,
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
    dateRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 3,
    },
    dateInput: {
        flexDirection: "row",
        gap: 30,
        alignItems: "center",
        borderWidth: 1,
        borderColor: Colors.inputBG,
        borderRadius: 5,
        paddingVertical: 4,
        paddingHorizontal: 15,
    },
    dateText: {
        color: Colors.text,
        fontSize: 13,
        fontFamily: "Inter-Regular",
    },
    calendarIcon: {
        fontSize: 13,
        color: Colors.text
    },
    custodySection: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        marginBottom: 10,
        paddingHorizontal: 5,
    },
    sectionTitle: {
        fontSize: 15,
        color: Colors.textThird,
        fontFamily: "Inter-SemiBold",
    },
    pickupBtn: {
        backgroundColor: "#FBBC04",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
    },
    pickupText: {
        fontSize: 15,
        fontFamily: "Inter-SemiBold",
        color: Colors.text,
    },
    custodyCard: {
        backgroundColor: Colors.reportBg,
        borderRadius: 19,
        paddingHorizontal: 20,
        marginBottom: 25,
        paddingVertical: 15,
        marginHorizontal: 5,
    },
    custodyItem: {
        flexDirection: "row",
    },
    iconLineContainer: {
        width: 30,
        alignItems: "center",
    },
    detailsIcon: { height: 20, width: 20, backgroundColor: Colors.minorBtnA, borderRadius: 15, justifyContent: "center", alignItems: "center" },
    icons: { color: Colors.white },
    verticalLine: {
        width: 2,
        backgroundColor: Colors.textSecondary,
        flex: 1,
        marginTop: 2,
    },
    custodyContainer: {
        marginBottom: 15,
    },
    custodyTitle: {
        fontSize: 13,
        fontFamily: "Inter-Regular",
        color: Colors.textThird,
    },
    custodyTime: {
        fontSize: 15,
        color: Colors.text,
        fontFamily: "Inter-Medium",
    },
    custodyPending: {
        fontSize: 13,
        color: "#FF3B30",
        fontFamily: "Inter-SemiBold",
    },
    actionButton: {
        marginBottom: 30,
        alignItems: "center",
        marginTop: 10,
    },
    goBackBtn: {
        width: "70%",
        backgroundColor: Colors.primary,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        height: 32,
    },
    goBackText: {
        color: Colors.white,
        fontSize: 14,
        fontFamily: "Inter-SemiBold",
    },
});