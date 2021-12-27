import * as React from "react";
import { useEffect } from "react";
import { View, Text, ScrollView, Image, Button } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import logo from "../../assets/logo.png";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NumericInput from "react-native-numeric-input";

export function ProductScreen({ navigation, route }) {
  const [state, setState] = React.useState({
    _id: "",
    product_name: "",
    product_description: "",
    product_price: 0,
    product_picture: "",
    token: "",
  });

  const [quantity, setQuantity] = React.useState(0);

  const changeQuantity = (quantity) => {
    setQuantity(quantity);
  };

  const get = async () => {
    await AsyncStorage.getItem("token").then((value) => {
      console.log(value);

      setState({
        token: JSON.parse(value),
      });
    });
  };

  const show = async () => {
    await axios
      .get("http://10.0.2.2:8000/api/product/" + route.params._id)
      .then((response) => {
        setState({
          _id: response.data._id,
          product_name: response.data.product_name,
          product_description: response.data.product_description,
          product_price: response.data.product_price,
          product_picture: response.data.product_picture,
        });
      });
  };

  const addToCart = async (_id) => {
   
    console.log(state.product_name);
    console.log(state._id);

    await axios
      .post(
        "http://10.0.2.2:8000/api/product/order/" + route.params._id,
        { quantity: quantity },
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${JSON.parse((await AsyncStorage.getItem('token')))}`,
          },
        }
      )
      .then((response) => {
        navigation.navigate("Main")
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  useEffect(() => {
    show();
    
  });

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        marginTop: 10,
        
      }}
    >
      <Image
        source={{ uri: "http://10.0.2.2:8000/images/" + state.product_picture }}
        style={{ width: 250, height: 300 }}
      ></Image>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 20 }}>
        {state.product_name}
      </Text>
      <Text style={{ fontSize: 15, marginTop: 15 }}>
        {state.product_description}
      </Text>
      <View style={{ marginTop: 20 }}>
        <NumericInput
          style={{}}
          minValue={0}
          maxValue={50}
          value={quantity}
          onChange={changeQuantity}
        ></NumericInput>
      </View>
      <TouchableHighlight style={{ marginTop: 20 }}>
        <Button
          title="Add to cart"
          onPress={addToCart.bind(state._id)}
        ></Button>
      </TouchableHighlight>
    </View>
  );
}
