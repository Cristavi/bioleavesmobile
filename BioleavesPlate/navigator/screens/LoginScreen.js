import * as React from "react";
import { View, Text, TextInput, Image, Button, ScrollView } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import logo from "../../assets/logo.png";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onEmailChangeHandler = (email) => {
    setEmail(email);
  };

  const onPasswordChangeHandler = (password) => {
    setPassword(password);
  };

  const headers = {
    Accept: "application/json",
  };

  const set = async (token) => {
    try {
      await AsyncStorage.setItem("token", JSON.stringify(token));
    } catch (err) {
      console.log(err);
      alert("Invalid credentials")
    }
  };

  const login = async (e) => {
    axios
      .post(
        "http://10.0.2.2:8000/api/user/login",
        {
          email: email,
          password: password,
        },
        { headers: headers }
      )
      .then((response) => {
        AsyncStorage.setItem("token", JSON.stringify(response.data.token));
        navigation.navigate("Main")
      })
      .catch((err) => {
        console.log(err);
      });

    
  };

  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "flex-start",
          paddingTop: 15,
        }}
      >
        <Image source={logo} style={{ width: 200, height: 120 }}></Image>


        <TextInput
          style={{
            fontSize: 15,
            marginTop: 40,
            borderWidth: 1,
            width: "60%",
            borderRadius: 10,
            textAlign: "center",
          }}
          placeholder="Enter your email"
          value={email}
          onChangeText={onEmailChangeHandler}
        ></TextInput>

        <TextInput
          secureTextEntry={true}
          style={{
            fontSize: 15,
            marginTop: 25,
            borderWidth: 1,
            width: "60%",
            borderRadius: 10,
            textAlign: "center",
          }}
          placeholder="Enter your password"
          value={password}
          onChangeText={onPasswordChangeHandler}
        ></TextInput>

        <TouchableHighlight
          style={{ marginTop: 25, marginBottom: 5, width: 150 }}
        >
          <Button
            title="Login"
            style={{ width: "100%" }}
            onPress={login}
          ></Button>
        </TouchableHighlight>
        <TouchableHighlight
          style={{ marginTop: 25, marginBottom: 40, width: 150 }}
        >
          <Button
            title="Register"
            style={{ width: "100%" }}
            onPress={()=>navigation.navigate("Register")}
          ></Button>
        </TouchableHighlight>
      </View>
    </ScrollView>
  );
}
