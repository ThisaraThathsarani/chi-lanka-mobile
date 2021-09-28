import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { Modal, SafeAreaView, StyleSheet, Text, View, TextInput, ImageBackground, ScrollView, TouchableHighlight, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';



import { addOrder } from "../services/purchaseOrderService";
import { addOrderItems } from "../services/purchaseOrderItemsService";
import { getItemsFromSupplier } from "../services/supplierService";
import { getItemDetails } from "../services/itemServices";
import { addRequisition } from "../services/requisitionService";
import { createPayment } from "../services/paymentService";

import { addNewDraft, updateDraft } from "../services/draftsService";



export default function UpdateDraft() {


    const [modalVisible, setModalVisible] = useState(false);



    // let history = useHistory();

    const [orderid, setOrderId] = useState("");
    const [orderdate, setOrderdate] = useState("");
    const [suppliername, setSuppliername] = useState("");
    const [title, setTitle] = useState("");
    const [shipto, setShipTo] = useState("");
    const [total, setTotal] = useState("");
    const [comment, setComment] = useState("");
    const [item01, setItem01] = useState("");
    const [item02, setItem02] = useState("");
    const [item03, setItem03] = useState("");
    const [itemName01, setItemName01] = useState("");
    const [itemName02, setItemName02] = useState("");
    const [itemName03, setItemName03] = useState("");
    const [qty01, setQty01] = useState("");
    const [qty02, setQty02] = useState("");
    const [qty03, setQty03] = useState("");
    const [amount1, setAmount01] = useState("");
    const [amount2, setAmount02] = useState("");
    const [amount3, setAmount03] = useState("");


    const [Supplier01List, setSupplier01List] = useState([]);
    const [Supplier02List, seSupplier02List] = useState([]);
    const [Supplier03List, setSupplier03List] = useState([]);
    const [Supplier04List, setSupplier04List] = useState([]);
    const [Supplier05List, setSupplier05List] = useState([]);


    const [OrderIDErr, setOrderIDErr] = useState("");










    return (
        <SafeAreaView style={styles.container}>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >

                <ScrollView>

                    <View style={{ marginTop: 20 }} >
                        <Text style={styles.text}>Order ID: </Text>
                        <TextInput style={styles.input} placeholder="Ship to" onChangeText={(e) => { setOrderId(e) }}></TextInput>
                        <StatusBar style="auto" />
                    </View>

                    <View>
                        <Text style={styles.text}>Supplier: </Text>
                        <View style={{
                            borderWidth: 1, borderColor: 'red', width: 350,
                            borderRadius: 10, height: 45
                        }}>

                            <Picker
                                selectedValue={suppliername}
                                onValueChange={(itemValue) =>
                                    setSuppliername(itemValue)
                                }>
                                <Picker.Item label="KDH Constructions" value="KDH" />
                                <Picker.Item label="PERERA Constructions" value="PERERA" />
                            </Picker>
                        </View>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={styles.text}>PO Title: </Text>
                        <TextInput style={styles.input} placeholder="po title" onChangeText={(e) => { setTitle(e) }}></TextInput>
                        <StatusBar style="auto" />
                    </View>

                    <View style={{ marginTop: 10 }}>
                        <Text style={styles.text}>Ship to: </Text>
                        <TextInput style={styles.input} placeholder="Ship to" onChangeText={(e) => { setShipTo(e) }}></TextInput>
                        <StatusBar style="auto" />
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={styles.text}>Item 01: </Text>
                        <TextInput style={styles.input} placeholder="Ship to" onChangeText={(e) => { setItem01(e) }}></TextInput>
                        <StatusBar style="auto" />
                    </View>

                    <View style={{ marginTop: 10 }}>
                        <Text style={styles.text}>Item name: </Text>
                        <TextInput style={styles.input} placeholder="Ship to" onChangeText={(e) => { setItemName01(e) }}></TextInput>
                        <StatusBar style="auto" />
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={styles.text}>Item qty: </Text>
                        <TextInput style={styles.input} placeholder="Ship to" onChangeText={(e) => { setQty01(e) }}></TextInput>
                        <StatusBar style="auto" />
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={styles.text}>Item 02: </Text>
                        <TextInput style={styles.input} placeholder="Ship to" onChangeText={(e) => { setItem02(e) }}></TextInput>
                        <StatusBar style="auto" />
                    </View>

                    <View style={{ marginTop: 10 }}>
                        <Text style={styles.text}>Item name: </Text>
                        <TextInput style={styles.input} placeholder="Ship to" onChangeText={(e) => { setItemName02(e) }}></TextInput>
                        <StatusBar style="auto" />
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={styles.text}>Item qty: </Text>
                        <TextInput style={styles.input} placeholder="Ship to" onChangeText={(e) => { setQty02(e) }}></TextInput>
                        <StatusBar style="auto" />
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={styles.text}>Item 03: </Text>
                        <TextInput style={styles.input} placeholder="Ship to" onChangeText={(e) => { setItem03(e) }}></TextInput>
                        <StatusBar style="auto" />
                    </View>

                    <View style={{ marginTop: 10 }}>
                        <Text style={styles.text}>Item name: </Text>
                        <TextInput style={styles.input} placeholder="Ship to" onChangeText={(e) => { setItemName03(e) }}></TextInput>
                        <StatusBar style="auto" />
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={styles.text}>Item qty: </Text>
                        <TextInput style={styles.input} placeholder="Ship to" onChangeText={(e) => { setQty03(e) }}></TextInput>
                        <StatusBar style="auto" />
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={styles.text}>total: </Text>
                        <TextInput style={styles.input} placeholder="Ship to" onChangeText={(e) => { setTotal(e) }}></TextInput>
                        <StatusBar style="auto" />
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={styles.text}>comments: </Text>
                        <TextInput style={styles.input} placeholder="Ship to" onChangeText={(e) => { setComment(e) }}></TextInput>
                        <StatusBar style="auto" />
                    </View>
                    <View style={{ alignItems: 'center', marginTop: 20 }}>
                        {/* <TouchableHighlight onPress={sendData}>
                        <View style={styles.btnSubmit}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Submit</Text>
                        </View>
                    </TouchableHighlight> */}
                        <TouchableHighlight onPress={updateDraft}>
                            <View style={styles.btnDraft}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Save as Draft</Text>
                            </View>
                        </TouchableHighlight>
                    </View>




                </ScrollView>

            </Modal>
        </SafeAreaView >
    )
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },

    itemS: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        backgroundColor: "white",
        borderRadius: 10,

        marginLeft: 17,
        borderColor: "#D8D8D8",
        borderWidth: 0.5

    },
    elevation: {
        shadowColor: "#52006A",
        elevation: 5,
    },
});

