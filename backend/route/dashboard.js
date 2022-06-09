const router = require('express').Router();
const auth = require('../middleware/auth');
const User = require('../model/user');

router.get('/', auth({ block: true }), async (req, res) => {
    const user = await User.findById(res.locals.user.userId);

    res.json({ user });
    //find user with userId from req.locals.userId
    //return user or user.dashboards

    //send all dashboards for user
});

// router.get('/:id', async (req, res) => {
//     //send :id dashboard for user
// });

// router.get('/:id/todos', async (req, res) => {
//     //send :id dashboard for user
// });

router.get('/:id/todos/:todoId', async (req, res) => {
    //send :todoId todo from :id dashboard for user
});

router.post('/', async (req, res) => {
    //create dashboard for a user, send created :id
});

router.post('/:id/todos', async (req, res) => {
    //create todo in :id dashboard for a user, send created :todoId
});

router.patch('/:id', async (req, res) => {
    //update existing dashboard
});

router.patch('/:id/todos/todoId', async (req, res) => {
    //update existing todo in :id dashboard
});

router.delete('/:id', async (req, res) => {
    //delete dashboard completely
});

router.delete('/:id/todos/:todoId', async (req, res) => {
    //delete existing :todoId todo in :id dashboard
});

module.exports = router;