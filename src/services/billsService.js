import axios from "axios";

const HOST = "http://localhost:4000";


//for creating of a Receipt for a payment
export const createReceiptService = async (receiptPayload) => {
    console.log(receiptPayload, "<<<<<<<<<<<<<<<<<<<<<<<<");
    try {
        await axios.post(`${HOST}/receipt/addReceipt`, receiptPayload);
        return {
            ok: true,
        };
    } catch (error) {
        return {
            ok: false, err: error.response.data.status
        };
    }
};


//for viewing all the bills available 
export const getAllReceipts = async () => {
    console.log("data",);
    try {
        const response = await axios.get(`${HOST}/receipt/displayReceipts`);
        console.log(response, "res");
        return {
            ok: true,
            data: response.data,
        };
    } catch (error) {
        return {
            ok: false,
        };
    }
};