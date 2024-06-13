const express = require('express');
const router = express.Router();
const Authcontroller = require('../controllers/auth-controller');
const {signup, loginSchema} = require("../validators/auth-validator");
const validate = require("../middlewares/validate-middleware");
const {postdata} = require("../validators/post-validate");
const authMiddleware = require("../middlewares/user-middleware");
const upload = require("../middlewares/file-middleware");
const multer  = require('multer');

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './uploads')
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + '-' + file.originalname;
//       cb(null, file.fieldname + '-' + uniqueSuffix)
//     }
//   })
  
// const upload = multer({ storage });

router.route('/register').post(validate(signup),Authcontroller.register);
router.route('/').post(validate(loginSchema),Authcontroller.login);
router.route('/user').get(authMiddleware, Authcontroller.user);
router.route('/userpost').post(upload.single("file") ,Authcontroller.userPost);
router.route('/viewuserpost').get(authMiddleware, Authcontroller.viewuserPost);
router.route('/user/delete/:id').delete(authMiddleware, Authcontroller.deleteById);
router.route('/user/viewuserpost/:id').get(authMiddleware, Authcontroller.getPostById);
router.route('/user/viewuserpost/edit/:id').patch(authMiddleware, Authcontroller.editPostById);


module.exports = router;