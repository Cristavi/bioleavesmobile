import * as React from "react";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  Button,
  ScrollView,
  ToastAndroid,
} from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import logo from "../../assets/logo.png";
import axios from "axios";

export default function RegisterScreen({ navigation }) {


  const [f_name, setF_name] = useState("");
  const [l_name, setL_name] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");

  const onFnameChangeHandler = (f_name) => {
    setF_name(f_name);
  };

  const onLnameChangeHandler = (l_name) => {
    setL_name(l_name);
  };

  const onEmailChangeHandler = (email) => {
    setEmail(email);
  };

  const onUsernameChangeHandler = (username) => {
    setUsername(username);
  };

  const onPasswordChangeHandler = (password) => {
    setPassword(password);
  };

  const onPasswordConfirmationChangeHandler = (password_confirmation) => {
    setPasswordConfirmation(password_confirmation);
  };

  const headers = {
    Accept: "application/json",
  };

  const store = (e) => {
    if (
      (f_name === "" || l_name === "" || email === "",
      username === "",
      password === "",
      password_confirmation === "")
    ) {
      alert("Please fill all the forms");
      return;
    }

    axios
      .post(
        "http://10.0.2.2:8000/api/user/register",
        {
          f_name: f_name,
          l_name: l_name,
          email: email,
          username: username,
          password: password,
          password_confirmation: password_confirmation,
        },
        { headers: headers }
      )
      .then((response) => {
        console.log(response);
        alert("Your account has been created");
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
            alignItems: "center",
            borderRadius: 10,
            textAlign: "center",
          }}
          placeholder="Enter your first name"
          value={f_name}
          onChangeText={onFnameChangeHandler}
        ></TextInput>

        <TextInput
          style={{
            fontSize: 15,
            marginTop: 25,
            borderWidth: 1,
            width: "60%",
            borderRadius: 10,
            textAlign: "center",
          }}
          placeholder="Enter your last name"
          value={l_name}
          onChangeText={onLnameChangeHandler}
        ></TextInput>
        <TextInput
          style={{
            fontSize: 15,
            marginTop: 25,
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
          style={{
            fontSize: 15,
            marginTop: 25,
            borderWidth: 1,
            width: "60%",
            borderRadius: 10,
            textAlign: "center",
          }}
          placeholder="Enter your username"
          value={username}
          onChangeText={onUsernameChangeHandler}
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
          placeholder="Confirm password"
          value={password_confirmation}
          onChangeText={onPasswordConfirmationChangeHandler}
        ></TextInput>
        <TouchableHighlight
          style={{ marginTop: 40, backgroundColor: '#fff', marginBottom: 5, width: 150 }}
        >
          <Button
            title="Register"
            onPress={store}
            style={{ width: 200, }}
          ></Button>
        </TouchableHighlight>

        <TouchableHighlight
          style={{ marginTop: 10, backgroundColor: '#fff', marginBottom: 40, width: 150 }}
        >
          <Button
            title="Log in"
            onPress={() => navigation.navigate("Login")}
            style={{ width: 200, }}
          ></Button>
        </TouchableHighlight>
      </View>
    </ScrollView>
  );
}
