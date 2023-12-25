// OTPConfirmation.js

import React, { useState } from "react";
import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";
import COLORS from "../constants/colors"; // Import  color constants

const OTPConfirmation = () => {
  const [otp, setOtp] = useState("");
  const navigation = useNavigation();
  const route = useRoute();
  const email = route.params?.email || "";

  const handleGenerateOTP = async () => {
    try {
      // Send a request to your backend to generate OTP
      await axios.post("http://192.168.1.21:3000/auth/generateRandomOTP", {
        email,
      });

      // Optionally, you can show a success message or navigate to the next screen
      console.log("OTP generated successfully");
    } catch (error) {
      console.error("Generate OTP Error:", error.message);
      // Handle the error, you might want to show an error message to the user
    }
  };

  const handleVerifyOTP = async () => {
    try {
      // Send a request to your backend to verify the entered OTP
      await axios.post("http://192.168.1.21:3000/auth/verifyOTP", {
        email,
        otp,
      });

      // Navigate to the ResetPassword screen
      navigation.navigate("ResetPassword", { email });
    } catch (error) {
      console.error("Verify OTP Error:", error.message);
      alert(
        "OTP verification failed. Please check the entered OTP and try again."
      );
    }
  };

  return (
    <View style={{ flex: 1, marginHorizontal: 22 }}>
      <View style={{ marginVertical: 22 }}>
        <Text
          style={{
            fontSize: 22,
            fontWeight: "bold",
            marginVertical: 12,
            color: COLORS.black,
          }}
        >
          OTP Confirmation 📬
        </Text>

        <Text
          style={{
            fontSize: 16,
            color: COLORS.black,
          }}
        >
          An OTP has been sent to your email address. Enter the OTP to reset
          your password.
        </Text>
      </View>

      <View style={{ marginBottom: 12 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 400,
            marginVertical: 8,
          }}
        >
          Enter OTP
        </Text>

        <View
          style={{
            width: "100%",
            height: 48,
            borderColor: COLORS.black,
            borderWidth: 1,
            borderRadius: 8,
            alignItems: "center",
            justifyContent: "center",
            paddingLeft: 22,
          }}
        >
          <TextInput
            placeholder="Enter OTP"
            placeholderTextColor={COLORS.black}
            keyboardType="numeric"
            style={{
              width: "100%",
            }}
            value={otp}
            onChangeText={(text) => setOtp(text)}
          />
        </View>
      </View>

      <TouchableOpacity onPress={handleGenerateOTP}>
        <Text
          style={{
            fontSize: 16,
            color: "blue",
            marginTop: 8,
            textDecorationLine: "underline",
          }}
        >
          Resend OTP
        </Text>
      </TouchableOpacity>

      <Button
        title="Verify OTP"
        filled
        style={{
          marginTop: 18,
          marginBottom: 4,
        }}
        onPress={handleVerifyOTP}
      />
    </View>
  );
};

export default OTPConfirmation;
