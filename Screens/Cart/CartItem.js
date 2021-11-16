import React, {useState, useEffect} from 'react'
import { StyleSheet } from 'react-native'
import {
    Text,
    Left,
    Right,
    ListItem,
    Thumbnail,
    Body
} from 'native-base'

const CartItem = (props) => {
    
    const data = props.item.item.product;
    const [quantity, setQuantity] = useState(props.item.item.quantity);
    const [total, setTotal] = useState();

    useEffect(() => {
        return () => {
            setTotal();
        }
    }, [])

    return (
        <ListItem
        style={styles.listItem}
        key={Math.random}
        avatar
        >
            <Left>
                <Thumbnail 
                    style={styles.image}
                    source={{ uri: data.image ? data.image : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png'}}
                    />
            </Left>
            <Body style={styles.body}>
                <Left>
                    <Text style={styles.name}>{data.name}</Text>
                </Left>
                <Right>
                    <Text style={styles.price}>Giá: ${data.price}</Text>
               </Right>
            </Body>
        </ListItem>
    )
};
const styles = StyleSheet.create({
    listItem: {
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'center',

    },
    body: {
        margin: 5,
        alignItems: 'center',
        flexDirection: 'row',

    },
    image: {
        height: 70,
        width: 80,
        paddingBottom: 20,
    },
    name: {
        fontSize: 13,
        fontWeight: 'bold'
    },
    price: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FF0033',
        paddingRight: 10
    },
})
export default CartItem;