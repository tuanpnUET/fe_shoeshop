import React, { useState, useCallback} from "react"
import { View, FlatList, Text} from "react-native"
import axios from "axios"
import baseURL from "../../assets/common/baseUrl"
import { useFocusEffect } from "@react-navigation/native"
import AsyncStorage from "@react-native-community/async-storage"
import OrderCard from "../../Shared/OrderCard"

const Orders = (props) => {

    const [orderList, setOrderList] = useState();

    useFocusEffect(
        useCallback(
            () => {
                getOrders();
            return () => {
                setOrderList();
            }
            },
            [],
        )
    )


    const getOrders = () => {

        AsyncStorage.getItem("jwt")
                .then((res) => {
                    const AuthStr = 'Bearer '.concat(res); 
                    console.log(AuthStr)
                    axios
                    .get(`${baseURL}/order/`, { headers: { Authorization: AuthStr } })
                    .then(console.log(`${baseURL}/order/`))
                    .then((x) => {
                        console.log(x.data)
                        setOrderList(x.data);
                    })
                    .catch((error) => console.log(error))
                })
                .catch((error) => console.log(error))
    }

    return (
        <View>
            <FlatList 
                data={orderList}
                renderItem={({ item }) => (
                    <OrderCard navigation={props.navigation} {...item} editMode={true}/>
                )}
                keyExtractor={(item) => item._id}
            />
        </View>
    )
}

export default Orders;