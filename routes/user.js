const { Router } = require("express");
const {userModel} = require("../db")
const jwt = require("jsonwebtoken");
const JWT_USER_PASSWORD ="zsdfrtyuytr567u8i";


const userRouter = Router();

userRouter.post("/signup", async function(req, res) {
    try {
        const {email, password, firstname, lastname} = req.body;
        
        // Add basic validation
        if (!email || !password || !firstname || !lastname) {
            return res.status(400).json({ 
                message: "All fields are required" 
            });
        }
        
        await userModel.create({
            email: email,
            password: password,
            firstname: firstname,
            lastname: lastname
        });

        res.json({ message: "signup succeeded" });
    } catch(error) {
        // Handle duplicate email error
        if (error.code === 11000) {
            return res.status(409).json({ 
                message: "Email already exists" 
            });
        }
        res.status(500).json({ 
            message: "Signup failed", 
            error: error.message 
        });
    }
});

userRouter.post("/signin", async function (req, res) {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email, password });

        if (!user) {
            return res.status(403).json({
                message: "Incorrect Credentials"
            });
        }

        // FIX: Use user._id
        const token = jwt.sign(
            { id: user._id },
            JWT_USER_PASSWORD
        );

        res.json({
            token: token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});


userRouter.get("/purchases", (req, res) => {
    res.json({ message: "purchases endpoint" });
});

module.exports = {
    userRoutes: userRouter  
};