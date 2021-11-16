import React from 'react'
import {StyleSheet, Image, SafeAreaView, Text} from 'react-native'

const Header = () => {
    return (
        <SafeAreaView style={styles.header}>
            <Image
                style={styles.image}
                source={require("../assets/logo.png")}
                resizeMode="contain"
            />
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    header: {
        width: "100%",
        flexDirection: 'row',
        alignContent: "center",
        justifyContent: "center",
        paddingTop: 10,
        marginTop: 25,
        paddingBottom: 5,
        borderBottomColor: '#999999',
        borderBottomWidth: 0.25
    },
    image: {
        height: 50,
        width: 200,
        paddingLeft: 10,
    },
    title: {
        fontWeight: "bold",
        fontSize: 30,
        paddingRight: 30
    }
})

export default Header;