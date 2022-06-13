const { _instance } = require("../../utils/http");
const MockAdapter = require("axios-mock-adapter");
const jwt = require('jsonwebtoken');

const mock = new MockAdapter(_instance);

const setupGoogleSuccessResponse = (sub) => {
    const token = jwt.sign({sub}, 'secret')
    mock
    .onPost("https://oauth2.googleapis.com/token")
    .replyOnce(200, {id_token: token})
}

const setupGoogleErrorResponse = () => {
    mock
    .onPost("https://oauth2.googleapis.com/token")
    .replyOnce(401)
}

module.exports = { setupGoogleSuccessResponse, setupGoogleErrorResponse };