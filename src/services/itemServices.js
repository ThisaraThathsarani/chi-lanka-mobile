import axios from "axios";

const HOST = "http://10.0.2.2:4000";


export const addNewItem = async (itemPayload) => {
    try {
        const response = await axios.post(`${HOST}/item/addItem`, itemPayload);
        console.log("dataaaaaaaa", response)
        return {
            ok: true
        }
    } catch (error) {
        return {
            ok: false, err: error.response.data.error
        }

    }
}

//for retrieving items for supplier1
export const getItemDetails = async (itemCode) => {
    console.log("data",);
    try {
        const response = await axios.get(`${HOST}/item/getItemByID/${itemCode}`);
        console.log(response, "res");
        return {
            ok: true,
            data: response.data,
        };
    } catch (error) {
        return {
            ok: false, err: error.response.data.status
        };
    }
};

//for retrieving available list of items
export const getItemsList = async () => {
    console.log("data",);
    try {
        const response = await axios.get(`${HOST}/item/displayAvailableItems`);
        console.log(response, "res");
        return {
            ok: true,
            data: response.data
        };
    } catch (error) {
        return {
            ok: false, err: error.response.data.status
        };
    }
};

export const updateItemDetails = async (itemId, updateItemPayload) => {
    console.log("dataa", updateItemPayload);
    await axios.put(`${HOST}/item/updateItem/${itemId}`, updateItemPayload);
    try {
        return {
            ok: true,
        }

    } catch (error) {
        return {
            ok: false, err: error.response.data.status
        }
    }

};

export const deleteItemPermenantly = async (itemId) => {
    console.log("dataa", itemId);
    await axios.delete(`${HOST}/item/removeItem/${itemId}`);
    try {
        return {
            ok: true,
        }
    } catch (error) {
        return {
            ok: false, err: error.response.data.status
        }
    }

};

export const lastAddedItem = async () => {

    const response = await axios.get(`${HOST}/item/lastAddedItem`);
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