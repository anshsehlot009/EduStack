const express=require("express");
const mongoose= require("mongoose");
 const app = express();


const{ userRoutes}= require("./routes/user");
const{ courseRoutes}= require("./routes/course"); 
const {adminRoutes}=require ("./routes/admin")
app.use(express.json());

   app.use("/v1/user",userRoutes); 
   app.use("/v1/course",courseRoutes);
   app.use("/v1/admin",adminRoutes)

   async function main() {
    await mongoose.connect("mongodb+srv://anshsehlot01:J0nZt4kwOji4GwC9@cluster0.tcq2fcq.mongodb.net/coursera-app");
    app.listen(3000);   
    console.log("listening on the port");
    
   }
   main()


   