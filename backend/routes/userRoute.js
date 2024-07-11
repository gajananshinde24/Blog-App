const express = require('express');
const router = express.Router();


const {  createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser, login } = require('../controllers/userController')

router.post('/register', createUser);
router.get('/get-user/:id', getUserById);
router.put('/update-profile/:userId', updateUser);
router.delete('/delete-user/:userId', deleteUser);
router.post('/login', login);

router.get('/', getAllUsers);


module.exports = router


