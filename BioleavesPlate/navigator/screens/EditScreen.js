import * as React from "react";
import { useEffect } from "react";
import { View, Text, ScrollView, Image, Button } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NumericInput from "react-native-numeric-input";

export function EditScreen({ navigation, route }) {
  const [quantity, setQuantity] = React.useState(0);

  const changeQuantity = (quantity) => {
    setQuantity(quantity);
  };

  const getOrder = async () => {
    axios
      .get("http://10.0.2.2:8000/api/order/edit/" + route.params._id, {
        headers: {
          accept: "application/json",
          authorization: `Bearer ${JSON.parse(
            await AsyncStorage.getItem("token")
          )}`,
        },
      })
      .then((response) => {
        
      });
  };

  useEffect(() => {
    getOrder();
  }, []);

  const update = async () => {
    try {
      axios.put(
        "http://10.0.2.2:8000/api/order/" + route.params._id,
        { quantity: quantity },
        {
          headers: {
            accept: "application/json",
            authorization: `Bearer ${JSON.parse(
              await AsyncStorage.getItem("token")
            )}`
          },
        }
      ).then((response)=>{
          console.log(response.data)
          navigation.navigate("Home")
      })
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        marginTop: 30,
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}>
        Edit your quantity
      </Text>
      <NumericInput
        value={quantity}
        onChange={changeQuantity}
        style={{ marginTop: 20 }}
      ></NumericInput>
      <TouchableHighlight style={{ marginTop: 20, width: 150 }}>
        <Button title="Update" onPress={update}></Button>
      </TouchableHighlight>
    </View>
  );
}
