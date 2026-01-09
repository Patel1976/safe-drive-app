import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import Signature from "react-native-signature-canvas";
import { Colors } from "../../../assets/color/colors";
import Header from "../../components/Header";
import { useNavigation } from "@react-navigation/native";

export default function Signatures() {
  const ref = useRef<any>(null);
  const [isSigned, setIsSigned] = useState(false);
  const navigation = useNavigation<any>();

  const handleSignature = (signature: string) => {
    console.log("Signature Captured:", signature);
  };

  const handleClear = () => {
    ref.current.clearSignature();
    setIsSigned(false);
  };

  const handleBegin = () => {
    setIsSigned(true);
  };

  return (
    <View style={{ flex: 1 }}>
      <Header title="SafeDrive" showBackButton={true} />

      <ScrollView style={styles.container}>
        <View style={styles.profileCard}>
          <Text style={styles.profileTitle}>Collect Signatures</Text>
          <Text style={styles.officerName}>Accident #A-2025-0423</Text>
        </View>
        <View style={styles.signatureContainer}>
          <Text style={styles.signatureLabel}>Officer: Mike Johnson</Text>
          <View style={styles.signature}>
            <Signature
              ref={ref}
              onOK={handleSignature}
              onBegin={handleBegin}
              onClear={handleClear}
              descriptionText=""
              clearText="Clear"
              confirmText="Save"
              webStyle={`
                .m-signature-pad {
                  border-radius: 10px;
                }
                .m-signature-pad--body {
                  background-color: white;
                }  
              `}
            />
            {!isSigned && (
              <View style={styles.placeholderContainer}>
                <Text style={styles.placeholderText}>Sign Here</Text>
              </View>
            )}
          </View>
          <View style={styles.clearBtnContainer}>
            <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
              <Text style={styles.clearButtonText}>Clear Signature</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.sectionTitle}>Driver Signatures</Text>
        <View style={styles.driverContainer}>
          <View style={styles.driverSignatureContainer}>
            <Text style={styles.driverSignatureLabel}>John Doe</Text>
            <View style={styles.driverSignature}>
              <Signature
                ref={ref}
                onOK={handleSignature}
                onBegin={handleBegin}
                onClear={handleClear}
                descriptionText=""
                clearText="Clear"
                confirmText="Save"
                webStyle={`
                .m-signature-pad {
                  border-radius: 10px;
                }
                .m-signature-pad--body {
                  background-color: white;
                }  
              `}
              />
              {!isSigned && (
                <View style={styles.driverPlaceholderContainer}>
                  <Text style={styles.driverPlaceholderText}>Sign Here</Text>
                </View>
              )}
            </View>
            <View style={styles.driverClearBtnContainer}>
              <TouchableOpacity style={styles.driverClearButton} onPress={handleClear}>
                <Text style={styles.driverClearButtonText}>Clear Signature</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.driverSignatureContainer}>
            <Text style={styles.driverSignatureLabel}>Alax jones</Text>
            <View style={styles.driverSignature}>
              <Signature
                ref={ref}
                onOK={handleSignature}
                onBegin={handleBegin}
                onClear={handleClear}
                descriptionText=""
                clearText="Clear"
                confirmText="Save"
                webStyle={`
                .m-signature-pad {
                  border-radius: 10px;
                }
                .m-signature-pad--body {
                  background-color: white;
                }  
              `}
              />
              {!isSigned && (
                <View style={styles.driverPlaceholderContainer}>
                  <Text style={styles.driverPlaceholderText}>Sign Here</Text>
                </View>
              )}
            </View>
            <View style={styles.driverClearBtnContainer}>
              <TouchableOpacity style={styles.driverClearButton} onPress={handleClear}>
                <Text style={styles.driverClearButtonText}>Clear Signature</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Text style={styles.sectionTitle}>Witness Signatures</Text>
        <View style={styles.driverContainer}>
          <View style={styles.driverSignatureContainer}>
            <Text style={styles.driverSignatureLabel}>John Doe</Text>
            <View style={styles.driverSignature}>
              <Signature
                ref={ref}
                onOK={handleSignature}
                onBegin={handleBegin}
                onClear={handleClear}
                descriptionText=""
                clearText="Clear"
                confirmText="Save"
                webStyle={`
                .m-signature-pad {
                  border-radius: 10px;
                }
                .m-signature-pad--body {
                  background-color: white;
                }  
              `}
              />
              {!isSigned && (
                <View style={styles.driverPlaceholderContainer}>
                  <Text style={styles.driverPlaceholderText}>Sign Here</Text>
                </View>
              )}
            </View>
            <View style={styles.driverClearBtnContainer}>
              <TouchableOpacity style={styles.driverClearButton} onPress={handleClear}>
                <Text style={styles.driverClearButtonText}>Clear Signature</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.driverSignatureContainer}>
            <Text style={styles.driverSignatureLabel}>Alax jones</Text>
            <View style={styles.driverSignature}>
              <Signature
                ref={ref}
                onOK={handleSignature}
                onBegin={handleBegin}
                onClear={handleClear}
                descriptionText=""
                clearText="Clear"
                confirmText="Save"
                webStyle={`
                .m-signature-pad {
                  border-radius: 10px;
                }
                .m-signature-pad--body {
                  background-color: white;
                }  
              `}
              />
              {!isSigned && (
                <View style={styles.driverPlaceholderContainer}>
                  <Text style={styles.driverPlaceholderText}>Sign Here</Text>
                </View>
              )}
            </View>
            <View style={styles.driverClearBtnContainer}>
              <TouchableOpacity style={styles.driverClearButton} onPress={handleClear}>
                <Text style={styles.driverClearButtonText}>Clear Signature</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.submitBtn}>
          <View style={styles.continueBtnContainer}>
            <TouchableOpacity style={styles.continueBtn} onPress={() => navigation.navigate("PreliminaryReport")}>
              <Text style={styles.continueText}>Complete and Continue</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.continueBtnContainer}>
            <TouchableOpacity style={styles.draftBtn} onPress={() => navigation.navigate("PoliceReportsList")}>
              <Text style={styles.draftText}>Save as Draft</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white, paddingHorizontal: 20 },
  profileCard: {
    backgroundColor: Colors.background,
    paddingHorizontal: 5,
    borderRadius: 10,
    marginBottom: 25,
  },
  profileTitle: { fontSize: 26, fontFamily: "Roboto-Medium", color: Colors.text },
  officerName: { fontSize: 14, fontFamily: "Inter-Regular", color: Colors.textSecondary },
  signatureContainer: {
    borderWidth: 1.5,
    borderColor: Colors.inputBG,
    borderRadius: 10,
    paddingHorizontal: 21,
    paddingVertical: 10,
    backgroundColor: Colors.sortBtn,
  },
  signatureLabel: { fontSize: 13, fontFamily: "Inter-SemiBold", color: Colors.text, marginBottom: 10 },
  signature: {
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: Colors.textSecondary,
    backgroundColor: Colors.white,
    height: 63,
    borderRadius: 10,
    overflow: "hidden",
    position: "relative",
  },
  placeholderContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -40 }, { translateY: -12 }],
    pointerEvents: "none",
  },
  placeholderText: {
    color: Colors.textSecondary,
    fontSize: 15,
    fontFamily: "Inter-Medium",
  },
  clearBtnContainer: {
    alignItems: "center",
  },
  clearButton: {
    width: "80%",
    backgroundColor: Colors.clearBtn,
    paddingVertical: 5,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 15,
  },
  clearButtonText: {
    color: Colors.white,
    fontSize: 13,
    fontFamily: "Inter-SemiBold",
  },
  sectionTitle: { fontSize: 15, fontFamily: "Roboto-Medium", color: Colors.text, marginBottom: 10, marginTop: 30, },
  driverContainer: {
    flexDirection: "row",
    gap: 15,
  },
  driverSignatureContainer: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: Colors.inputBG,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: Colors.sortBtn,
  },
  driverSignatureLabel: { fontSize: 13, fontFamily: "Inter-SemiBold", color: Colors.text, marginBottom: 10 },
  driverSignature: {
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: Colors.textSecondary,
    backgroundColor: Colors.white,
    height: 40,
    borderRadius: 10,
    overflow: "hidden",
    position: "relative",
  },
  driverPlaceholderContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -30 }, { translateY: -10 }],
    pointerEvents: "none",
  },
  driverPlaceholderText: {
    color: Colors.textSecondary,
    fontSize: 13,
    fontFamily: "Inter-Medium",
  },
  driverClearBtnContainer: {
    alignItems: "center",
  },
  driverClearButton: {
    width: "90%",
    backgroundColor: Colors.textSecondary,
    paddingVertical: 3,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 15,
  },
  driverClearButtonText: {
    color: Colors.white,
    fontSize: 13,
    fontFamily: "Inter-SemiBold",
  },
  submitBtn: { marginTop: 15, marginBottom: 30 },
  continueBtnContainer: { alignItems: "center" },
  continueBtn: { width: "85%", backgroundColor: Colors.primary, paddingVertical: 7, borderRadius: 5, alignItems: "center", marginTop: 20, },
  draftBtn: { width: "85%", backgroundColor: Colors.white, borderWidth: 1, borderColor: Colors.text, paddingVertical: 7, borderRadius: 5, alignItems: "center", marginTop: 20, },
  continueText: { color: Colors.white, fontSize: 14, fontFamily: "Inter-SemiBold" },
  draftText: { color: Colors.text, fontSize: 14, fontFamily: "Inter-SemiBold" },
});