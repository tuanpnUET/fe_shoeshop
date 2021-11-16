import React, { useState, useEffect } from "react"
import { 
    View, 
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Platform
} from "react-native"
import { Item, Picker } from "native-base"
import FormContainer from "../Form/FormContainer"
import { Input } from 'react-native-elements'
import MyButton from "../../Shared/MyButton"
import Error from "../../Shared/Error"
import Icon from "react-native-vector-icons/FontAwesome"
import Toast from "react-native-toast-message"
import AsyncStorage from "@react-native-community/async-storage"
import baseURL from "../../assets/common/baseUrl"
import axios from "axios"
import * as ImagePicker from "expo-image-picker"
import mime from "mime";

const ProductForm = (props) => {
    
    const [pickerValue, setPickerValue] = useState();
    const [brand, setBrand] = useState();
    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [description, setDescription] = useState();
    const [image, setImage] = useState();
    const [mainImage, setMainImage] = useState();
    const [category, setCategory] = useState();
    const [id, setId] = useState();
    const [categories, setCategories] = useState([]);
    const [token, setToken] = useState();
    const [err, setError] = useState();
    const [countInStock, setCountInStock] = useState();
    const [isFeatured, setIsFeature] = useState(false);
    const [item, setItem] = useState(null);

    useEffect(() => {

        setItem(null);
        AsyncStorage.getItem("jwt")
            .then((res) => {
                setToken(res)
            })
            .catch((error) => console.log(error))

        // Categories
        axios
            .get(`${baseURL}/category`)
            .then((res) => {
                setCategories(res.data.categories)})
            .catch((error) => alert("Lỗi load category"));

        // Image Picker
        (async () => {
            if (Platform.OS !== "web") {
                const {
                    status,
                } = await ImagePicker.requestCameraPermissionsAsync();
                if (status !== "granted") {
                    alert("Xin lỗi chúng tôi cần quyền truy cập camera!")
                }
            }
        })();

        return () => {
            setCategories([])
        }
    }, [])

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });

        if (!result.cancelled) {
            setMainImage(result.uri);
            setImage(result.uri);
        }
    };

    const addProduct = () => {
        if (
            name == "" ||
            brand == "" ||
            price == "" ||
            description == "" ||
            category == "" ||
            countInStock == ""
        ) {
            setError("Vui lòng điền đẩy đủ các mục!")
        }

        // let formData = new FormData();

        const newImageUri = "file:///" + image.split("file:/").join("");

        const product = {
            name: name,
            image: {
                uri: newImageUri,
                type: mime.getType(newImageUri),
                name: newImageUri.split("/").pop()
            },
            brand: brand,
            price: price,
            description: description,
            category: category,
            countInStock: countInStock
        }

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        }
        axios
            .post(`${baseURL}/product/create`, product, config)
            .then(console.log(product))
            .then((res) => {
                if(res.status == 200 || res.status == 201) {
                    Toast.show({
                        topOffset: 60,
                        type: "success",
                        text1: "Sản phẩm mới đã được thêm",
                        text2: ""
                    });
                    setTimeout(() => {
                        props.navigation.navigate("Products");
                    }, 500)
                }
            })
            .catch((error) => {
                Toast.show({
                    topOffset: 60,
                        type: "error",
                        text1: "Opps, có lỗi xảy ra,",
                        text2: "Xin vui lòng thử lại."
                })
            })
        } 
    

    return (
       <FormContainer>
           <View style={styles.imageContainer}>
               <Image style={styles.image} source={{uri: mainImage}}/>
               <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                   <Icon style={{ color: "white"}} name="camera"/>
               </TouchableOpacity>
           </View>
           <View style={styles.label}>
               <Text style={styles.title}>Nhãn hiệu</Text>
           </View>
           <Input 
            name="brand"
            id="brand"
            value={brand}
            onChangeText={(text) => setBrand(text)}
           />
           <View style={styles.label}>
               <Text style={styles.title}>Tên giày</Text>
           </View>
           <Input 
            name="name"
            id="name"
            value={name}
            onChangeText={(text) => setName(text)}
           />
            <View style={styles.label}>
               <Text style={styles.title}>Giá</Text>
           </View>
           <Input 
            name="price"
            id="price"
            value={price}
            keyboardType={"numeric"}
            onChangeText={(text) => setPrice(text)}
           />
            <View style={styles.label}>
               <Text style={styles.title}>Số lượng</Text>
           </View>
           <Input 
            name="stock"
            id="stock"
            value={countInStock}
            keyboardType={"numeric"}
            onChangeText={(text) => setCountInStock(text)}
           />
            <View style={styles.label}>
               <Text style={styles.title}>Mô tả sản phẩm</Text>
           </View>
           <Input 
            name="description"
            id="description"
            value={description}
            onChangeText={(text) => setDescription(text)}
           />
           <View style={styles.label}>
               <Text style={styles.title}>Lựa chọn danh mục</Text>
           </View>
           <View  style={{marginTop: 10, paddingLeft: 10, paddingRight: 20 , borderWidth: 2, borderColor: '#D6D5D5', borderRadius: 20 }}>
           <Item picker>
                <Picker
                    mode="dropdown"
                    iosIcon={<Icon color={"#007aff"} name="arrow-down" />}
                    style={{width: 250, height: 50, color: 'black'}}
                    placeholder="Select your Category"
                    selectedValue={pickerValue}
                    onValueChange={(e) => [setPickerValue(e), setCategory(e)]}
                >
                    {categories.map((c) => {
                        // console.log(c.name)
                        return <Picker.Item key={c._id} label={c.name} value={c._id} />
                    })}
                </Picker>
           </Item>
           </View>
           
           {err ? <Error message={err} /> : null}
           <View style={styles.buttonContainer}>
               <MyButton
                large
                primary 
                style={{backgroundColor: '#36CBDA', 
                borderRadius: 20}} 
                onPress={() => addProduct()}               
               >
                   <Text style={styles.buttonText}>Xác nhận</Text>
               </MyButton>
           </View>
       </FormContainer>
    )
}

const styles = StyleSheet.create({
    label: {
        width: "93%",
        marginTop: 5
    },
    buttonContainer: {
        width: "80%",
        marginBottom: 80,
        marginTop: 20,
        alignItems: "center"
    },
    buttonText: {
        color: "white",
        fontWeight: 'bold',
        fontSize: 16
    },
    imageContainer: {
        width: 200,
        height: 200,
        borderStyle: "solid",
        borderWidth: 8,
        padding: 0,
        justifyContent: "center",
        borderRadius: 100,
        borderColor: "#E0E0E0",
        elevation: 10
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 100
    },
    imagePicker: {
        position: "absolute",
        right: 5,
        bottom: 5,
        backgroundColor: "grey",
        padding: 8,
        borderRadius: 100,
        elevation: 20
    },
    title: {
        fontSize: 17,
        fontWeight: 'bold'
    }
})

export default ProductForm;