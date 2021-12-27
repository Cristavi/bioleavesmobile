import axios from "axios";
import * as React from "react";
import { View, Text, ScrollView, Image, Button } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import logo from "../../assets/logo.png";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DetailScreen({ navigation }) {
  const [state, setState] = React.useState({
    orders: [],
  });

  const getOrders = async () => {
    try {
      await axios
        .get("http://10.0.2.2:8000/api/order", {
          headers: {
            accept: "application/json",
            authorization: `Bearer ${JSON.parse(
              await AsyncStorage.getItem("token")
            )}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          setState({
            orders: response.data,
          });
        })
        .catch((err) => {
          console.log(err.response);
        });
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    getOrders();
  }, []);

  const deleteOrder = async (_id) => {
    try {
      axios.delete("http://10.0.2.2:8000/api/order/" + _id, {
        headers: {
          accept: "application/json",
          authorization: `Bearer ${JSON.parse(
            await AsyncStorage.getItem("token")
          )}`,
        },
      }).then((response)=>{
          console.log(response.data)
          getOrders();
      })
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <ScrollView>
      {state.orders.map((o) => {
        return (
          <View
            key={o._id}
            style={{
              flex: 1,
              alignItems: "flex-start",
              marginLeft: 20,
              marginRight: 20,
              flexDirection: "row",
              justifyContent: "flex-start",
              borderWidth: 2,
              borderRadius: 5,
              borderColor: "#000",
              marginTop: 10,
              marginBottom: 10,
              paddingBottom: 10,
            }}
          >
            <Image
              source={{
                uri: "http://10.0.2.2:8000/images/" + o.product.product_picture,
              }}
              style={{
                width: 100,
                height: 100,
                marginTop: 20,
                borderRadius: 50,
                marginLeft: 20,
              }}
            ></Image>

           

            <View style={{ marginLeft: 30, flexDirection: "column" }}>
              <Text style={{ fontSize: 17 }}>{o.product.product_name}</Text>
              <Text style={{ fontSize: 17 }}>
                Price: {o.product.product_price}
              </Text>
              <Text style={{ fontSize: 17 }}>
                Quantity ordered: {o.quantity}
              </Text>

              <Text style={{ fontSize: 17 }}>
                Date ordered: {o.created_at.split("T")[0]}
              </Text>
              <View style={{ marginTop: 10, flexDirection: "row" }}>
                <TouchableHighlight>
                  <Button
                    title="Edit order"
                    onPress={() => navigation.navigate("Edit", { _id: o._id })}
                    color="#2C79C8"
                  ></Button>
                </TouchableHighlight>
                <TouchableHighlight style={{ marginLeft: 20 }}>
                  <Button title="Delete" onPress={deleteOrder.bind(this,o._id)} color="#BF2310"></Button>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}
