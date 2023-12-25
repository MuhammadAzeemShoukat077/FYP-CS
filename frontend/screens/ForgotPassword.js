import React, { useState } from "react";
import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import COLORS from "../constants/colors"; // Import your color constants

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigation = useNavigation();

  const handleResetPassword = async () => {
    try {
      // Send a request to your backend to initiate the password reset
      await axios.post("http://192.168.1.21:3000/auth/sendResetEmail", {
        email,
      });

      // Navigate to the ResetPassword screen
      navigation.navigate("OTPConfirmation", { email });
    } catch (error) {
      console.error("Forgot Password Error:", error.message);
      // Handle the error (e.g., show an error message)
      alert(
        "Password reset request failed. Please check your email and try again."
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
          Forgot Password? 🤔
        </Text>

        <Text
          style={{
            fontSize: 16,
            color: COLORS.black,
          }}
        >
          Enter your email address to reset your password.
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
          Email address
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
            placeholder="Enter your email address"
            placeholderTextColor={COLORS.black}
            keyboardType="email-address"
            style={{
              width: "100%",
            }}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
      </View>

      <Button
        title="Submit"
        filled
        style={{
          marginTop: 18,
          marginBottom: 4,
        }}
        onPress={handleResetPassword}
      />
    </View>
  );
};

export default ForgotPassword;
