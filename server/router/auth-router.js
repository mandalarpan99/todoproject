const express = require('express');
const router = express.Router();
const Authcontroller = require('../controllers/auth-controller');
const {signup, loginSchema} = require("../validators/auth-validator");
const validate = require("../middlewares/validate-middleware");
const {postdata} = require("../validators/post-validate");
const authMiddleware = require("../middlewares/user-middleware");
const viewPostmiddleware = require("../middlewares/viewpost-middleware");



router.route('/register').post(validate(signup),Authcontroller.register);
router.route('/').post(validate(loginSchema),Authcontroller.login);
router.route('/user').get(authMiddleware, Authcontroller.user);
router.route('/userpost').post(validate(postdata) ,Authcontroller.userPost);
router.route('/viewuserpost').post(authMiddleware, viewPostmiddleware, Authcontroller.viewuserPost);


module.exports = router;