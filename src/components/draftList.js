import React, { useEffect, useState } from 'react'
import { Alert, Modal, SafeAreaView, RefreshControl, View, FlatList, StyleSheet, Text, StatusBar, ScrollView, TouchableOpacity } from 'react-native'
import { getAllDrafts, deleteDraftPermenantly } from "../services/draftsService";

import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton } from 'react-native-gesture-handler';
import UpdateDraft from './updateDraft';



const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

function draftList() {

    const [modalData, setModalData] = useState([]);

    const [modalVisible, setModalVisible] = useState(false);

    const [draftList, setdraftList] = useState([]);
    const [refreshing, setRefreshing] = React.useState(false);
    const [id, setId] = useState("");

    const [modalDataUpdate, setModalDataUpdate] = useState([]);
    const [modalUpdate, setModalUpdate] = useState(false);



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

    }, [id])




    const LeftSwipeActions = () => {
        return (
            <View
                style={{ flex: 1, backgroundColor: '#FF3131', justifyContent: 'center' }}
            >

                <TouchableOpacity onPress={() => { deleteDraftPermenantly(id) }}>
                    <Text
                        style={{
                            color: 'white',
                            paddingHorizontal: 10,
                            fontWeight: '600',
                            paddingHorizontal: 30,
                            paddingVertical: 20,
                            fontSize: 18,
                            marginLeft: 150
                        }}
                    >
                        Delete
                    </Text>
                </TouchableOpacity>
            </View>
        );
    };

    const RightSwipeActions = () => {
        return (
            <View
                style={{ flex: 1, backgroundColor: 'green', justifyContent: 'center' }}
            >
                <TouchableOpacity onPress={() => { setModalVisible(true) }}>
                    <Text
                        style={{
                            color: 'white',
                            paddingHorizontal: 10,
                            fontWeight: '600',
                            paddingHorizontal: 30,
                            paddingVertical: 20,
                            fontSize: 18,
                            marginLeft: 150
                        }}
                    >
                        Update
                    </Text>
                </TouchableOpacity>
            </View>
        );
    };



    const List = () => {
        return draftList.map((element) => {
            return (
                <View key={element.draftid}>
                    <Swipeable
                        renderLeftActions={LeftSwipeActions}
                        renderRightActions={RightSwipeActions}>
                        <TouchableOpacity onPress={() => { setId(element.draftid), setModalData(element) }}>
                            <View style={[styles.itemList, styles.elevation]}>
                                <Text style={styles.titleID}>{element.draftid}</Text>
                                <Text style={styles.titleData}>{element.title}</Text>
                            </View>
                        </TouchableOpacity>
                    </Swipeable>
                </View >
            )
        })
    }


    return (

        <ScrollView
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }
        >

            <View style={{ flex: 1, paddingTop: 20 }}>

                <View>{List()}</View>

            </View>


            <Modal
                animationType="slide"
                transparent={true}
                onHide={() => setModalVisible(false)}

                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(false);
                }}
            >
                <UpdateDraft
                    data={modalData}
                    onHide={() => setModalVisible(false)}

                />

            </Modal>

        </ScrollView >



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

    itemList: {
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
