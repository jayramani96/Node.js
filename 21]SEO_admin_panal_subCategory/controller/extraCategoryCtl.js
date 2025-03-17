const subCatSchema = require("../modal/subCategorySchema");
const extCategorySchema = require("../modal/extCategorySchema")

module.exports.addExtCategory = async (req,res)=>{
    await subCatSchema.find({}).then((data)=>{
        console.log(data);
        
        res.render("addExtCategory",{data})
    })
}

module.exports.addExtCategoryData = async(req,res)=>{
    await  extCategorySchema.create(req.body).then(()=>{
        res.redirect("/extraCategory/addExtCategory");
    })
}

module.exports.viewExtCategory = async(req,res)=>{
    await extCategorySchema.find({}).populate("categoryId").then(extCategory => {
        res.render("viewExtCategory", { extCategory });
    })
}