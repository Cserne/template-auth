const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: { type: String, required: true }, // empty string NONO!
    content: { type: String, required: true }, // empty string is enough
    isDone: { type: Boolean, default: false },
});

const dashboardSchema = new mongoose.Schema({
    title: { type: String, required: true }, // empty string NONO!
    todos: [todoSchema], // empty list is default?
});

const userSchema = new mongoose.Schema({
    username: { type: String }, // empty string NONO! !!!unique
    // googleID: { type: String, unique: true, required: true },
    // email: { type: String, unique: true, required: true }, // empty string NONO! + validation !!!unique
    providers: {
        google: {
            type: String,
            sparse:true,
            unique: true,
        },
        github: {
            type: String,
            sparse:true,
            unique: true,
        },
        // facebook: {
        //     type: String,
        //     unique: true,
        // }
    },
    // password: { type: String, required: true }, // empty string NONO! + validation
    dashboards: [dashboardSchema], // empty list is default?
});

const User = mongoose.model('user', userSchema);
module.exports = User;