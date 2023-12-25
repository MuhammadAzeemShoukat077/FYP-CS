import { React,useState, useEffect } from "react";
import { StatusBar, StyleSheet } from "react-native";
import { Tab, TabView, Text } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";


import ExerciseList from "./components/exercises/ExerciseList";
import WorkoutList from "./components/workout/WorkoutList";
import Settings from "./components/settings/Settings";

import { GLOBAL_STYLES } from "./styles/Style";





export default function TabsView({navigation}) {


  const [tabIndex, setIndex] = useState(1);

  useEffect(() => {

    loadExerciseList();
    loadWorkoutList(); 
  }, [tabIndex]);

  async function loadExerciseList() {
    try {
      const data = await AsyncStorage.getItem("exerciseList");
      console.log("Loaded exerciseList", data);
      if (data === null) {
        return false;
      } else {
        setExerciseList(JSON.parse(data));
      }
    } catch (error) {
      console.log(
        "Error while loading exerciselits from AsyncStorage! ERROR: ",
        error
      );
    }
  }
  async function loadWorkoutList() {
    try {
      const data = await AsyncStorage.getItem("workoutList");
      console.log("Loaded workoutList", data);
      if (data === null) {
        return false;
      } else {
        setWorkoutList(JSON.parse(data));
      }
    } catch (error) {
      console.log("Error while loading data from AsyncStorage! ERROR: ", error);
    }
  }

  const [workoutList, setWorkoutList] = useState(null);

  const [exerciseList, setExerciseList] = useState(null);

  return (
    
    <>

      <StatusBar backgroundColor="#000" barStyle="light-content" />

      <TabView
        value={tabIndex}
        onChange={setIndex}>
        <TabView.Item
          style={{
            backgroundColor: GLOBAL_STYLES.COLORS.background,
            width: "100%",
          }}>
          <ExerciseList
            exerciseList={exerciseList}
            setExerciseList={setExerciseList}
          />
        </TabView.Item>
        <TabView.Item
          style={{
            backgroundColor: GLOBAL_STYLES.COLORS.background,
            width: "100%",
          }}>
          <WorkoutList
            workoutList={workoutList}
            setWorkoutList={setWorkoutList}
            exerciseList={exerciseList}
            setExerciseList={setExerciseList}
          />
        </TabView.Item>
        <TabView.Item
          style={{
            backgroundColor: GLOBAL_STYLES.COLORS.background,
            width: "100%",
          }}>
          <Settings />
        </TabView.Item>




      </TabView>


      <Tab
        value={tabIndex}
        onChange={(e) => setIndex(e)}
        containerStyle={{
          backgroundColor: GLOBAL_STYLES.COLORS.foreground,
        }}
        indicatorStyle={{
          backgroundColor: GLOBAL_STYLES.COLORS.accent,
          height: 0,
        }}
        variant="default">
        <Tab.Item
          title="Exercises"
          titleStyle={styles.TabItemTitle}
          containerStyle={styles.TabItemContainer}
          icon={{
            name: "list-outline",
            type: "ionicon",
            color: GLOBAL_STYLES.COLORS.text,
          }}
        />
        <Tab.Item
          title="Workouts"
          titleStyle={styles.TabItemTitle}
          containerStyle={styles.TabItemContainer}
          icon={{
            name: "barbell-outline",
            type: "ionicon",
            color: GLOBAL_STYLES.COLORS.text,
          }}
        />
        <Tab.Item
          title="Settings"
          titleStyle={styles.TabItemTitle}
          containerStyle={styles.TabItemContainer}
          icon={{
            name: "options-outline",
            type: "ionicon",
            color: GLOBAL_STYLES.COLORS.text,
          }}
        />

  


      </Tab>

    </>
  );
}

const styles = StyleSheet.create({
  TabItemTitle: {
    fontSize: 10,
    color: "black",
  },

  TabItemContainer:{
    justifyContent:"center",
    //alignContent:"center",
    alignItems:"center",
    height:55
    
  }

});
