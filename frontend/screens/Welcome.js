import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import { LinearGradient } from "expo-linear-gradient";
import COLORS from '../components/colors';
import Button from '../components/Button';
//import { useAuth } from '../AuthContext';

const Welcome = ({ navigation }) => {

    return (
      <LinearGradient
        style={{
          flex: 1,
        }}
        colors={[COLORS.secondary, COLORS.primary]}
      >
        <View style={{ flex: 1 }}>
          <View>
            <Image
              source={require("../assets/gym1.jpg")}
              style={{
                height: 100,
                width: 100,
                borderRadius: 20,
                position: "absolute",
                top: 10,
                transform: [
                  { translateX: 20 },
                  { translateY: 50 },
                  { rotate: "-15deg" },
                ],
              }}
            />

            <Image
              source={require("../assets/track.jpg")}
              style={{
                height: 100,
                width: 100,
                borderRadius: 20,
                position: "absolute",
                top: -8,
                left: 100,
                transform: [
                  { translateX: 50 },
                  { translateY: 50 },
                  { rotate: "-5deg" },
                ],
              }}
            />

            <Image
              source={require("../assets/exe.jpg")}
              style={{
                width: 100,
                height: 120,
                borderRadius: 20,
                position: "absolute",
                top: 135,
                left: -35,
                transform: [
                  { translateX: 50 },
                  { translateY: 50 },
                  { rotate: "15deg" },
                ],
              }}
            />

            <Image
              source={require("../assets/joint.jpg")}
              style={{
                height: 200,
                width: 200,
                borderRadius: 50,
                position: "absolute",
                top: 110,
                left: 110,
                transform: [
                  { translateX: 50 },
                  { translateY: 50 },
                  { rotate: "-15deg" },
                ],
              }}
            />
          </View>

          {/* content  */}

          <View
            style={{
              paddingHorizontal: 22,
              position: "absolute",
              top: 400,
              width: "100%",
            }}
          >
            <Text
              style={{
                fontSize: 30,
                fontWeight: '800',
                color: COLORS.white,
              }}
            >
              Let's Get
            </Text>
            <Text
              style={{
                fontSize: 46,
                fontWeight: '800',
                color: COLORS.white,
              }}
            >
              Started with FitTrack!
            </Text>

            <View style={{ marginVertical: 22 }}>
              <Text
                style={{
                  fontSize: 16,
                  color: COLORS.white,
                  marginVertical: 4,
                }}
              >
                Elevate your fitness journey with FitTrack See your movements
                and get instant feedback for a more effective and engaging
                workout session.
              </Text>
             
            </View>

            <Button
              title="Join Now"
              onPress={() => navigation.navigate("Signup")}
              style={{
                marginTop: 22,
                width: "100%",
              }}
            />

            <View
              style={{
                flexDirection: "row",
                marginTop: 12,
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: COLORS.white,
                }}
              >
                Already have an account ?
              </Text>
              <Pressable onPress={() => navigation.navigate("Login")}>
                <Text
                  style={{
                    fontSize: 16,
                    color: COLORS.white,
                    fontWeight: "bold",
                    marginLeft: 4,
                  }}
                >
                  Login
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </LinearGradient>
    );
}

export default Welcome