 const {Router}= require ("express");
 const adminRoutes= Router();
 const {adminModel}=require("../db")

 adminRoutes.post("/adminLogin ", function(req, res)  {
    res.json({ message: "adminLogin endpoint" });
});

adminRoutes.post("/admin signin",function (req, res)  {
    res.json({ message: "admin signin endpoint" });
});

adminRoutes.post("/createcourse", function (req, res)  {
    res.json({ message: "createcourse  endpoint" });
});
adminRoutes.post("/deletecourse", function (req, res)  {
    res.json({ message: "delete course  endpoint" });
});
adminRoutes.post("/addcourse", function (req, res)  {
    res.json({ message: "add course  endpoint" });
});


module.exports={
    adminRoutes:adminRoutes
}