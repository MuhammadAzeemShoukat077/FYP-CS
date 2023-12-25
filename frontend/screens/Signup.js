import { View, Text, Image, Pressable, TextInput, TouchableOpacity , Alert} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from "react-native";
import COLORS from '../components/colors';
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox"
import Button from '../components/Button';
import axios from 'axios';
import { useAuth } from '../AuthContext';


const Signup = ({ navigation }) => {
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
     const [email, setEmail] = useState("");
     const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    

   const { login } = useAuth();

    const handleSignup = async () => {
      try {
        const response = await axios.post(
          "http://192.168.1.21:3000/auth/signUp",
          {
            email,
            password,
            username,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const token = response.data.token;

        // Save token using the context
        login(token);

        // Redirect or navigate to another screen
        Alert.alert("Signup Successful!", "You can now log in.");
        navigation.navigate("Login");
      } catch (error) {
        console.error("Signup Error:", error);

        let errorMessage = "Signup failed. Please try again.";

        if (error.response) {
          errorMessage = error.response.data.message || errorMessage;
        }

        if (error.message === "Network Error") {
          errorMessage =
            "Network error. Please check your internet connection.";
        }

        Alert.alert("Signup Failed", errorMessage);
      }
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
              Create Account
            </Text>

            <Text
              style={{
                fontSize: 16,
                color: COLORS.black,
              }}
            >
              Let's transforms together and acheive your fitness goals!
            </Text>
          </View>

          <View style={{ marginBottom: 12 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '400',
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
                fontWeight: '400',
                marginVertical: 8,
              }}
            >
              Username
            </Text>

            <View
              style={{
                width: "100%",
                height: 48,
                borderColor: COLORS.black,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingLeft: 22,
              }}
            >
              <TextInput
                placeholder="Enter your username"
                placeholderTextColor={COLORS.black}
                keyboardType="default"
                style={{
                  width: "80%",
                }}
                value={username}
                onChangeText={(text) => setUsername(text)}
              />
            </View>
          </View>

          <View style={{ marginBottom: 12 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '400',
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

            <Text>I aggree to the terms and conditions</Text>
          </View>

          <Button
            title="Sign Up"
            filled
            style={{
              marginTop: 18,
              marginBottom: 4,
            }}
            onPress={handleSignup}
          />
          {/* 
                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
                    <View
                        style={{
                            flex: 1,
                            height: 1,
                            backgroundColor: COLORS.grey,
                            marginHorizontal: 10
                        }}
                    />
                    <Text style={{ fontSize: 14 }}>Or Sign up with</Text>
                    <View
                        style={{
                            flex: 1,
                            height: 1,
                            backgroundColor: COLORS.grey,
                            marginHorizontal: 10
                        }}
                    />
                </View>

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}>
                    <TouchableOpacity
                        onPress={() => console.log("Pressed")}
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            height: 52,
                            borderWidth: 1,
                            borderColor: COLORS.grey,
                            marginRight: 4,
                            borderRadius: 10
                        }}
                    >
                        <Image
                            source={require("../assets/facebook.png")}
                            style={{
                                height: 36,
                                width: 36,
                                marginRight: 8
                            }}
                            resizeMode='contain'
                        />

                        <Text>Facebook</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => console.log("Pressed")}
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            height: 52,
                            borderWidth: 1,
                            borderColor: COLORS.grey,
                            marginRight: 4,
                            borderRadius: 10
                        }}
                    >
                        <Image
                            source={require("../assets/google.png")}
                            style={{
                                height: 36,
                                width: 36,
                                marginRight: 8
                            }}
                            resizeMode='contain'
                        />

                        <Text>Google</Text>
                    </TouchableOpacity>
                </View>
 */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginVertical: 22,
            }}
          >
            <Text style={{ fontSize: 16, color: COLORS.black }}>
              Already have an account
            </Text>
            <Pressable onPress={() => navigation.navigate("Login")}>
              <Text
                style={{
                  fontSize: 16,
                  color: COLORS.primary,
                  fontWeight: 'bold',
                  marginLeft: 6,
                }}
              >
                Login
              </Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    );
}

export default Signup