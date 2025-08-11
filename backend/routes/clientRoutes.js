const express = require("express");
const router = express.Router();
const Client = require("../models/Client");
const multer = require("multer");
const path = require("path");


//multer setup
const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null,'uploads/');
    },
      filename:(req,file,cb) => {
        const uniqename = Date.now() + path.extname(file.originalname);
        cb(null,uniqename);
    },

});
const upload = multer({storage});






//insert

router.post("/", upload.single('image'),async(req,res)=>{
    try {
        const {name,sector,location,status} = req.body;
        const image = req.file ? req.file.filename: null;
        const client = new Client({name,sector,location,status,image});
        await client.save();
        res.status(201).json(client);
    }
    catch(err) {
        res.status(401).json({error:err.message});
    }
});
//view
router.get("/", async(req,res)=>{
    try {
        const clients = await Client.find();
        res.status(200).json(clients);
    }
    catch(err) {
        res.status(400).json({error:err.message});
    }
});
//SEARCH-NAME WISE
router.get('/search',async(req,res)=>{
    try {
        const {name } = req.query;
        if(!name) {
            return res.status(400).json({message:'name is requires'});
        }
        const clients = await  Client.find({
            name:{$regex: `^${name}`,$options:'i'}
        });
        res.status(200).json(clients);

    } catch(error) {
        res.status(400).json({message:error.message});
    }
})
//single view
router.get("/:id", async(req,res)=>{
    try {
        const client = await Client.findById(req.params.id);
        if(!client) return res.status(400).json({message:"client not found"});
        res.status(200).json(client);
    }
    catch(err) {
        res.status(400).json({error:err.message});
    }
});
//update
router.put("/:id",upload.single("image"), async(req,res)=>{
    try {
         const {name,sector,location,status} = req.body;
        const image = req.file ? req.file.filename: null;
        const updatedata = {name,sector,location,status};
        if(image) updatedata.image = image;
        const client = await Client.findByIdAndUpdate(req.params.id,updatedata,{new:true});
        if(!client) return res.status(400).json({message:"client not found"});
        res.status(200).json(client);
    }
    catch(err) {
        res.status(400).json({error:err.message});
    }
});
//delete
router.delete("/:id", async(req,res)=>{
    try {
        const client = await Client.findByIdAndDelete(req.params.id);
        if(!client) return res.status(400).json({message:"client not found"});
        res.json({message:"client deleted"});
    }
    catch(err) {
        res.status(400).json({error:err.message});
    }
});
module.exports = router;