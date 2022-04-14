const router = required('express').Router();
const productSchema = required("../models/product.model");

// add produst for admin
router.post('/addproduct', async(req,res)=>{
    try{
        let detail = req.boby
        const data = new productSchema(detail);
        const result = await data.save();
        return res.status(200).json({'status': 'success', "message": "Ptoduct details added successfully", "result"});
    }catch(error){
        console.log(error.message);
        return res.status(4000).json({"status": 'failure', 'message': error.message})
    }
})

//get all product api for user
router.get("/getAllProducts", async(req,res)=>{
    try{
        const productdetails = await productSchema.find().exec();
        if(productdetails.length > 0){
            return res.status(200).json({'status': 'success', message: "Product details fetched successfully", 'result': productDetails});
        }else{
            return res.status(404).json({'status': 'failure', message: "no product details available"})
        }
    }catch(error){
        console.log(error.message);
        return res.status(400).json({"status": 'failure', 'message': error.message})
    }
});

//get individual produt details
router.get("/getIndiviPro", async(req,res)=>{
    try{
        const productdetails = await productSchema.findOne({"uuid": req.query.product_uuid}).exec();
        if(productdetails){
            return res.status(200).json({'status': 'success', message: "Product details fetched successfully", 'result': productDetails});
        }else{
            return res.status(404).json({'status': 'failure', message: "no product details available"})
        }
    }catch(error){
        console.log(error.message);
        return res.status(400).json({"status": 'failure', 'message': error.message})
    }
});

//deletion of product
router.delete("/deleteIndviPro_uuid", async(req,res)=>{
    try {
        console.log(req.IndviPro_uuid)
        await productschema.findOneAndDelete({uuid: req.IndviPro_uuid}).exec();
        return res.status(200).json({'status': 'success', message: " desleted successfully"});
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({"status": 'failure', 'message': error.message})
    }
})

module.export = router;