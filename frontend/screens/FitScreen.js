import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Pressable,
} from "react-native";
import { React, useState, useContext } from "react";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { AppContext } from "../Context";
//import { useState } from 'react'

const FitScreen = () => {
  const route = useRoute();
  //console.log(route.params);
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);
  const exercises = route.params.exercises;
  const currentExercise = exercises[index];
  // console.log(currentExercise, "First Exercise");
 // console.log("index", index);
console.log("exercis----es", exercises);
console.log("exercises====", currentExercise.name);
  //console.log("==========", route.params.exercises.length);
  const {
    exercisesCompleted,
    setExercisesCompleted,
    calories,
    setCalories,
    workout,
    setWorkout,
    minutes,
    setMinutes,
    } = useContext(AppContext);
    console.log(exercisesCompleted, "exercisesCompleted");

  return (
    <SafeAreaView>
      <Image
        style={{ width: "100%", height: 300 }}
        source={{ uri: currentExercise.image }}
      />
      <Text
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 50,
          fontSize: 25,
          fontWeight: "bold",
        }}
      >
        {currentExercise.name}
      </Text>

      <Text
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 30,
          fontSize: 40,
          fontWeight: "bold",
        }}
      >
        x{currentExercise.sets}
      </Text>
      <Pressable
        onPress={() => {
          if (index + 1 === exercises.length) {
            navigation.navigate("Home"); // Navigate to home
          } else {
            navigation.navigate("Rest"); // Navigate to rest onto next exercise
              setExercisesCompleted((prev) => [...prev, currentExercise.name]);
            setWorkout(workout + 1);
            setMinutes(minutes + 2.5);
            setCalories(calories + 6.3);

            setTimeout(() => {
              setIndex(index + 1);
            }, 3000);
          }
        }}
        style={{
          backgroundColor: "black",
          padding: 10,
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 30,
          borderRadius: 15,
          width: 250,
        }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          DONE
        </Text>
      </Pressable>

      <Pressable
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 33,
        }}
      >
        <Pressable
          onPress={() => {
            if (index - 1 === -1) {
              navigation.navigate("Home"); // Navigate to home
            } else {
              navigation.navigate("Rest"); // Navigate to rest onto next exercise
              setTimeout(() => {
                setIndex(index - 1);
              }, 3000);
            }
          }}
          style={{
            backgroundColor: "black",
            padding: 10,
            borderRadius: 20,
            width: 100,
            marginHorizontal: 25,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 18,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            PREV
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            if (index + 1 === exercises.length) {
              navigation.navigate("Home"); // Navigate to home
            } else {
              navigation.navigate("Rest"); // Navigate to rest onto next exercise
              setTimeout(() => {
                setIndex(index + 1);
              }, 3000);
            }
          }}
          style={{
            backgroundColor: "black",
            padding: 10,
            borderRadius: 20,
            width: 100,
            marginHorizontal: 25,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 18,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            SKIP
          </Text>
        </Pressable>
      </Pressable>
    </SafeAreaView>
  );
};

export default FitScreen;

const styles = StyleSheet.create({});
