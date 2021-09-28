import axios from "axios";

import { addOrder } from "./purchaseOrderService"
import { addOrderItems } from "./purchaseOrderItemsService"

const HOST = "http://10.0.2.2:4000";

//to add a requisition
export const addRequisition = async (newRequisitionPayload) => {
    try {
        const response = await axios.post(`${HOST}/requisition/addRequisition`, newRequisitionPayload);
        console.log("dataaaaaaaa", response)
        return {
            ok: true
        }
    } catch (error) {
        return {
            ok: false, err: error.response.data.message

        }

    }
}

//to retrieve all requisition records
export const getAllRequisition = async () => {
    try {
        const response = await axios.get(`${HOST}/requisition/displayRequisition`);
        console.log("dataaaaaaaa", response)
        return {
            ok: true,
            data: response.data
        }
    } catch (error) {
        return {
            ok: false
        }

    }
}


//to delete a requisition record
export const deleteRequisitionRecord = async (payload) => {
    try {
        const response = await axios.post(`${HOST}/requisition/deleteRequisition`, payload);
        return {
            ok: true,
        };
    } catch (error) {
        return {
            ok: false, err: error.response.data.status
        };
    }
}

//to update the status of the requisition record
export const updateRequisitionStatus = async (reqID, payload, list) => {

    const newOrder = {
        orderid: reqID,
        orderdate: payload.requisitionDate,
        suppliername: payload.supplier,
        title: list.title,
        shipto: payload.shipToAddress,
        status: payload.status,
        total: list.total,
        comment: payload.comment
    };
    const newOrderItems = {
        orderid: reqID,
        item01: list.item01,
        item02: list.item02,
        item03: list.item03,
        itemName01: list.itemName01,
        itemName02: list.itemName02,
        itemName03: list.itemName03,
        qty01: list.qty01,
        qty02: list.qty02,
        qty03: list.qty03,
        amount1: list.amount01,
        amount2: list.amount02,
        amount3: list.amount03
    }

    const newDeleteReq = {
        requisitionID: reqID,
        reason: payload.comment
    }

    if (payload.status === "Approved") {
        //remove from requisitions
        deleteRequisitionRecord(payload).then(() => {
            addOrder(newOrder)
            addOrderItems(newOrderItems).then(() => {
                return {
                    ok: true,
                };
            })
        })
        // add to orders and order items list


    } else if (payload.status === "Declined") {
        // console.log("email sent")
        try {
            await axios.post("https://getform.io/f/05caf7a1-a076-469e-b605-46ed909549da", newDeleteReq);
            await axios.put(`${HOST}/requisition/updateRequisition/${reqID}`, payload);
            return {
                ok: true,
            };
        } catch (error) {
            return {
                ok: false, err: error.response.data.status
            };
        }
    } else {
        try {
            await axios.put(`${HOST}/requisition/updateRequisition/${reqID}`, payload);
            return {
                ok: true,
            };
        } catch (error) {
            return {
                ok: false, err: error.response.data.status
            };
        }
    }
}

//to view one requisition record
export const getOneRequisitionRecord = async (reqID) => {
    try {
        const response = await axios.get(`${HOST}/requisition/getRequisitionByID/${reqID}`);
        return {
            ok: true,
        };
    } catch (error) {
        return {
            ok: false, err: error.response.data.status
        };
    }
}