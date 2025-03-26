const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app= express()
 app.use(cors())
 app.use(express.json())

 const PORT= process.env.PORT || 5000

//Schema
const SchemaData =mongoose.Schema({
    name:String,
    age:String,
    emailId:String,
    phoneNumber:String
},{
    timeStamps: true
})


const  usermodual=mongoose.model("user",SchemaData)

//read

 app.get("/read",async(req,res)=>{
    const data=await usermodual.find({})
    res.json({success: true,data:data})
 })

//create
   app.post("/create",async(req,res)=>{
    console.log(req.body)
    const data = new usermodual(req.body)
    await data.save()

    res.send({success:true, message:"data is successfully",data: data})
   })


//update data
app.put("/update/:id", async(req,res)=>{
    console.log(req.body)
    const {_id,...rest}=req.body

    console.log(rest)
    const data = await usermodual.updateOne({_id:_id },rest )
    res.send({success:true, message:"data update successfully",data:data})
})


//Delete data
app.delete("/delete/:id",async(req,res)=>{
     const id = req.params.id
     console.log(id)
     const data = await usermodual.deleteOne({_id:id})
     res.send({success:true, message:"data delete successfully",data:data})

})

 mongoose.connect("mongodb://127.0.0.1:27017/crud")
 
 .then(()=>{
    console.log("connet to DB")
    app.listen(PORT,()=>console.log('server is running 5000'))
    
    
 })
 .catch((err)=>console.log(err))

