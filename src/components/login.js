import React, { useState } from 'react'
import { Text, TouchableHighlight, View, StyleSheet, TextInput, Image, ImageBackground, Alert } from 'react-native'

function login({ navigation }) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const login = () => {

        if (username.length > 0 && password.length > 0) {
            if (username === 'SiteManager' && password === 'SMchi-lanka123') {
                navigation.navigate("Home")
            } else {
                Alert.alert("Invalid username or password!")
            }
        } else {
            Alert.alert("all fields are required!")
        }

    }

    return (
        <View style={styles.body}>
            <View>
                <Text style={styles.header}>
                    Welcome back!
                </Text>
            </View>
            <View>
                <TextInput style={styles.input} placeholder="username" onChangeText={(e) => { setUsername(e) }}></TextInput>
            </View>
            <View>
                <TextInput secureTextEntry={true} f style={styles.input} placeholder="password" onChangeText={(e) => { setPassword(e) }}></TextInput>
            </View>
            <TouchableHighlight underlayColor='none' onPress={login}>
                <View style={styles.btnLogin}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black' }}>Login</Text>
                </View>
            </TouchableHighlight>
            <ImageBackground
                style={styles.image}
                source={{
                    uri: 'https://i.ibb.co/PT7yhwn/login-chi-lanka.png'
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        alignItems: 'center',
        paddingTop: 90
        // justifyContent: 'center',
    },
    btnLogin: {
        backgroundColor: '#fc9800',
        alignItems: 'center',
        height: 40,
        width: 350,
        justifyContent: 'center',
        borderRadius: 10,
        marginTop: 10
    },
    header: {
        fontSize: 28,
        marginBottom: 30

    },
    image: {
        marginTop: 50,
        resizeMode: 'cover',
        height: 250,
        width: 350,
    },
    //input styles
    input: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "black",
        width: 350,
        padding: 10,
        color: 'black',
        fontSize: 16,
        marginBottom: 20
    },
    text: {
        color: 'black',
        fontSize: 18
    },
})

export default login
