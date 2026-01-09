import React, { useState } from "react";
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../../assets/color/colors";
import Icons from "react-native-vector-icons/FontAwesome";
import Header from "../../components/Header";

export default function StorageList() {
    const navigation = useNavigation<any>();

    const allReports = [
        {
            id: "1",
            title: "Toyota Camry (ABC-1234)",
            time: "Overdue",
            location: "I-95 North, Mile Marker 67",
            severityText: "Officer Johnson",
            severity: "15 Days",
            status: "Notify",
        },
        {
            id: "2",
            title: "Honda Civic (XYZ-5678)",
            time: "Warning",
            location: "I-95 North, Mile Marker 67",
            severityText: "Officer Smith",
            severity: "10 Days",
            status: "Notify",
        },
        {
            id: "3",
            title: "Honda Civic (XYZ-5678)",
            time: "Approaching Limit",
            location: "I-95 North, Mile Marker 67",
            severityText: "Officer Smith",
            severity: "7 Days",
            status: "Notify",
        },
        {
            id: "4",
            title: "Toyota Camry (ABC-1234)",
            time: "Overdue",
            location: "I-95 North, Mile Marker 67",
            severityText: "Officer Johnson",
            severity: "10 Days",
            status: "Notify",
        },
        {
            id: "5",
            title: "Honda Civic (XYZ-5678)",
            time: "Warning",
            location: "I-95 North, Mile Marker 67",
            severityText: "Officer Smith",
            severity: "7 Days",
            status: "Notify",
        },
        {
            id: "6",
            title: "Honda Civic (XYZ-5678)",
            time: "Approaching Limit",
            location: "I-95 North, Mile Marker 67",
            severityText: "Officer Smith",
            severity: "7 Days",
            status: "Notify",
        },
        {
            id: "7",
            title: "Toyota Camry (ABC-1234)",
            time: "Overdue",
            location: "I-95 North, Mile Marker 67",
            severityText: "Officer Johnson",
            severity: "15 Days",
            status: "Notify",
        },
    ];

    const [reports, setReports] = useState(allReports);
    console.log("status", reports);

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Overdue":
                return Colors.textThird;
            case "Warning":
                return Colors.primary;
            case "Approaching Limit":
                return "#AD8911";
            default:
                return Colors.text;
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <Header title="SafeDrive" showBackButton={false} />
            <View style={styles.container}>
                {/* Officer Card */}
                <View style={styles.profileCard}>
                    <View>
                        <Text style={styles.profileTitle}>Storage List</Text>
                    </View>
                </View>

                {/* Reports List */}
                <View style={styles.reportListTitle}>
                    <Text style={styles.reportTitle}>All Vehicles in Storage</Text>
                    <TouchableOpacity style={styles.filterBtnContainer}>
                        <Icons name="filter" style={styles.filterBtnIcon}></Icons>
                        <Text style={styles.filterBtnText}>Filter</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={reports}
                    keyExtractor={(item) => item.id}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => {
                                if (item.status === "Notify") {
                                    navigation.navigate("StorageDetails", { status: item.status });
                                }
                            }}
                            style={styles.reportCard}
                            activeOpacity={0.8}
                        >
                            <View style={styles.reportRow}>
                                {/* LEFT SIDE: Report Info */}
                                <View style={styles.reportLeft}>
                                    <Text style={styles.reportTitle}>{item.title}</Text>

                                    <View style={styles.locationRow}>
                                        <View style={styles.locationIcon}>
                                            <Icons name="map-marker" size={9} style={styles.icons} />
                                        </View>
                                        <Text style={styles.locationText}>{item.location}</Text>
                                    </View>
                                    <View style={styles.severeRow}>
                                        <View style={styles.severeImage}>
                                            <Image
                                                source={require("../../../assets/images/Tow/officerIcon.png")}
                                                style={styles.actionImage}
                                            />
                                        </View>
                                        <Text style={styles.reportIdText}>{item.severityText}</Text>
                                        <View style={[styles.severityButton]}>
                                            <Text style={[styles.severityButtonText]}>
                                                {item.severity}
                                            </Text>
                                        </View>
                                    </View>

                                </View>

                                {/* RIGHT SIDE: Date + Status */}
                                <View style={styles.reportRight}>
                                    <Text style={[styles.dateText, {color: getStatusColor(item.time)}]}>{item.time}</Text>
                                    <View
                                        style={[
                                            styles.statusButton,
                                        ]}
                                    >
                                        <Text style={styles.statusButtonText}>{item.status}</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                />
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
        marginBottom: 10,
    },
    profileTitle: {
        fontSize: 26,
        fontFamily: "Roboto-Medium",
        color: Colors.text,
    },
    reportListTitle: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 5,
        paddingVertical: 15,
        marginBottom: 5,
    },
    filterBtnContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 3,
        borderWidth: 1,
        paddingHorizontal: 9,
        borderRadius: 5,
        borderColor: "#00000020"
    },
    filterBtnIcon: {
        color: Colors.text,
        fontSize: 14,
    },
    filterBtnText: {
        color: Colors.text,
        fontSize: 13,
        fontFamily: "Inter-SemiBold",
    },
    separator: {
        height: 1,
        backgroundColor: Colors.inputBG,
        marginVertical: 5,
    },
    reportCard: {
        flexDirection: "column",
        paddingVertical: 10,
        paddingHorizontal: 8,
        backgroundColor: Colors.background,
        borderRadius: 8,
    },
    reportRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
    reportLeft: {
        flex: 1,
        paddingRight: 10,
    },
    reportRight: {
        alignItems: "flex-end",
        justifyContent: "space-between",
        gap: 6,
    },
    dateStatus: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    reportTitle: {
        fontSize: 15,
        fontFamily: "Inter-Medium",
        color: Colors.text,
    },
    dateText: {
        fontSize: 13,
        fontFamily: "Roboto-Medium",
        color: Colors.textThird,
    },
    locationRow: {
        flexDirection: "row",
    },
    severeRow: {
        flexDirection: "row",
        marginTop: 4,
    },
    locationIcon: { height: 14, width: 14, backgroundColor: Colors.inputBG, borderRadius: 10, marginRight: 5, justifyContent: "center", alignItems: "center", marginTop: 3, },
    severeImage: { height: 14, width: 14, backgroundColor: "#090A50", borderRadius: 10, marginRight: 5, justifyContent: "center", alignItems: "center", marginTop: 3, },
    icons: { color: Colors.text },
    actionImage: {
        resizeMode: "contain",
        alignSelf: "center",
    },
    locationText: {
        fontSize: 13,
        fontFamily: "Inter-Regular",
        color: Colors.textThird,
        flexShrink: 1,
    },
    reportIdText: {
        fontSize: 13,
        fontFamily: "Inter-Regular",
        color: Colors.textThird
    },
    severityButton: {
        borderWidth: 1,
        borderRadius: 6,
        borderColor: "#FF535D",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 8,
        gap: 4,
        height: 22,
        width: 78,
        alignSelf: "center",
    },
    severityIcon: {
        resizeMode: "contain",
    },
    severityButtonText: {
        fontSize: 12,
        fontFamily: "Inter-SemiBold",
        color: "#FF535D",
    },
    statusButton: {
        width: 74,
        paddingVertical: 4,
        borderRadius: 5,
        alignItems: "center",
        backgroundColor: Colors.primary,
    },
    statusButtonText: {
        color: Colors.white,
        fontSize: 13,
        fontFamily: "Roboto-Medium",
    },
});