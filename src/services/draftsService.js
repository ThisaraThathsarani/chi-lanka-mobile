//to retrieve all requisition records
import axios from "axios";

const HOST = "http://10.0.2.2:4000";

//to retrive all drafts
export const getAllDrafts = async () => {
    try {
        const response = await axios.get(`${HOST}/draft/displayDraft`);
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

//to add a draft
export const addNewDraft = async (payload) => {
    console.log("data for draft", payload)
    try {
        await axios.post(`${HOST}/draft/addDraft`, payload)
        return {
            ok: true
        }
    } catch (error) {
        return {
            ok: false
        }
    }
}

//to update a draft

export const updateDraft = async (draftID, payload) => {
    try {
        await axios.put(`${HOST}/draft/updateDraft/${draftID}`, payload);
        return {
            ok: true,
        };
    } catch (error) {
        return {
            ok: false, err: error.response.data.status
        };
    }

}

export const getDraftDetail = async (draftID) => {
    console.log("data",);
    try {
        const response = await axios.get(`${HOST}/draft/getDraftByID/${draftID}`);
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

export const deleteDraftPermenantly = async (draftid) => {
    await axios.delete(`${HOST}/draft/deleteDraft/${draftid}`);
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