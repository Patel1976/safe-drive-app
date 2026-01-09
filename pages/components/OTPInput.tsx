import React, { useState, useRef } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Colors } from "../../assets/color/colors";

type OTPInputProps = {
  length?: number;
  onChange: (otp: string) => void;
  value?: string;
};

export default function OTPInput({ length = 6, onChange }: OTPInputProps) {
  const [otpValues, setOtpValues] = useState<string[]>(Array(length).fill(""));
  const inputsRef = useRef<Array<TextInput | null>>([]);

  const handleChange = (text: string, index: number) => {
    if (!/^\d*$/.test(text)) return;
    const newOtp = [...otpValues];
    newOtp[index] = text;
    setOtpValues(newOtp);
    onChange(newOtp.join(""));
    if (text && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !otpValues[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      {Array(length)
        .fill(0)
        .map((_, i) => (
          <TextInput
            key={i}
            ref={(ref) => {inputsRef.current[i] = ref;}}
            style={styles.inputBox}
            maxLength={1}
            keyboardType="numeric"
            value={otpValues[i]}
            onChangeText={(text) => handleChange(text, i)}
            onKeyPress={(e) => handleKeyPress(e, i)}
            textAlign="center"
          />
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", justifyContent: "space-between", width: "100%" },
  inputBox: {
    width: 40,
    height: 40,
    borderWidth: 2,
    borderColor: Colors.inputBG,
    borderRadius: 8,
    fontSize: 18,
    fontFamily: "Inter-Medium",
    color: Colors.text,
    marginBottom: 20,
    paddingVertical: 1,
  },
});