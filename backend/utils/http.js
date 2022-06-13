const axios = require('axios');

const http = () => {
    const instance = axios.create({
        baseURL: "",
        timeout: 3000,
      });

    const post = async(...params) => {
        try {
            const response = await instance.post(...params);
            console.log("BODY:", response.body);
            return response;
        } catch (error) {
            console.log(error.response.status);
            console.log(error.response.data);
            return error.response;
        }
    }

    const get = async(...params) => {
        try {
            const response = await instance.get(...params);
            return response;
        } catch (error) {
            console.log(error.response.status);
            console.log(error.response.data);
            return error.response;
        }
    }
    return { post, get, _instance: instance }
}

module.exports = http();