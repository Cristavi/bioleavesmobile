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

export default function SettingScreen({ navigation }) {
  const [state, setState] = React.useState({
    deliveredProducts: [],
  });

  const getDeliveredProducts = async () => {
    try {
      await axios
        .get("http://10.0.2.2:8000/api/deliveredProduct", {
          headers: {
            accept: "application/json",
            authorization: `Bearer ${JSON.parse(
              await AsyncStorage.getItem("token")
            )}`,
          },
        })
        .then((response) => {
          setState({
            deliveredProducts: response.data,
          });
        });
    } catch (err) {
      console.log(err.response);
    }
  };

  React.useEffect(() => {
    getDeliveredProducts();
  }, []);

  const deleteList = async (_id) => {
    try {
      await axios
        .delete("http://10.0.2.2:8000/api/deliveredProduct/" + _id, {
          headers: {
            accept: "application/json",
            authorization: `Bearer ${JSON.parse(
              await AsyncStorage.getItem("token")
            )}`,
          },
        })
        .then((response) => {
            console.log(response.data)
          getDeliveredProducts();
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ScrollView>
      {state.deliveredProducts.map((d) => {
        return (
          <View
            key={d._id}
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
                uri: "http://10.0.2.2:8000/images/" + d.product.product_picture,
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
              <Text style={{ fontSize: 17 }}>{d.product.product_name}</Text>
              <Text style={{ fontSize: 17 }}>
                Price: {d.product.product_price}
              </Text>
              <Text style={{ fontSize: 17 }}>Quantity: {d.quantity}</Text>

              <Text style={{ fontSize: 15 }}>
                Date delivered: {d.created_at.split("T")[0]}
              </Text>
              <View style={{ marginTop: 10, flexDirection: "row" }}>
                <TouchableHighlight style={{ marginLeft: 20 }}>
                  <Button
                    title="Clear"
                    onPress={deleteList.bind(this, d._id)}
                    color="#BF2310"
                  ></Button>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}
