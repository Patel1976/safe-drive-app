import React, { useMemo, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Colors } from "../../../assets/color/colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import Header from "../../components/Header";
import { useRoute, useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function DateTime() {
    const navigation = useNavigation<any>();
    const route = useRoute();
    const { status: routeStatus } = (route.params as { status?: string }) || {};

    const [status, setStatus] = useState(routeStatus ?? "");
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    const onChangeDate = (event: any, selectedDate?: Date) => {
        setShowDatePicker(false);
        if (selectedDate) setDate(selectedDate);
    };

    const onChangeTime = (event: any, selectedTime?: Date) => {
        setShowTimePicker(false);
        if (selectedTime) setTime(selectedTime);
    };

    const formatDate = (d: Date) => {
        const day = d.getDate().toString().padStart(2, "0");
        const month = d.toLocaleString("en-US", { month: "short" }).toUpperCase();
        const year = d.getFullYear();
        return `${day} ${month} ${year}`;
    };

    const formatTime = (t: Date) => {
        let hours = t.getHours();
        const minutes = t.getMinutes().toString().padStart(2, "0");
        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12;
        return `${hours.toString().padStart(2, "0")}:${minutes} ${ampm}`;
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

    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
            <Header title="SafeDrive" showBackButton={false} />

            <ScrollView style={styles.container}>
                {/* Title Section */}
                <View style={styles.profileCard}>
                    <Text style={styles.profileTitle}>Add a Date & Time</Text>

                    <View style={styles.profileDetails}>
                        <View style={styles.officerInfo}>
                            <View style={[styles.statusBadge, { backgroundColor: statusBadge.bg }]}>
                                <Text style={styles.statusText}>{statusBadge.text}</Text>
                            </View>
                            <Text style={styles.officerName}>Job #T-2025-8742</Text>
                        </View>
                    </View>
                </View>

                {/* Date & Time Section */}
                <View style={styles.storeContainer}>
                    <View style={styles.dateRow}>
                        <TouchableOpacity
                            style={styles.dateInput}
                            onPress={() => setShowDatePicker(true)}
                        >
                            <Text style={styles.dateText}>{formatDate(date)}</Text>
                            <Ionicons name="calendar" style={styles.calendarIcon} />
                        </TouchableOpacity>
                        {showDatePicker && (
                            <DateTimePicker
                                value={date}
                                mode="date"
                                display="default"
                                onChange={onChangeDate}
                            />
                        )}
                    </View>

                    <View style={styles.dateRow}>
                        <TouchableOpacity
                            style={styles.dateInput}
                            onPress={() => setShowTimePicker(true)}
                        >
                            <Text style={styles.dateText}>{formatTime(time)}</Text>
                            <Ionicons name="alarm" style={styles.calendarIcon} />
                        </TouchableOpacity>
                        {showTimePicker && (
                            <DateTimePicker
                                value={time}
                                mode="time"
                                display="default"
                                onChange={onChangeTime}
                            />
                        )}
                    </View>
                </View>

                {/* Buttons */}
                <View style={styles.actionButton}>
                    <TouchableOpacity
                        style={styles.updateBtn}
                        onPress={() => navigation.navigate("FireCasesList")}
                    >
                        <Text style={styles.updateText}>Save</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.goBackBtn}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons
                            name="arrow-back"
                            style={styles.goBackIcon}
                        />
                        <Text style={styles.goBackText}>Go Back</Text>
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
    officerName: {
        color: Colors.textSecondary,
        fontSize: 14,
        fontFamily: "Inter-Regular",
    },
    statusBadge: {
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
    storeContainer: {
        flexDirection: "column",
        gap: 25,
        marginVertical: 25,
        paddingHorizontal: 10,
    },
    dateRow: {
        flex: 1,
    },
    dateInput: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 1,
        borderColor: Colors.inputBG,
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 15,
    },
    dateText: {
        color: Colors.text,
        fontSize: 13,
        fontFamily: "Inter-Regular",
    },
    calendarIcon: {
        fontSize: 14,
        color: Colors.text,
    },
    actionButton: {
        marginBottom: 30,
        alignItems: "center",
    },
    updateBtn: {
        width: "70%",
        backgroundColor: Colors.primary,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        height: 32,
        marginBottom: 10,
    },
    updateText: {
        color: Colors.white,
        fontSize: 14,
        fontFamily: "Inter-SemiBold",
    },
    goBackBtn: {
        width: "70%",
        borderRadius: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    goBackIcon: {
        color: Colors.text,
        fontSize: 17,
        marginRight: 3,
    },
    goBackText: {
        color: Colors.text,
        fontSize: 13,
        fontFamily: "Inter-Regular",
    },
});