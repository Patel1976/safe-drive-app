import React, { useState } from "react";
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../../assets/color/colors";
import Icons from "react-native-vector-icons/FontAwesome";
import Header from "../../components/Header";

export default function TowOrdersList() {
    const navigation = useNavigation<any>();

    const allReports = [
        {
            id: "1",
            title: "Toyota Camry (ABC-1234)",
            time: "2 min ago",
            location: "I-95 North, Mile Marker 67",
            severityText: "Officer Johnson",
            severity: "New",
            status: "Accept",
        },
        {
            id: "2",
            title: "Honda Civic (XYZ-5678)",
            time: "30 min ago",
            location: "I-95 North, Mile Marker 67",
            severityText: "Officer Alex",
            severity: "In Progress",
            status: "Details",
        },
        {
            id: "3",
            title: "Toyota Camry (ABC-1234)",
            time: "1 hr ago",
            location: "I-95 North, Mile Marker 67",
            severityText: "Officer Smith",
            severity: "Completed",
            status: "Details",
        },
        {
            id: "4",
            title: "Toyota Camry (ABC-1234)",
            time: "1 min ago",
            location: "I-95 North, Mile Marker 67",
            severityText: "Officer Johnson",
            severity: "New",
            status: "Accept",
        },
        {
            id: "5",
            title: "Honda Civic (XYZ-5678)",
            time: "30 min ago",
            location: "I-95 North, Mile Marker 67",
            severityText: "Officer Alex",
            severity: "In Progress",
            status: "Details",
        },
        {
            id: "6",
            title: "Toyota Camry (ABC-1234)",
            time: "1 hr ago",
            location: "I-95 North, Mile Marker 67",
            severityText: "Officer Smith",
            severity: "Completed",
            status: "Details",
        },
        {
            id: "7",
            title: "Honda Civic (XYZ-5678)",
            time: "2 min ago",
            location: "I-95 North, Mile Marker 67",
            severityText: "Officer Alex",
            severity: "New",
            status: "Accept",
        },
    ];

    const [reports, setReports] = useState(allReports);
    console.log("status", reports);

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Details":
                return Colors.text;
            case "Accept":
                return "#25B736";
            default:
                return Colors.textThird;
        }
    };

    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case "New":
                return "#E2141E";
            case "In Progress":
                return "#FF8D28";
            case "Completed":
                return "#25B736";
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
                        <Text style={styles.profileTitle}>Tow Orders</Text>
                    </View>
                </View>

                {/* Reports List */}
                <View style={styles.reportListTitle}>
                    <Text style={styles.reportTitle}>All Tow Jobs</Text>
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
                                if (item.status === "Details" && item.severity === "In Progress") {
                                    navigation.navigate("TowDetails", {status: item.status});
                                } else if (item.status === "Details" && item.severity === "Completed") {
                                    navigation.navigate("TowReport", {status: item.severity});
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
                                        <View style={[styles.severityButton, { borderColor: getSeverityColor(item.severity) }]}>
                                            <Text style={[styles.severityButtonText, { color: getSeverityColor(item.severity) }]}>
                                                {item.severity}
                                            </Text>
                                        </View>
                                    </View>

                                </View>

                                {/* RIGHT SIDE: Date + Status */}
                                <View style={styles.reportRight}>
                                    <Text style={styles.dateText}>{item.time}</Text>
                                    <View
                                        style={[
                                            styles.statusButton,
                                            { backgroundColor: getStatusColor(item.status) },
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
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 8,
        gap: 4,
        height: 22,
        width: 78,
        alignSelf: "center",
    },
    severityButtonText: {
        fontSize: 12,
        fontFamily: "Inter-SemiBold",
    },
    statusButton: {
        width: 74,
        paddingVertical: 4,
        borderRadius: 5,
        alignItems: "center",
    },
    statusButtonText: {
        color: Colors.white,
        fontSize: 13,
        fontFamily: "Roboto-Medium",
    },
});