import React, { useEffect, useState, useContext} from 'react'
import { View, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements';
import FormContainer from '../../Form/FormContainer'
import { Input } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { connect } from 'react-redux'
import AsyncStorage from "@react-native-community/async-storage"
import AuthGlobal from "../../../Context/store/AuthGlobal"
import Error from "../../../Shared/Error";
import axios from "axios";
import baseURL from "../../../assets/common/baseUrl";

const Checkout = (props) => {
    const context = useContext(AuthGlobal)
    // const [ userProfile, setUserProfile ] = useState()
    const [ orderItems, setOrderItems ] = useState();
    const [ address, setAddress ] = useState();
    const [ address2, setAddress2 ] = useState();
    const [ city, setCity ] = useState();
    const [ phone, setPhone ] = useState();
    const [ status, setStatus ] = useState();
    const [error, setError] = useState("");
  
    useEffect(() => {

        if (
            context.stateUser.isAuthenticated === false || 
            context.stateUser.isAuthenticated === null
        ) {
            props.navigation.navigate("Login")
        }

        AsyncStorage.getItem("jwt")
            .then((res) => {
                const AuthStr = 'Bearer '.concat(res); 
                axios.get(`${baseURL}/token`,  { headers: { Authorization: AuthStr } })
                    .then(
                        (user) => {
                            setPhone(user.data.phone),
                            setCity(user.data.city),
                            setAddress(user.data.address)
                        }
                    )
                    .catch((error) => {
                        console.log('error ' + error);
                    });
            })
            .catch((error) => console.log(error))

        setOrderItems(props.cartItems)
        setStatus("3");
        return () => {
            setCity();
            setPhone();
            setOrderItems();
            setStatus();
        }
    }, [context.stateUser.isAuthenticated])
   
    const checkOut = () => {

        if (city === undefined || phone === undefined || address === undefined || address2 === undefined) {    
            setError("H??y ??i???n ?????y ????? c??c tr?????ng!");
        } else {
            let order = {
                city,
                products: orderItems,
                phone,
                shippingAddress1: address,
                shippingAddress2: address2,
                user: context.stateUser.user._id,
                status: status,
            }
            console.log(order)
            props.navigation.navigate("Thanh to??n", {order: order })  
        }
              
    }

    return (
        
        <KeyboardAwareScrollView
            viewIsInsideTabBar={true}
            extraHeight={200}
            enableOnAndroid={true}
        >   
            <View style={{ height: 20}}></View>
            <FormContainer title={"?????a ch??? giao h??ng"}>
            <View style={{ height: 10}}></View>
                <Input
                    style={{fontSize: 16}}
                    placeholder={"S??? ??i???n tho???i"}
                    name={"phone"}
                    value={phone}
                    keyboardType={"numeric"}
                    onChangeText={(text) => setPhone(text)}
                />
                   <Input
                    style={{fontSize: 16}}
                    placeholder={"?????a ch??? 1"}
                    name={"ShippingAddress1"}
                    value={address}
                    onChangeText={(text) => setAddress(text)}
                />
                   <Input
                    style={{fontSize: 16}}
                    placeholder={"?????a ch??? d??? ph??ng"}
                    name={"ShippingAddress2"}
                    value={address2}
                    onChangeText={(text) => setAddress2(text)}
                />
                   <Input
                    style={{fontSize: 16}}
                    placeholder={"T???nh/Th??nh ph???"}
                    name={"city"}
                    value={city}
                    onChangeText={(text) => setCity(text)}
                />
                <View style={styles.buttonGroup}>
                {error ? <Error message={error} /> : null}
                </View>
                <View style={{ width: '80%', alignItems: "center", marginTop:20 }}>
                    <Button title="X??c nh???n" onPress={() => checkOut()}/>
                </View>
            </FormContainer>
        </KeyboardAwareScrollView>
    )
}


const mapStateToProps = (state) => {
    const { cartItems } = state;
    return {
        cartItems: cartItems,
    }
}

const styles = StyleSheet.create({
    buttonGroup: {
      width: "80%",
      margin: 10,
      alignItems: "center",
    },
  });
export default connect(mapStateToProps)(Checkout)