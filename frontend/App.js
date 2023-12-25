import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

import HomeScreen from './screens/HomeScreen';
import WorkoutScreen from "./screens/WorkoutScreen"
import FitScreen from "./screens/FitScreen";
import RestScreen from "./screens/RestScreen";
import TabsView from './TabsView';
import Posetrack from './components/posture/posturetrack';
import StepCounter from './screens/Stepcounter';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Welcome from './screens/Welcome';
import ForgotPassword from './screens/ForgotPassword';
import ResetPassword from './screens/ResetPassword';
import OTPConfirmation from './screens/OTPConfirmation';



import { AppProvider } from './Context';
import { AuthProvider } from './AuthContext';

// Initialized all Navigator
const Tab = createBottomTabNavigator();

export function AppTabsNavigation(){
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarInactiveBackgroundColor: "#011f3b",
                tabBarActiveBackgroundColor: "#032845",
                tabBarInactiveTintColor: "#f8ca12",
                tabBarActiveTintColor: "#ffffff",
                tabBarIconStyle: { marginTop: 4},
                tabBarLabelStyle: { fontSize: 13, color: '#f8ca12', paddingBottom: 3},
                tabBarStyle: {height: 55, bottom: 0, left: 0, right: 0, zIndex: 4, borderTopWidth: 0},
                style: { borderColor: '#011f3b' },
                headerShown: false,
                unmountOnBlur: true,
            }}
        >
            <Tab.Screen name="Home" component={HomeScreen}
                 options={{
                   tabBarLabel: 'Home',
                   tabBarIcon: ({ color, size }) => (
                     <MaterialIcons name="home" color={color} size={29} style={{ marginTop: 1}} />
                   ),
                 }}
            />

            <Tab.Screen name="PoseTrack" component={Posetrack}
            options={{
              tabBarLabel: 'PoseTrack',
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="camera" color={color} size={29} style={{ marginTop: 1}} />
              ),
            }}
       />

            <Tab.Screen name="Steps" component={StepCounter}
            options={{
              tabBarLabel: 'Steps',
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="directions-walk" color={color} size={29} style={{ marginTop: 1}} />
              ),
            }}
            />


       
       <Tab.Screen name="Workouts" component={TabsView}
            options={{
              tabBarLabel: 'Workouts',
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="list" color={color} size={29} style={{ marginTop: 1}} />
              ),
            }}
       />



        </Tab.Navigator>
    );
}

const App = () => {
  return (
    <AuthProvider>
      <AppProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Welcome">
            <Stack.Screen
              name="Bottom"
              component={AppTabsNavigation}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Workout"
              component={WorkoutScreen}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Fit"
              component={FitScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Rest"
              component={RestScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPassword}
              options={{ headerShown: true }}
            />

            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Signup"
              component={Signup}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Welcome"
              component={Welcome}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="OTPConfirmation"
              component={OTPConfirmation}
              options={{ headerShown: true }}
            />
            <Stack.Screen
              name="ResetPassword"
              component={ResetPassword}
              options={{ headerShown: true }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;