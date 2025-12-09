 const {Router}= require ("express");
 const adminRoutes= Router();
 const jwt = require("jsonwebtoken");
const JWT_ADMIN_PASSWORD ="123456tgfvbhjkl,";

 const {adminModel}=require("../db")

 // bycrypt , zod , jwt


 adminRoutes.post("/signup", async function(req, res)  {
    try {
        const {email, password, firstname, lastname} = req.body;
        
        // Add basic validation
        if (!email || !password || !firstname || !lastname) {
            return res.status(400).json({ 
                message: "All fields are required" 
            });
        }
        
        await adminModel.create({
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
adminRoutes.post("/adminsignin",async function (req, res)  {
try{
    const{email, password} = req.body;

    const admin = await adminModel.findOne({ email, password });

    if (!admin) {
        return res.status(403).json({
            message: "Incorrect Credentials"
        });
    }

    
    const token = jwt.sign(
        { id: admin._id },
        JWT_ADMIN_PASSWORD
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
   

adminRoutes.post("/createcourse", function (req, res)  {
    res.json({ message: "createcourse  endpoint" });
});
adminRoutes.put("/course", function (req, res)  {
    res.json({ message: "delete course  endpoint" });
});
adminRoutes.post("/addcourse", function (req, res)  {
    res.json({ message: "add course  endpoint" });
});


module.exports={
    adminRoutes:adminRoutes
}