import {
  Image,
  Pressable,  
  StyleSheet,
  Text,
  View,
  ScrollView,
  
} from "react-native";
import { React, useContext,useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { AppContext } from "../Context";
import { AntDesign } from "@expo/vector-icons";

const WorkoutScreen = () => {
  const route = useRoute();
  // console.log(route.params);
    const navigation = useNavigation();
    const {
      exercisesCompleted,
      setExercisesCompleted,
      } = useContext(AppContext);
  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: "white" }}
      >
        <Image
          style={{ width: "100%", height: 180 }}
          source={{ uri: route.params.image }}
        />
        <Ionicons
          onPress={() => navigation.goBack()}
          style={{ position: "absolute", color: "white", top: 10, left: 20 }}
          name="arrow-back-outline"
          size={29}
          color="black"
        />

        {route.params.exercises.map((item, id) => (
          <Pressable
            style={{ margin: 10, flexDirection: "row", alignItems: "center" }}
            key={id}
          >
            <Image
              style={{ width: 90, height: 90 }}
              source={{ uri: item.image }}
            />
            <View style={{ marginLeft: 9 }}>
              <Text style={{ fontSize: 17, fontWeight: "bold" , width:170}}>
                {item.name}
              </Text>
              <Text style={{ marginTop: 4, fontSize: 18, color: "gray" }}>
                x{item.sets}
              </Text>
            </View>
            {exercisesCompleted.includes(item.name) ? (
              <AntDesign style={{marginLeft:30}} name="checkcircle" size={24} color="black" />
            ) : null}
          </Pressable>
        ))}
      </ScrollView>
      <Pressable
        onPress={() => {
                  navigation.navigate("Fit", {
                      exercises: route.params.exercises
                  })
        
              setExercisesCompleted([]); // reset the exercisesCompleted array
        }}
        style={{
          backgroundColor: "black",
          padding: 10,
          marginLeft: "auto",
          marginRight: "auto",
          marginVertical: 20,
          borderRadius: 7,
          width: 130,
        }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontSize: 15,
            fontWeight: "bold",
          }}
        >
          START
        </Text>
      </Pressable>
    </>
  );
};

export default WorkoutScreen;

const styles = StyleSheet.create({});
