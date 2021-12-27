import * as React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableHighlight,
  Button,
} from "react-native";
import logo from "../../assets/logo.png";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LogoutScreen({ navigation }) {
  const logout = async () => {
    try {
      await axios
        .post("http://10.0.2.2:8000/api/logout", {}, {headers: {
            authorization: `Bearer ${JSON.parse(
                await AsyncStorage.getItem("token")
              )}`
        }})
        .then((response) => {
          console.log(response);
          AsyncStorage.removeItem("token");
          navigation.navigate("Login");
        })
        .catch((err) => {
          console.log(err.response);
        });
    } catch (err) {
      err.response;
    }
  };

  React.useEffect(() => {
    logout();
  });

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Logging out</Text>
    </View>
  );
}
