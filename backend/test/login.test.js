require('dotenv').config();
const app = require('../app');
const mockserver = require('supertest');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require ('mongodb-memory-server');
const User = require('../model/user');
const { startDB, stopDb, deleteAll } = require('./util/inMemoryDB');
const {setupGoogleSuccessResponse, setupGoogleErrorResponse} = require('./util/httpMock')

describe('/api/user/login POST tests', () => {

    let connection;
    let server;
    let client;

    beforeAll(async() => {
        [server, connection] = await startDB(); // Ez ugyanaz mint az alatta lévő 3 sor.
        // const result = await startDB();
        // server = result[0];
        // connection = result[1];
        client = mockserver.agent(app);
    });

    afterEach(async() => {
        await deleteAll(User);
    });

    afterAll(async() => {
        await stopDb(server, connection);
    });

    
    test('should return 400 without body)', async () => {
        // given
 
        // when
        const response = await client.post('/api/user/login').send({});
        
        //then
        expect(response.status).toBe(400);
        // const responseData = response.body;
        // expect(responseData.user.dashboards).toStrictEqual([]);
    });

    test('should return 400 without provider)', async () => {
        // given
        const code = "random"
        // when
        const response = await client.post('/api/user/login').send({
            code
        });
        
        //then
        expect(response.status).toBe(400);
        // const responseData = response.body;
        // expect(responseData.user.dashboards).toStrictEqual([]);
    });

    test('should return 400 without code)', async () => {
        // given
        const provider = "github";
 
        // when
        const response = await client.post('/api/user/login').send({
            provider
        });

        //then
        expect(response.status).toBe(400);
        // const responseData = response.body;
        // expect(responseData.user.dashboards).toStrictEqual([]);
    });

    test('should return 400 with invalid provider (user not created))', async () => {
        // given
        const code = "random";
        const provider = "facse";
 
        // when
        const response = await client.post('/api/user/login').send({
            code,
            provider
        });
        
        //then
        expect(response.status).toBe(400);
        // const responseData = response.body;
        // expect(responseData.user.dashboards).toStrictEqual([]);
    });


    test('should return 200 with JWT with valid provider (user not created)', async () => {
        // given
        const code = "random";
        const provider = "google";
        const googleUserId = 'hd2o3r98zhfoihoi3h8g'
 
        setupGoogleSuccessResponse(googleUserId);

        // when
        const response = await client.post('/api/user/login').send({
            code,
            provider
        });
        
        //then
        expect(response.status).toBe(200);
        const responseToken = jwt.decode(response.body.sessionToken);
        expect(responseToken.providers.google).toBe(googleUserId);
        const users = await User.find();
        expect(users).toStrictEqual([]);
        // const responseData = response.body;
        // expect(responseData.user.dashboards).toStrictEqual([]);
    });

    test('should return 401 with invalid code (user not created)', async () => {
        // given
        const code = "random";
        const provider = "google";
 
        setupGoogleErrorResponse();

        // when
        const response = await client.post('/api/user/login').send({
            code,
            provider
        });
        
        //then
        expect(response.status).toBe(401);
        expect(response.body).toStrictEqual({});
        const users = await User.find();
        expect(users).toStrictEqual([]);
        // const responseData = response.body;
        // expect(responseData.user.dashboards).toStrictEqual([]);
    });

    // test('deleted user receives null', async () => {
    //     // given
    //     const newUser = new User({
    //         username: 'Cirmi',
    //     });
    //     await newUser.save();

    //     const token = jwt.sign({userId: newUser._id}, process.env.JWT_SECRET);
    //     client.set('authorization', token);
    //     await User.deleteMany();
    
    //     // when
    //     const response = await client.get('/api/dashboards');
        
    //     //then
    //     expect(response.status).toBe(200);
    //     const responseData = response.body;
    //     expect(responseData.user).toBeNull();
    // });

}) 
