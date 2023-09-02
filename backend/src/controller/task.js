const taskModel=require("../model/todotask")

const createTask=async (req,res)=>{
    let data=req.body
    console.log(data);
    const taskData=await taskModel.create(data)
    return res.status(201).send({status:true,message:taskData})
}

const getTask=async (req,res)=>{

    const taskData=await taskModel.find()
    return res.status(201).send({status:true,message:taskData})
}


const delTask=async (req,res)=>{
try {
    let id=req.body.id
    console.log(id);
        const taskData=await taskModel.findByIdAndDelete(id)
        return res.status(201).send({status:true,message:taskData})
} catch (error) {
    return res.status(500).send({status:false,message:error.message})
}
}


const UpdateTask=async (req,res)=>{
    try {
       
        let data=req.body
        const {id,title,task}=data
            const taskData=await taskModel.findByIdAndUpdate(id,{$set:{status:"done"}})
            return res.status(201).send({status:true,message:taskData})
    } catch (error) { 
        return res.status(500).send({status:false,message:error.message})
    }
    }
    
    const UpdateIt=async (req,res)=>{
        try {
            
            let data=req.body
            console.log(data);
            const {id,title,task}=data
                const taskData=await taskModel.findByIdAndUpdate(id,{$set:{title:title,task:task}})
                return res.status(201).send({status:true,message:taskData})
        } catch (error) {
            return res.status(500).send({status:false,message:error.message})
        }
        }


module.exports={createTask,getTask,delTask,UpdateTask,UpdateIt} 