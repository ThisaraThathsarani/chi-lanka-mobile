import React, { useEffect, useState } from 'react'
<<<<<<< HEAD
import { Animated, SafeAreaView, RefreshControl, View, FlatList, StyleSheet, Text, StatusBar, ScrollView, TouchableOpacity } from 'react-native'
import { getAllDrafts, deleteDraftPermenantly } from "../services/draftsService";

import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton } from 'react-native-gesture-handler';
=======
import { Modal, SafeAreaView, Pressable, RefreshControl, View, FlatList, StyleSheet, Text, StatusBar, ScrollView, TouchableOpacity } from 'react-native'
import { getAllDrafts } from "../services/draftsService";
import updateDraft from './updateDraft';

>>>>>>> 74873f2aa318458d137f5a478f91274e7f15a962


const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

function draftList() {
    const [modalVisible, setModalVisible] = useState(false);

    const [draftList, setdraftList] = useState([]);
    const [refreshing, setRefreshing] = React.useState(false);
    const [id, setId] = useState("");

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
            console.log("listtttttttttt", res);
            if (res.ok) {
                setdraftList(res.data);
            }
        }).catch((err) => {
            alert("error", err);
        })

        console.log("iddddddd", id);

    }, [id])


    const LeftSwipeActions = () => {
        // deleteDraftPermenantly(id);
        console.log("updateeeeeeeeeeee")
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
        // console.log("updateeeeeeeeeeee")
        return (
            <View
                style={{ flex: 1, backgroundColor: 'green', justifyContent: 'center' }}
            >
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
            </View>
        );
    };

    function deleteDraft() {
        console.log("deleteeeeeeee")
        // console.log("delete dataa", data)
    }



    const List = () => {
        return draftList.map((element) => {
            return (
                <View key={element.draftid}>
                    <Swipeable
                        renderLeftActions={LeftSwipeActions}
                        // openLeft={setId(element.draftid)}
                        // leftThreshold={'50%'} rightThreshold={'50%'}
                        renderRightActions={RightSwipeActions}>
                        <TouchableOpacity onPress={() => { console.log("clicked data", setId(element.draftid)) }}>
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
