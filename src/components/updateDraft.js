import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar';

import { Alert, Modal, StyleSheet, Text, TextInput, Pressable, View } from 'react-native';

function UpdateDraft() {

    const [modalVisible, setModalVisible] = useState(false);
    return (


        <View style={styles.centeredView}>




            <View style={styles.modalView}>
                <Text style={styles.modalText}>Hello World!</Text>

                <View style={{ marginTop: 20 }} >
                    <Text style={styles.text}>Order ID :</Text>
                    <TextInput style={styles.input} placeholder="Ship to" ></TextInput>
                    <StatusBar style="auto" />
                </View>


                <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}
                >
                    <Text style={styles.textStyle}>Hide Modal</Text>
                </Pressable>
            </View>



        </View >


    )
}


const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginTop: 5

    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },


    //input css
    input: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "black",
        width: 350,
        padding: 10,
        color: 'black',
        fontWeight: 'bold',
        fontSize: 16
    },
    text: {
        color: 'black',
        fontSize: 18
    },

});

export default UpdateDraft
