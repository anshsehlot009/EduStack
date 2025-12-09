 const {Router}= require ("express");
 const adminRoutes= Router();
 const jwt = require("jsonwebtoken");
 const {adminModel, courseModel}=require("../db")
const {JWT_ADMIN_PASSWORD}= require("../config");
const { adminMiddleWare } = require("../middlewares/admin");
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
adminRoutes.post("/course", adminMiddleWare, async function (req, res)  {
const adminId= req.userId;
const{ title , description,imageURL,price}= req.body;
const course= await courseModel.create({
    title:title,
    description:description,
    imageURL:imageURL,
    price:price,
    Creater_id: adminId
})
res.json({
    message:"course created",
    courseId: course._id
})
});
adminRoutes.put("/course",  async function (req, res)  {
    const adminId= req.userId;
const{ title , description,imageURL,price,courseId}= req.body;

const course= await courseModel.updateOne({
_id: courseId,
Creater_id: adminId
},
    {
    title:title,
    description:description,
    imageURL:imageURL,
    price:price,
})
res.json({
    message:"course updated ",
    courseId: course._id
})
});
adminRoutes.get("/course/bulk", adminMiddleWare, async function (req, res)  {
    const adminId= req.userId;
    const courses= await courseModel.find({
   Creater_id:adminId
    })
    res.json({
        message:"course updated ",
        courses
    })
    });
module.exports={
    adminRoutes:adminRoutes
}