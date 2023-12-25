import React, { useContext } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Button,
} from "react-native";
import FitnessCards from "../components/FitnessCards";
import fitnessData from "../data/Fitness";
import { AppContext } from "../Context";
import { useNavigation } from "@react-navigation/native";


const HomeScreen = () => {
  const navigation = useNavigation();
  const { calories, workout, minutes } = useContext(AppContext);

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ height: "100%" }}
      >
        <View
          style={{ backgroundColor: "white", padding: 30, width: "100%" }} //#ffe4c4
        >
          <Text style={{ fontSize: 18, color: "black", fontWeight: "bold" }}>
            HOME WORKOUT
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <View>
              <Text
                style={{
                  color: "black",
                  fontSize: 18,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {workout}
              </Text>
              <Text style={{ color: "grey", fontSize: 18, marginTop: 6 }}>
                WORKOUTS
              </Text>
            </View>

            <View>
              <Text
                style={{
                  color: "black",
                  fontSize: 18,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {calories}
              </Text>
              <Text style={{ color: "grey", fontSize: 18, marginTop: 6 }}>
                KCAL
              </Text>
            </View>

            <View>
              <Text
                style={{
                  color: "black",
                  fontSize: 18,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {minutes}
              </Text>
              <Text style={{ color: "grey", fontSize: 18, marginTop: 6 }}>
                MINS
              </Text>
            </View>
          </View>

          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Image
              style={{
                width: "90%",
                height: 150,
                marginTop: 20,
                borderRadius: 7,
              }}
              source={{
                uri: "https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg?cs=srgb&dl=pexels-li-sun-2294361.jpg&fm=jpg",
              }}
            />
          </View>

          <FitnessCards data={fitnessData} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
