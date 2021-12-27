import * as React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen";
import SettingScreen from "./screens/SettingScreen";
import DetailScreen from "./screens/DetailScreen";
import LogoutScreen from "./screens/LogoutScreen";

const homeName = "Home";
const detailName = "Cart";
const settingName = "Delivered Products";
const logoutName = "Logout";
const registerName = "Register";
const loginName = "Login";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default class MainContainer extends React.Component {
  get = async () => {
    try {
      this.token = await AsyncStorage.getItem("token");
    } catch (err) {
      console.log(err);
    }
  };

  token = "";

  async componentDidMount() {
    await this.get();

    console.log(this.token);
  }

   renderBar() {
      return (
        <>
          <Tab.Screen name={homeName} component={HomeScreen}></Tab.Screen>
          <Tab.Screen name={settingName} component={SettingScreen}></Tab.Screen>
          <Tab.Screen name={detailName} component={DetailScreen}></Tab.Screen>
          <Tab.Screen name={logoutName} component={LogoutScreen}></Tab.Screen>
        </>
      );
  }

  render() {
    return (
      
        <Tab.Navigator
          initialRouteName={homeName}
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              let rn = route.name;

              if (rn === homeName) {
                iconName = focused ? "home" : "home-outline";
              } else if (rn === detailName) {
                iconName = focused ? "cart" : "cart-outline";
              } else if (rn === settingName) {
                iconName = focused ? "cube" : "cube-outline";
              } else if (rn === logoutName) {
                iconName = focused ? "exit" : "exit-outline";
              } else if (rn === registerName) {
                iconName = focused ? "mail" : "mail-outline";
              } else if (rn === loginName) {
                iconName = focused ? "log-in" : "log-in-outline";
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            showLabe: false,
            activeTintColor: "tomato",
            inactiveTintColor: "grey",
            labelStyle: { paddingBottom: 10, fontSize: 10 },
            style: { padding: 10, height: 70 },
          }}
        >
          {this.renderBar()}
        </Tab.Navigator>
     
    );
  }
}
