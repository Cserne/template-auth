const app = require('../app');
const mockserver = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require ('mongodb-memory-server');
const User = require('../model/user');
const { startDB, stopDb, deleteAll } = require('./util/inMemoryDB');

describe('/api/dashboard get tests', () => {

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

    test('test user gets empty list', async () => {
        // given
        const newUser = new User({ username: 'Cirmi', googleID: '123456' });
        await newUser.save();
        client.set('authorization', newUser._id);
    
        // when
        const response = await client.get('/api/dashboards');
        
        //then
        expect(response.status).toBe(200);
        const responseData = response.body;
        expect(responseData.user.dashboards).toStrictEqual([]);
    });

    test('deleted user receives null', async () => {
        // given
        const newUser = new User({ username: 'Cirmi', googleID: '123456' });
        await newUser.save();
        client.set('authorization', newUser._id);

        await User.deleteMany();
    
        // when
        const response = await client.get('/api/dashboards');
        
        //then
        expect(response.status).toBe(200);
        const responseData = response.body;
        expect(responseData.user).toBeNull();
    });

}) 
