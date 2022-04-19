const router = required('express').Router();
const productSchema = required("../models/product.model");
const {authSchema} = require("../product/joischema")

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

//update product details
router.get("/updateTheProduct", authVerify, async(req,res)=>{
    try{
        let condition = {"uuid": req.body.uuid}
        letupdateData = req.body.updateData;
        let optrion ={new: true}
        const data = await productSchema.findOneAndUpdate(condition, updateData, option).exec();
            return res.status(200).json({'status': 'success', message: "Product details fetched successfully", 'result': productDetails});
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
});

//aggregate 
router.get("/userBasedProduct", async(req,res)=>{
    try{
        let productDetails = await caregorySchema.aggregate([
            {
                $match:{
                    $or:[
                        {"uuid": req.query,category_uuid},
                        {"useruuid": req.query,userUuid}
                    ]

                }
            },
            {
                '$lookup':{
                    from:'products',
                    localfield: 'uuid',
                    foreignField: 'categoryUuid',
                    as: 'product_details'
                }
            },
            {
                '$lookup':{
                    from: 'user',
                    localField: 'userUuid',
                    ForeignField: 'uuid',
                    as: 'user_data'
                }
            },
            {
                '$Unwind':{
                    path:'$product_details',
                    preserveNullAndEmptyArray: true
                }
            },
            {
                '$Unwind':{
                    path:'$user_data',
                    preserveNullAndEmptyArray: true
                }
            },
            {
                $project:{
                    "id": 0,
                    "CategoryName": 1,
                    "productDetails.productName": 1,
                    "user_data.username": 1
                }
            },
            {
                $sort:{categoryName: -1}
            },
            {
                $skip: parseInt(req.query,skip),
            },
            {
                $limit: parseInt(req.query,limit)
            }
        ])

        if(productDetails.length > 0){
            return res.status(200).json({'status': 'success', message: "product details fetched successfully", 'result': productDetails});
        }else{
            return res.status(404).json({'status': 'failure', message: "No product detail available"})
        }
    } catch(error){
         console.log(error.message);
         return res.status(400).json({"status": 'failure', 'message': error.message})
    }
});

module.export = router;