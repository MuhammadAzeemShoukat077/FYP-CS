import { View, Text, Image , Pressable, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from "react-native";
import axios from "axios";
import { useAuth } from '../AuthContext';
import { Alert } from "react-native";
import COLORS from '../components/colors';
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox"
import Button from '../components/Button';
import HomeScreen from './HomeScreen';


const Login = ({ navigation }) => {
     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

     const { login } = useAuth();
     const handleLogin = async () => {
      try {
        const response = await axios.post(
          "http://192.168.1.21:3000/auth/login",
          {
            email,
            password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
    
        const token = response.data.token; // Move this line here
    
        // Save token using the context
        login(token);
    
        // Redirect or navigate to another screen
        navigation.navigate("Home");
        Alert.alert("Login Successful");
      } catch (error) {
        console.error(
          "Login Error:",
          error.response?.data?.message || error.message
        );
        Alert.alert("Login Failed", "Please check your credentials and try again.");
      }
    };
    
  const handleForgetPassword = () => {
     // Navigate to the ForgetPassword screen
     navigation.navigate("ForgotPassword");
   };

    
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
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
              Hi Welcome Back ! 👋
            </Text>

            <Text
              style={{
                fontSize: 16,
                color: COLORS.black,
              }}
            >
              Hello again you have been missed!
            </Text>
          </View>

          <View style={{ marginBottom: 12 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "400",
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

          <View style={{ marginBottom: 12 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "400",
                marginVertical: 8,
              }}
            >
              Password
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
                placeholder="Enter your password"
                placeholderTextColor={COLORS.black}
                secureTextEntry={isPasswordShown}
                style={{
                  width: "100%",
                }}
                value={password}
                onChangeText={(text) => setPassword(text)}
              />

              <TouchableOpacity
                onPress={() => setIsPasswordShown(!isPasswordShown)}
                style={{
                  position: "absolute",
                  right: 12,
                }}
              >
                {isPasswordShown == true ? (
                  <Ionicons name="eye-off" size={24} color={COLORS.black} />
                ) : (
                  <Ionicons name="eye" size={24} color={COLORS.black} />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              marginVertical: 6,
            }}
          >
            <Checkbox
              style={{ marginRight: 8 }}
              value={isChecked}
              onValueChange={setIsChecked}
              color={isChecked ? COLORS.primary : undefined}
            />

            <Text>Remenber Me</Text>
          </View>
          <TouchableOpacity onPress={handleForgetPassword}>
            <Text style={{ fontSize: 16, color: "blue", marginTop: 8, fontWeight:'normal' }}>
              Forget Password?
            </Text>
          </TouchableOpacity>

          <Button
            title="Login"
            filled
            style={{
              marginTop: 18,
              marginBottom: 4,
            }}
            onPress={handleLogin}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginVertical: 22,
            }}
          >
            <Text style={{ fontSize: 16, color: COLORS.black }}>
              Don't have an account ?{" "}
            </Text>
            <Pressable onPress={() => navigation.navigate("Signup")}>
              <Text
                style={{
                  fontSize: 16,
                  color: COLORS.primary,
                  fontWeight: "bold",
                  marginLeft: 6,
                }}
              >
                Register
              </Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    );
}

export default Login