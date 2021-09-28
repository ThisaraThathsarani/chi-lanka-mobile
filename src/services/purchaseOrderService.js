import axios from "axios";

const HOST = "http://10.0.2.2:4000";

//to add a purchase order
export const addOrder = async (orderPayload) => {
    console.log("service called", orderPayload);
    try {
        const response = await axios.post(`${HOST}/order/addOrder`, orderPayload);
        console.log("dataaaaaaaa", response)
        return {
            ok: true
        }
    } catch (error) {
        console.log("errorr", error)
        return {
            // ok: false, err: error.response.data.error
        }

    }
}

//to retrieve all purchase orders
export const getAllPurchaseOrders = async () => {
    try {
        const response = await axios.get(`${HOST}/order/displayOrders`);
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

//to update the status of the purchase order
export const updatePurchaseOrderStatus = async (orderID, orderPayload, newDeleteReq) => {
    try {
        await axios.put(`${HOST}/order/updateOrder/${orderID}`, orderPayload);
        if (orderPayload.status == "Declined") {
            await axios.post("https://getform.io/f/05caf7a1-a076-469e-b605-46ed909549da", newDeleteReq);
        }
        return {
            ok: true,
        };
    } catch (error) {
        return {
            ok: false, err: error.response.data.status
        };
    }
}

//to delete a purchase order record
export const deletePurchaseOrderRecord = async (orderID) => {
    try {
        const response = await axios.delete(`${HOST}/order/deleteOrder/${orderID}`);
        return {
            ok: true,
        };
    } catch (error) {
        return {
            ok: false, err: error.response.data.status
        };
    }
}

//to view one purchase order record
export const getOnePurchaseOrderRecord = async (rID) => {
    try {
        const response = await axios.get(`${HOST}/order/getOrderByID/${rID}`);
        return {
            ok: true,
            data: response
        };
    } catch (error) {
        return {
            ok: false, err: error.response.data.status
        };
    }
}

export const lastAddedOrder = async () => {

    const response = await axios.get(`${HOST}/order/lastAddedOrder`);
    console.log("dataa", response);
    try {
        return {
            ok: true,
            data: response.data[0]
        }
    } catch (error) {
        return {
            ok: false, err: error.response.data.status
        }
    }

};

