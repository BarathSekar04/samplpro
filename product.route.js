const router = required('express').Router();
const productSchema = required("../models/product.model");

// add produst for admin
router.post('/addproduct', async(req,res)=>{
    try{
        const data = new productSchema(req.body);
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
        const.productdetails = await productSchema.find().exec();
        if(productdetails.length > 0){
            return res.status(200).json({'status': 'success', message: "Product details fetched successfully", 'result': productDetails});
        }else{
            return res.status(404).json({'status': 'failure', message: "no product details available"})
        }
    }catch(){
        console.log(error.message);
        return res.status(400).json{"status": 'failure', 'message': error.message})
    }
});

module.export = router;