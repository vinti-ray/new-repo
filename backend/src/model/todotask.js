const mongoose=require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId;
const taskSchema=new mongoose.Schema({
    title:{
        type:String,
        require:true
    },

    task:{
        type:String,
        require:true
    },
    status:{
        type:String,
        require:true,
        default:"pending"
    },



},{timestamps:true})
module.exports=mongoose.model("taskSchema",taskSchema)