

const express = require("express");
const GetProductContoller = require("../controllers/getProduct.controller");
const ProductUpdateController = require("../controllers/productUpdateController");
const ProductDeleteController = require("../controllers/ProductDelete.controller");
const { ProductController } = require("../controllers/product.controller");
const router = express.Router();
const upload = require("../config/multer.config");
const UpdateStockController = require("../controllers/productUpdateController");
const FullProductUpdateController = require("../controllers/FullProductUpdateController");




router.post('/upload/product', upload.single("image"), ProductController)

router.get('/api/getProduct', GetProductContoller)

// product stock update controlller
router.put(
    "/update-Product/:id",
    upload.single("image"),
    FullProductUpdateController
);


router.patch("/update-Product/:id", UpdateStockController);

router.delete("/api/product/:id", ProductDeleteController)



module.exports = router;
















// const express = require('express');
// const router = express.Router();

// // নমুনা ডাটা
// let users = [
//     { id: 1, name: "Rahim", email: "rahim@example.com" },
//     { id: 2, name: "Karim", email: "karim@example.com" }
// ];

// // ১. GET - সব ইউজার পাওয়ার জন্য
// router.get('/', (req, res) => {
//     res.status(200).json({
//         success: true,
//         total: users.length,
//         data: users
//     });
// });

// // ২. POST - নতুন ইউজার তৈরি করার জন্য
// router.post('/', (req, res) => {
//     const { name, email } = req.body;

//     if (!name || !email) {
//         return res.status(400).json({
//             success: false,
//             message: "Name and Email are required!"
//         });
//     }

//     const newUser = {
//         id: users.length ? users[users.length - 1].id + 1 : 1,
//         name,
//         email
//     };

//     users.push(newUser);

//     res.status(201).json({
//         success: true,
//         message: "User created successfully!",
//         data: newUser
//     });
// });

// // ৩. PUT - নির্দিষ্ট ইউজার আপডেট করার জন্য
// router.put('/:id', (req, res) => {
//     const userId = parseInt(req.params.id);
//     const { name, email } = req.body;

//     const user = users.find(u => u.id === userId);

//     if (!user) {
//         return res.status(404).json({
//             success: false,
//             message: "User not found!"
//         });
//     }

//     if (name) user.name = name;
//     if (email) user.email = email;

//     res.status(200).json({
//         success: true,
//         message: "User updated successfully!",
//         data: user
//     });
// });

// // ৪. DELETE - নির্দিষ্ট ইউজার মুছে ফেলার জন্য
// router.delete('/:id', (req, res) => {
//     const userId = parseInt(req.params.id);
//     const userIndex = users.findIndex(u => u.id === userId);

//     if (userIndex === -1) {
//         return res.status(404).json({
//             success: false,
//             message: "User not found!"
//         });
//     }

//     const deletedUser = users.splice(userIndex, 1);

//     res.status(200).json({
//         success: true,
//         message: "User deleted successfully!",
//         data: deletedUser[0]
//     });
// });

// // রাউটার এক্সপোর্ট করা
// module.exports = router;