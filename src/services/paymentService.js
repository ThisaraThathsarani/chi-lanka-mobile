import axios from "axios";

const HOST = "http://10.0.2.2:4000";


//for creating of a payment
export const createPayment = async (paymentPayload) => {
    console.log(paymentPayload, "<<<<<<<<<<<<<<<<<<<<<<<<");
    try {
        await axios.post(`${HOST}/payment/createPayment`, paymentPayload);
        return {
            ok: true,
        };
    } catch (error) {
        return {
            ok: false, err: error.response.data.status
        };
    }
};


//to vsearch for a specific payment
export const searchAPayment = async (oID) => {
    try {
        const response = await axios.get(`${HOST}/payment/searchAnPayment/${oID}`);
        return {
            ok: true,
        };
    } catch (error) {
        return {
            ok: false, err: error.response.data.status
        };
    }
}

//to update the status of the purchase order  items list
export const updateOrderItemsList = async (oID, paymentPayload) => {
    try {
        const response = await axios.put(`${HOST}/payment/updatePayment/${oID}`, paymentPayload);
        return {
            ok: true,
        };
    } catch (error) {
        return {
            ok: false, err: error.response.data.status
        };
    }
}

//to delete a payment created on an order
export const deletePayment = async (oID) => {
    try {
        const response = await axios.delete(`${HOST}/payment/removePayment/${oID}`);
        return {
            ok: true,
        };
    } catch (error) {
        return {
            ok: false, err: error.response.data.status
        };
    }
}