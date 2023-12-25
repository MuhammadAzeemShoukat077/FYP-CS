import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Button } from "react-native";
import axios from "axios";
import COLORS from "../constants/colors"; // Import your color constants

const ResetPassword = ({ route, navigation }) => {
  const [newPassword, setNewPassword] = useState("");
  const [resetToken, setResetToken] = useState("");

  useEffect(() => {
    // Extract reset token from the route params when the component mounts
    if (route.params?.resetToken) {
      setResetToken(route.params.resetToken);
    }
  }, [route.params]);

  const handleResetPassword = async (resetToken, newPassword) => {
    try {
      //await axios.get(`http://192.168.1.18:3000/auth/resetPassword?token=${resetToken}`);
      // Send a request to your backend to update the password
      await axios.get(
        `http://192.168.1.21:3000/auth/resetPassword?token=${resetToken}`,
        {
          resetToken,
          newPassword,
        }
      );

      // Navigate to the Login screen or show a success message
      // navigation.navigate("ResetPassword", { resetToken });
      navigation.navigate("Login");
    } catch (error) {
      console.error("Reset Password Error:", error.message);
      // Handle the error (e.g., show an error message)
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
          Reset Password 🔒
        </Text>

        <Text
          style={{
            fontSize: 16,
            color: COLORS.black,
          }}
        >
          Enter your new password to reset your account.
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
          Reset Token: {resetToken}
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
          New Password
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
            placeholder="Enter your new password"
            placeholderTextColor={COLORS.black}
            secureTextEntry
            style={{
              width: "100%",
            }}
            value={newPassword}
            onChangeText={(text) => setNewPassword(text)}
          />
        </View>
      </View>

      <Button title="Reset Password" onPress={handleResetPassword} />
    </View>
  );
};

export default ResetPassword;
