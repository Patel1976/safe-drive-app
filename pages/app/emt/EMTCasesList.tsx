import React, { useState } from "react";
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../../assets/color/colors";
import Icons from "react-native-vector-icons/FontAwesome";
import Header from "../../components/Header";

export default function EMTCasesList() {
    const navigation = useNavigation<any>();

    const allReports = [
        {
            id: "1",
            title: "Multi-Vehicle Collision",
            time: "2 min ago",
            location: "I-95 North, Mile Marker 67",
            severityText: "3 Injured",
            severity: "Severe",
            status: "Respond",
        },
        {
            id: "2",
            title: "Multi-Vehicle Collision",
            time: "30 min ago",
            location: "I-95 North, Mile Marker 67",
            severityText: "4 Injured",
            severity: "Minor",
            status: "Accepted",
        },
        {
            id: "3",
            title: "Multi-Vehicle Collision",
            time: "40 min ago",
            location: "I-95 North, Mile Marker 67",
            severityText: "3 Injured",
            severity: "Moderate",
            status: "Accepted",
        },
        {
            id: "4",
            title: "Multi-Vehicle Collision",
            time: "45 min ago",
            location: "I-95 North, Mile Marker 67",
            severityText: "2 Injured",
            severity: "Moderate",
            status: "Respond",
        },
        {
            id: "5",
            title: "Multi-Vehicle Collision",
            time: "50 min ago",
            location: "I-95 North, Mile Marker 67",
            severityText: "7 Injured",
            severity: "Moderate",
            status: "Accepted",
        },
        {
            id: "6",
            title: "Multi-Vehicle Collision",
            time: "55 min ago",
            location: "I-95 North, Mile Marker 67",
            severityText: "3 Injured",
            severity: "Severe",
            status: "Respond",
        },
        {
            id: "7",
            title: "Multi-Vehicle Collision",
            time: "60 min ago",
            location: "I-95 North, Mile Marker 67",
            severityText: "2 Injured",
            severity: "Severe",
            status: "Respond",
        },
    ];

    const [reports, setReports] = useState(allReports);
    console.log("status", reports);

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Respond":
                return Colors.primary;
            case "Accepted":
                return "#25B736";
            default:
                return Colors.textThird;
        }
    };

    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case "Severe":
                return "#FF535D";
            case "Moderate":
                return "#AD8911";
            case "Minor":
                return "#0A6715";
            default:
                return Colors.text;
        }
    };

    const getSeverityIcon = (severity: string) => {
        switch (severity) {
            case "Severe":
                return require("../../../assets/images/EMT/severe.png");
            case "Moderate":
                return require("../../../assets/images/EMT/moderate.png");
            case "Minor":
                return require("../../../assets/images/EMT/minor.png");
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <Header title="SafeDrive" showBackButton={false} />
            <View style={styles.container}>
                {/* Officer Card */}
                <View style={styles.profileCard}>
                    <View>
                        <Text style={styles.profileTitle}>Incoming Cases</Text>
                    </View>
                </View>

                {/* Reports List */}
                <FlatList
                    data={reports}
                    keyExtractor={(item) => item.id}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => {
                                if (item.status === "Respond") {
                                    navigation.navigate("EmtCaseDetail", { status: item.status });
                                } else if (item.status === "Accepted") {
                                    navigation.navigate("EMTPreliminaryReport", { status: item.status });
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
                                                source={require("../../../assets/images/EMT/severityIcon.png")}
                                                style={styles.actionImage}
                                            />
                                        </View>
                                        <Text style={styles.reportIdText}>{item.severityText}</Text>
                                        <View style={[styles.severityButton, { borderColor: getSeverityColor(item.severity) }]}>
                                            <Image
                                                source={getSeverityIcon(item.severity)}
                                                style={styles.severityIcon}
                                            />
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
        marginBottom: 20,
    },
    profileTitle: {
        fontSize: 26,
        fontFamily: "Roboto-Medium",
        color: Colors.text,
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
    severeImage: { height: 14, width: 14, backgroundColor: Colors.inputBG, borderRadius: 10, marginRight: 5, justifyContent: "center", alignItems: "center", marginTop: 3, },
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
    severityIcon: {
        resizeMode: "contain",
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