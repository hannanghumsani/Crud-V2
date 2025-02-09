import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getAllUsers = async (perPage = 10, page = 1) => {
    try {
        return await axios.get(`${API_URL}/user`, { params: { perPage, page } });
    } catch (err) {
        console.error("Error fetching users:", err.response || err.message);
        return err.response;
    }
};

export const createUser = async (userData) => {
    try {
        return await axios.post(`${API_URL}/user/addUser`, userData);
    } catch (err) {
        console.error("Error creating user:", err.response || err.message);
        return err.response;
    }
};

export const createUsers = async (usersArray) => {
    try {
        return await axios.post(`${API_URL}/user/bulk`, usersArray);
    } catch (err) {
        console.error("Error creating multiple users:", err.response || err.message);
        return err.response;
    }
};

export const updateUser = async (userId, updatedData) => {
    try {
        return await axios.put(`${API_URL}/user/${userId}`, updatedData);
    } catch (err) {
        console.error("Error updating user:", err.response || err.message);
        return err.response;
    }
};

export const deleteUser = async (userId) => {
    try {
        return await axios.delete(`${API_URL}/user?userId=${userId}`,);
    } catch (err) {
        console.error("Error deleting user:", err.response || err.message);
        return err.response;
    }
};
