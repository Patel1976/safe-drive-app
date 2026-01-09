import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView, Pressable } from "react-native";
import { Colors } from "../../../assets/color/colors";
import Icon from "react-native-vector-icons/FontAwesome6";
import { useRoute, useNavigation } from "@react-navigation/native";
import Header from "../../components/Header";

export default function FireCaseDetail() {
    const navigation = useNavigation<any>();
    const route = useRoute();
    const { status: routeStatus } = (route.params as { status?: string }) || {};
    const [status, setStatus] = useState(routeStatus ?? "");


    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
            <Header title="SafeDrive" showBackButton={true} />

            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                {/* ===== Case Header ===== */}
                <View style={styles.caseHeader}>
                    <Text style={styles.caseTitle}>Case Details</Text>
                    <View style={styles.caseIdRow}>
                        <View style={styles.severityTag}>
                            <Text style={styles.severityText}>Serious</Text>
                        </View>
                        <Text style={styles.caseId}>Case #E-2025-0789</Text>
                    </View>
                </View>

                {/* ===== Info Card ===== */}
                <View style={styles.infoCard}>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Incident Type</Text>
                        <Text style={styles.infoValue}>multi-vehicle collision</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Location</Text>
                        <Text style={styles.infoValue}>Officer Smith, Badge #54321</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Reported Injuries</Text>
                        <Text style={styles.infoValue}>3 Injured (2 Adults, 1 Child)</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Reported By</Text>
                        <Text style={styles.infoValue}>Officer Mike Johnson, Badge #12345</Text>
                    </View>
                </View>

                {/* ===== Scene Photos ===== */}
                <View style={styles.photosSection}>
                    <Text style={styles.sectionTitle}>Scene Photos And Videos</Text>
                    <View style={styles.imageRow}>
                        <Image
                            source={require("../../../assets/images/Police/image1.jpg")}
                            style={styles.sceneImage}
                        />
                        <Image
                            source={require("../../../assets/images/Police/image2.jpg")}
                            style={styles.sceneImage}
                        />
                    </View>
                </View>

                {/* ===== Accept Button ===== */}
                <View style={styles.acceptSection}>
                    <TouchableOpacity style={styles.acceptBtn} onPress={() => navigation.navigate("FireCasesList")}>
                        <Text style={styles.acceptText}>Accept</Text>
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
    caseHeader: {
        paddingHorizontal: 5,
        marginBottom: 20,
    },
    caseTitle: {
        fontSize: 26,
        fontFamily: "Roboto-Medium",
        color: Colors.text,
    },
    caseIdRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    severityTag: {
        backgroundColor: Colors.primary,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    severityText: {
        color: Colors.white,
        fontSize: 14,
        fontFamily: "Inter-SemiBold",
    },
    caseId: {
        color: Colors.textSecondary,
        fontSize: 14,
        fontFamily: "Inter-Regular",
    },

    infoCard: {
        backgroundColor: "#F8F8F8",
        borderRadius: 19,
        paddingHorizontal: 16,
        paddingVertical: 15,
    },
    infoRow: {
        marginBottom: 12,
    },
    infoLabel: {
        fontSize: 15,
        fontFamily: "Inter-Medium",
        color: Colors.textThird,
    },
    infoValue: {
        fontSize: 13,
        fontFamily: "Inter-Regular",
        color: Colors.text,
    },

    photosSection: {
        marginTop: 20,
    },
    sectionTitle: {
        fontSize: 15,
        fontFamily: "Inter-SemiBold",
        color: Colors.textThird,
        marginBottom: 10,
    },
    imageRow: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 20,
    },
    sceneImage: {
        width: 161,
        height: 107,
        borderRadius: 10,
        resizeMode: "cover",
    },
    acceptSection: {
        marginVertical: 40,
        alignItems: "center",
    },
    acceptBtn: {
        width: "70%",
        height: 32,
        backgroundColor: Colors.primary,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    acceptText: {
        color: Colors.white,
        fontSize: 14,
        fontFamily: "Inter-SemiBold",
    },
});