const LedModel = require('../models/LedModel');
const axios = require('axios');

module.exports.getData = async (req,res) =>{
    let id = req.params.id;
    try{
        let dataquery = await LedModel.find({"led_id":id});
      
        res.json(dataquery[0]);
    }catch(err){
        res.json({status:false,data:err});
    }
}
module.exports.ping = async (req,res) =>{
    let id = req.params.id;
    try{
        let update = await LedModel.findOneAndUpdate({"led_id":id},{$set:{status:true}})
      
        res.json({status:true,message:"ping ok"});
    }catch(err){
        res.json({status:false,data:err});
    }
}
module.exports.getDataAll = async (req,res) =>{
    try{
        let dataquery = await LedModel.find({});
        let data = [];
        dataquery.map((item=>{
            data.push(item)
        }))
        res.json(data);
    }catch(err){
        res.json({status:false,data:err});
    }
}
module.exports.updateData = async (req,res) =>{
    try{
        let {program,data,led_id} = req.body;
      
        let dataFind = await LedModel.findOne({"led_id":led_id}) 
        console.log(led_id);
        dataFind.program = program;
        Object.keys(data).map((items)=>{
            dataFind.data[items]= data[items]
        })
        let update = await LedModel.findOneAndUpdate({"led_id":led_id},{$set:{program:dataFind.program,data:dataFind.data}})
        let dataFind2 = await LedModel.findOne({}) 
        res.json({status:true,data:dataFind2});
    }catch(err){
        res.json({status:false,data:err});
    }
}

module.exports.addLed = async (req,res) =>{
    try{
        let {led_id,location} = req.body;
        const newLed = new LedModel({led_id,location})
        await newLed.save();
        res.json({status:true,message:"Thêm ok"});
    }catch(err){
        res.json({status:false,data:err});
    }
}

