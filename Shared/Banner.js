import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Dimensions, View, ScrollView} from 'react-native';
import Swiper from 'react-native-swiper/src'

var { width } = Dimensions.get("window");
const Banner = () => {
    const [bannerData, setBannerData] = useState([])
    useEffect(() => {
        setBannerData([
            "https://i.ytimg.com/vi/5KZwkpxzK9o/maxresdefault.jpg",
            "https://i.pinimg.com/originals/57/7c/82/577c82cb53a1f24ab8fc478237b5b128.png",
            "https://lh3.googleusercontent.com/proxy/CK4M5BMEd4gnKp_1-ABPMN7vVE37gKH6Jit5TPvbM4YJPfMi13my2lI_nqddzimnfJ4r5TN70NlbvkeZ2EYNiGfPeyRUcfXrZb6JI7pp-DP5pQuDSWnszHWY_T6HTA"
        ])
        return () => {
            setBannerData([])
        }
    }, [])

    return (
        <ScrollView>
            <View style={styles.container}>
            <View style={styles.swiper}>
                <Swiper
                    style={{ height: width / 2 }}
                    showButtons={false}
                    autoplay={true}
                    autoplayTimeout={5}
                >
                    {bannerData.map((item) => {
                        return (
                            <Image  
                                key={item}
                                style={styles.imageBanner}
                                resizeMode="contain"
                                source={{uri: item}}
                            />
                        );
                    })}
                </Swiper>
            </View>
        </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        width: width,
        flex: 1,
        alignItems: 'center',
        marginBottom: 10,
    },
    swiper: {
        width: width,
        alignItems: 'center',
    },
    imageBanner: {
        height: width / 2,
        width: width,
        borderRadius: 10,
    }
})
export default Banner;