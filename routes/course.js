const { Router } = require("express");
const courseRouter = Router();

courseRouter.post("/preview/purchase", function(req, res) {
    res.json({
        message: "courses purchased endpoint"
    })
})

courseRouter.get("/preview", function(req, res) {
    res.json({
        message: "course endpoint"
    })
})

module.exports = {
    courseRoutes: courseRouter  
}