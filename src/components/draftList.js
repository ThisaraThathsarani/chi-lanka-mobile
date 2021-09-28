import React, { useEffect, useState } from 'react'
import { Modal, SafeAreaView, Pressable, RefreshControl, View, FlatList, StyleSheet, Text, StatusBar, ScrollView, TouchableOpacity } from 'react-native'
import { getAllDrafts } from "../services/draftsService";
import updateDraft from './updateDraft';



const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

function draftList() {
    const [modalVisible, setModalVisible] = useState(false);

    const [draftList, setdraftList] = useState("");
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(500).then(() => setRefreshing(false));
        getAllDrafts().then((res) => {

            if (res.ok) {
                setdraftList(res.data);
            }
        }).catch((err) => {
            alert("error", err);
        })
    }, []);


    useEffect(() => {

        getAllDrafts().then((res) => {

            if (res.ok) {
                setdraftList(res.data);
            }
        }).catch((err) => {
            alert("error", err);
        })

    }, [])




    // const DATA = [
    //     {
    //         id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    //         title: 'First Item',
    //     },
    //     {
    //         id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    //         title: 'Second Item',
    //     },
    //     {
    //         id: '58694a0f-3da1-471f-bd96-145571e29d72',
    //         title: 'Third Item',
    //     },
    // ];

    const Item = ({ title, draftid }) => (
        <TouchableOpacity >
            <View style={[styles.itemS, styles.elevation]}>
                <Text style={styles.titleID}>{draftid}</Text>
                <Text style={styles.titleData}>{title}</Text>
                <Pressable

                    onPress={() => setModalVisible(true)}
                >
                    <Text >Show Modal</Text>
                </Pressable>
            </View>
        </TouchableOpacity>
    );


    const renderItem = ({ item }) => (

        <Item title={item.title} draftid={item.draftid} />
    );


    return (






        <ScrollView

            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }
        >




            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <Text>uwiefhiuefhhufheugugbbhbgbgebjrgnjrhngnjgsnngrjhngngn</Text>
            </Modal>








            <View style={{ flex: 1 }}>

                <FlatList
                    data={draftList}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />

            </View>
        </ScrollView>



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
    titleData: {
        fontSize: 18,
    },
    titleID: {
        fontWeight: 'bold',
        fontSize: 18,
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






    //modal style
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
        elevation: 2
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
    }
});

export default draftList
