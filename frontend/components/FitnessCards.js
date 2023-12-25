import { StyleSheet, Image, Text, View, Pressable } from "react-native";
import React from "react";
import Fitness from "../data/Fitness";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import GoalsScreen from "../screens/GoalsScreen";
import WorkoutScreen from "../screens/WorkoutScreen";


const FitnessCards = () => {
  // FitnessData = Fitness;
  const navigation = useNavigation();
  return (
    <View>
      {Fitness.map((item, key) => {
        console.log("==>",item["exercises"].length ? item["exercises"] : []);
        return (
          <Pressable
            onPress={() =>
              navigation.navigate("Workout", {
                image: item.image,
                exercises: item["exercises"].length ? item["exercises"] : [],
                id: item.id,
              })
            }
            style={{
              alignItems: "center",
              justifyContent: "center",
              margin: 12,
            }}
            key={key}
          >
            <Image
              style={{ width: "95%", height: 160, borderRadius: 10 }}
              source={{ uri: item.image }}
            />

            <Text
              style={{
                position: "absolute",
                color: "white",
                fontSize: 16,
                fontWeight: "bold",
                left: 20,
                top: 20,
              }}
            >
              {item.name}
            </Text>
            <MaterialCommunityIcons
              style={{
                position: "absolute",
                left: 20,
                bottom: 35,
                color: "white",
              }}
              name="lightning-bolt"
              size={24}
              color="black"
            />
          </Pressable>
        );
      })}
    </View>
  );
};

export default FitnessCards;

const styles = StyleSheet.create({});
