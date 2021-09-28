import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TextInput, RefreshControl, ScrollView, TouchableHighlight, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { addOrder, lastAddedOrder } from "../services/purchaseOrderService";
import { addOrderItems } from "../services/purchaseOrderItemsService";
import { addRequisition } from "../services/requisitionService";
import { createPayment } from "../services/paymentService";
import { addNewDraft } from "../services/draftsService";
import { getItemDetails } from "../services/itemServices";

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}


function placeAnOrder({ navigation }) {

    const [refreshing, setRefreshing] = React.useState(false);
    const [orderid, setOrderId] = useState("");
    const [orderdate, setOrderdate] = useState("");
    const [suppliername, setSuppliername] = useState("");
    const [title, setTitle] = useState("");
    const [shipto, setShipTo] = useState("");
    const [total, setTotal] = useState(500);
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

    var [id, setID] = useState("");

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(500).then(() => setRefreshing(false));
    }, []);

    useEffect(() => {
        console.log("Totalllllllll", total);
        calculateThreeItemsAmount();
        nextOrderId();

    }, [total, orderid])


    function getDetails1(value) {
        getItemDetails(value).then((res) => {
            //console.log("data for table", res);
            if (res.ok) {
                setItemName01(res.data.item.itemname);
                setAmount01(res.data.item.price);
            }
        }).catch((error) => {
            //alert(error.message);

        })

    }
    function getDetails2(value) {
        getItemDetails(value).then((res) => {
            //console.log("data for table", res);
            if (res.ok) {
                setItemName02(res.data.item.itemname);
                setAmount02(res.data.item.price);
            }
        }).catch((error) => {
            //alert(error.message);

        })

    }
    function getDetails3(value) {
        getItemDetails(value).then((res) => {
            //console.log("data for table", res);
            if (res.ok) {
                setItemName03(res.data.item.itemname);
                setAmount03(res.data.item.price);
            }
        }).catch((error) => {
            //alert(error.message);

        })

    }

    function calculateItem1Amount() {
        var firstAmount = amount1 * qty01;
        //document.getElementById("totalAmount").value = firstAmount;
        //setTotal(firstAmount)
        return firstAmount;
    }

    function calculateTwoItemsAmount() {
        var secondAmount = (amount2 * qty02) + calculateItem1Amount();
        //document.getElementById("totalAmount").value = secondAmount;
        //setTotal(secondAmount)
        return secondAmount;
    }

    function calculateThreeItemsAmount() {
        var thirdAmount = (amount3 * qty03) + calculateTwoItemsAmount();
        setTotal(thirdAmount)
        //document.getElementById("totalAmount").value = thirdAmount;
        console.log("Price", total);
    }


    function nextOrderId() {
        lastAddedOrder().then((response) => {
            if (response.ok) {
                setID(response.data.orderid)
                console.log("iddddd", response.data.orderid)
            }

            id = id.substring(2, 5)
            id = Number(id) + 1;
            var id2 = "OI00" + id;
            setOrderId(id2)
            //alert(id2)
        })
    }


    function sendData(e) {
        // e.preventDefault();
        // Alert.alert("function called")
        const newOrder = {
            orderid,
            orderdate: new Date().toISOString().slice(0, 10),
            suppliername,
            title,
            shipto,
            status: "Pending",
            total,
            comment,
        };


        const newOrderItems = {
            orderid,
            item01,
            item02: "",
            item03: "",
            itemName01,
            itemName02: "",
            itemName03: "",
            qty01,
            qty02: 5,
            qty03: 5,
            amount1: 100,
            amount2: 100,
            amount3: 100
        }

        const newPayment = {
            orderid,
            total,
            comment,
            orderdate
        }

        if (total > 100000) {
            Alert.alert("Order Amount Exceeds 100,000 Do you want to submit a purchase Requisition? ").then((result) => {

                if (result.isConfirmed) {

                    var requisitionid = orderid;
                    var amount01 = amount1;
                    var amount02 = amount2;
                    var amount03 = amount3;
                    status = "Waiting for Approval";

                    alert(amount01 + amount02 + amount03)
                    const newRequisition = {
                        requisitionid, orderdate, suppliername, title, shipto, status, total, comment, item01, item02, item03, itemName01, itemName02, itemName03,
                        qty01, qty02, qty03, amount01, amount02, amount03
                    }

                    addRequisition(newRequisition).then((response) => {

                        if (response.ok) {
                            Alert.alert("Success!")

                        }
                        else {
                            Alert.alert("Oops! Something went wrong")
                        }
                    })


                }

            })

        } else {

            addOrder(newOrder).then((response) => {

                if (response.ok) {

                    addOrderItems(newOrderItems).then(() => {

                        if (response.ok) {

                            createPayment(newPayment).then(() => {

                                if (response.ok) {
                                    Alert.alert("Success!"
                                    )
                                } else {
                                    Alert.alert("Oops! Something went wrong")

                                }

                            })

                        }
                        else {
                            Alert.alert("Oops! Something went wrong"
                            )
                        }
                    })

                } else {
                    Alert.alert("Oops! Something went wrong")
                }
            }
            )
        }


    }


    const saveAsDraft = () => {
        console.log(orderid, title, total, item01, itemName01, qty01)
        const newDraft = {
            draftid: orderid,
            draftdate: orderdate,
            modifydate: new Date().toISOString().slice(0, 10),
            suppliername: suppliername,
            title: title,
            shipto: shipto,
            status: "Waiting for Approval",
            total: total,
            comment: comment,
            item01: item01,
            item02: item02,
            item03: item03,
            itemName01: itemName01,
            itemName02: itemName02,
            itemName03: itemName03,
            qty01: qty01,
            qty02: qty02,
            qty03: qty03,
            amount01: amount1,
            amount02: amount2,
            amount03: amount3
        }

        addNewDraft(newDraft).then((res) => {
            Alert.alert("draft saved")
            navigation.navigate('draftList');
        }).catch((err) => {
            Alert.alert("draft NOT saved", err);
        })
    }



    // useEffect(() => {
    //   console.log(supplier);
    // }, [supplier])
    return (
        <SafeAreaView style={styles.container}>

            <ScrollView refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }>

                <View style={{ marginTop: 20 }} >
                    <Text style={styles.text}>Order ID :</Text>
                    <TextInput style={styles.input} value={orderid} placeholder="Ship to" onChangeText={(e) => { setOrderId(e) }}></TextInput>
                    <StatusBar style="auto" />
                </View>

                <View>
                    <Text style={styles.text}>Supplier :</Text>
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
                            <Picker.Item label="Manual Handlers" value="Manual Handlers" />
                            <Picker.Item label="Builders Barn" value="Builders Barn" />
                            <Picker.Item label="Pinnacle" value="Pinnacle" />
                        </Picker>
                    </View>
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text style={styles.text}>PO Title :</Text>
                    <TextInput style={styles.input} placeholder="po title" onChangeText={(e) => { setTitle(e) }}></TextInput>
                    <StatusBar style="auto" />
                </View>

                <View style={{ marginTop: 10 }}>
                    <Text style={styles.text}>Ship to :</Text>
                    <TextInput style={styles.input} placeholder="Ship to" onChangeText={(e) => { setShipTo(e) }}></TextInput>
                    <StatusBar style="auto" />
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text style={styles.text}>Item 01 :</Text>
                    <TextInput style={styles.input} placeholder="IT001" onChangeText={(e) => { setItem01(e); getDetails1(e); }}></TextInput>
                    <StatusBar style="auto" />
                </View>

                <View style={{ marginTop: 10 }}>
                    <Text style={styles.text}>Item name:</Text>
                    <TextInput style={styles.input} placeholder="Item Name" value={itemName01} onChangeText={(e) => { setItemName01(e) }}></TextInput>
                    <StatusBar style="auto" />
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text style={styles.text}>Item qty :</Text>
                    <TextInput style={styles.input} keyboardType="numeric" placeholder="Quantity" value={amount1} onChangeText={(e) => { setQty01(e); calculateThreeItemsAmount() }}></TextInput>
                    <StatusBar style="auto" />
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text style={styles.text}>Item 02 :</Text>
                    <TextInput style={styles.input} placeholder="Ship to" onChangeText={(e) => { setItem02(e); getDetails2(e) }}></TextInput>
                    <StatusBar style="auto" />
                </View>

                <View style={{ marginTop: 10 }}>
                    <Text style={styles.text}>Item name:</Text>
                    <TextInput style={styles.input} placeholder="IT002" value={itemName02} onChangeText={(e) => { setItemName02(e); }}></TextInput>
                    <StatusBar style="auto" />
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text style={styles.text}>Item qty :</Text>
                    <TextInput style={styles.input} placeholder="Item Name" keyboardType="numeric" value={amount2} onChangeText={(e) => { setQty02(e); calculateThreeItemsAmount() }}></TextInput>
                    <StatusBar style="auto" />
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text style={styles.text}>Item 03 :</Text>
                    <TextInput style={styles.input} placeholder="Quantity" onChangeText={(e) => { setItem03(e); getDetails3(e); }}></TextInput>
                    <StatusBar style="auto" />
                </View>

                <View style={{ marginTop: 10 }}>
                    <Text style={styles.text}>Item name:</Text>
                    <TextInput style={styles.input} placeholder="IT003" value={itemName03} onChangeText={(e) => { setItemName03(e) }}></TextInput>
                    <StatusBar style="auto" />
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text style={styles.text}>Item qty :</Text>
                    <TextInput style={styles.input} placeholder="Item Name" value={amount3} keyboardType="numeric" onChangeText={(e) => { setQty03(e); calculateThreeItemsAmount() }}></TextInput>
                    <StatusBar style="auto" />
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text style={styles.text}>total :</Text>
                    <TextInput style={styles.input} placeholder="Total" value={total.toString()} ></TextInput>
                    <StatusBar style="auto" />
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text style={styles.text}>comments :</Text>
                    <TextInput style={styles.input} placeholder="Additional Note" onChangeText={(e) => { setComment(e); }}
                    ></TextInput>
                    <StatusBar style="auto" />
                </View>
                <View style={{ alignItems: 'center', marginTop: 20 }}>
                    <TouchableHighlight onPress={sendData}>
                        <View style={styles.btnSubmit}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Submit</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={saveAsDraft}>
                        <View style={styles.btnDraft}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Save as Draft</Text>
                        </View>
                    </TouchableHighlight>
                </View>




            </ScrollView>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingBottom: 20
    },
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
    btnSubmit: {
        width: 350,
        height: 50,
        backgroundColor: '#1FC190',
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
        marginBottom: 20

    },
    btnDraft: {
        width: 350,
        height: 50,
        backgroundColor: '#FFCA00',
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
        marginBottom: 20

    }
});

export default placeAnOrder
