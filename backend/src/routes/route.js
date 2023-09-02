
const express=require("express")
const router=express.Router()

const {createTask,getTask,delTask,UpdateTask,UpdateIt}=require("../controller/task")
router.post("/create",createTask)
router.get("/get",getTask)
router.post("/del",delTask)
router.post("/update",UpdateTask)
router.post("/upd",UpdateIt)
module.exports=router