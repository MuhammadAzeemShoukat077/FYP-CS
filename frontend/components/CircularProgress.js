import { StyleSheet, View, Text } from "react-native";
import { Circle, Svg } from "react-native-svg";
// import { AntDesign } from "@expo/vector-icons";
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
  withSpring, 
} from "react-native-reanimated";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
import React, { useEffect } from "react"; // Import useEffect

const strokeWidth = 18;
const radius = 100;
const innerRadius = 100 - strokeWidth / 2;
const circumference = innerRadius * 2 * Math.PI;

const CircularProgress = ({ radius = 100, strokeWidth = 18, progress }) => {
  const gapLength = circumference;

  // Use useSharedValue to manage the progress value
  const progressValue = useSharedValue(0);

  // Define an animated props to control the progress circle
  const animatedProps = useAnimatedProps(() => {
    return {
      strokeDasharray: [progressValue.value, gapLength],
    };
  });

  // Use useEffect to update the progress value when progress prop changes
  useEffect(() => {
    // Use withTiming to animate to the new progress value
    progressValue.value = withTiming((progress / 100) * gapLength, {
      duration: 2000, // Specify the duration (adjust as needed)
    });
  }, [progress]);

  return (
    <View
      style={{
        width: radius * 2,
        height: radius * 2,
        borderRadius: radius,
        alignSelf: "center",
      }}
    >
      <Svg height={radius * 2} width={radius * 2}>
        {/* Background Circle */}
        <Circle
          cx={radius}
          cy={radius}
          r={innerRadius}
          fill="transparent"
          stroke="black" // Background color
          strokeWidth={strokeWidth} // Background circle thickness
          opacity={0.3}
        />
        {/* Progress Circle (Dashed Line) */}
        <AnimatedCircle
          animatedProps={animatedProps}
          cx={radius}
          cy={radius}
          r={innerRadius}
          fill="transparent"
          stroke="black" // Progress color
          strokeWidth={strokeWidth} // Progress circle thickness
          strokeLinecap="round" // Rounded line ends
          rotation={-90} // Rotate the circle to start from the top
          origin={`${radius}, ${radius}`} // Origin of rotation
        />
      </Svg>
      {/* <AntDesign
        name="arrowright"
        size={strokeWidth * 0.8}
        color="darkgrey"
        style={{
          position: "absolute",
          alignSelf: "center",
          top: strokeWidth * 0.1,
        }}
      /> */}
      {/* Progress Percentage Text */}
      <Text style={styles.progressText}>{progress}%</Text>
    </View>
  );
};

export default CircularProgress;

const styles = StyleSheet.create({
  progressText: {
    position: "absolute",
    alignSelf: "center",
    top: radius - 10, // Adjust the vertical position
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
});
