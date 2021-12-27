import * as React from "react";
import { View, Text, ScrollView, Image, Button } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import logo from "../../assets/logo.png";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen({ navigation }) {
  const headers = {
    Accept: "application/json",
    Authorization: `Bearer ${AsyncStorage.getItem("token")}`,
  };

  const [state, setState] = React.useState({
    product: [],
  });

  const getProduct = async () => {
    try{
      await axios
      .get("http://10.0.2.2:8000/api/product", { headers: headers })
      .then((response) => {
         setState({
          product: response.data,
        });
      });
    }
    catch(err){
      console.log(err)
    }

  }

  React.useEffect(()=>{
    getProduct()
  }, [])



  return (
    <ScrollView>
      {state.product.map((p) => {
        return (
          <View
            key={p._id}
            style={{
              flex: 1,
              alignItems: "flex-start",
              justifyContent: "flex-start",
              paddingTop: 10,
              marginLeft: 50,
              marginRight: 30,
              flexDirection: "row",
              borderWidth: 2,
              borderRadius: 2,
              marginTop: 5,
              marginBottom: 10,
              borderColor: "#000",
            }}
          >
            <Image
              source={{
                uri: "http://10.0.2.2:8000/images/" + p.product_picture,
              }}
              style={{ width: 100, height: 80, marginLeft: 20, borderRadius: 50 }}
            ></Image>
            <View style={{ marginLeft: 30, paddingTop: 10 }}>
              <Text style={{ fontSize: 15 }}>{p.product_name}</Text>
              <Text style={{ fontSize: 15, marginTop: 5 }}>
                Price: {p.product_price}
              </Text>
              <TouchableHighlight style={{ marginTop: 5, marginBottom: 5 }}>
                <Button title="View more" onPress={()=>navigation.navigate("Product", {_id:p._id})}></Button>
              </TouchableHighlight>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}
