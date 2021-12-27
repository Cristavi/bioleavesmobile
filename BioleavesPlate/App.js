import * as React from "react";
import MainContainer from "./navigator/MainContainer";
import {
  View,
  Text,
  TextInput,
  Image,
  Button,
  ScrollView,
  ToastAndroid,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegisterScreen from "./navigator/screens/RegisterScreen";
import LoginScreen from "./navigator/screens/LoginScreen";
import { ProductScreen } from "./navigator/screens/ProductScreen";
import DetailScreen from "./navigator/screens/DetailScreen";
import { EditScreen } from "./navigator/screens/EditScreen";
import LogoutScreen from "./navigator/screens/LogoutScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Register" component={RegisterScreen}></Stack.Screen>
        <Stack.Screen
          name="Main"
          component={MainContainer}
          options={{ headerShown: false }}
        />

        <Stack.Screen name="Login" component={LoginScreen}></Stack.Screen>
        <Stack.Screen name="Product" component={ProductScreen}></Stack.Screen>
        <Stack.Screen name="Edit" component={EditScreen}></Stack.Screen>
        <Stack.Screen name="Logout" component={LogoutScreen}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
