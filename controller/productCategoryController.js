const ProductCategory = require("../model/ProductCategory");
const ProductCategoryService = require("../services/productCategory.service");
const { Validator } = require("node-input-validator");

module.exports.addProductCategory = async function (req, res, next) {
    try {
      var message = "Product category added sucessfully.";
      const v = new Validator(req.body, {
        category: "required",
      });
  
      const matched = await v.check();
      if (!matched) {
        return res.status(404).send(v.errors);
      }
      let data = await  ProductCategory.findOne({category:req.body.category})
      if (data) {
        return res.status(406).json({
          success: false,
          data: [],
          message: "Category already exists",
        })
      } else {
        await ProductCategoryService.addCategory(req.body);
        return res.status(200).json({
          success: true,
          data: [],
          message: message,
        });
      }
    } catch (error) {
      console.log("Error in product add", error);
      return res.status(404).json({
        success: false,
        data: [],
        message: "Something went to wrong.",
      });
    }
  };
  
  
  module.exports.listProductCategory = async function (req, res, next) {
    try {
      const productCategoryList = await ProductCategoryService.productCategoryList();
      if (productCategoryList) {
        return res.status(200).json({
          success: true,
          data: productCategoryList,
          message: "Data retrived successfully.",
        });
      } else {
        return res.status(404).json({
          success: false,
          data: [],
          message: "Something went to wrong.",
        });
      }
    } catch (error) {
      return res.status(404).json({
        success: false,
        data: [],
        message: "Something went to wrong.",
      });
    }
  };
  
  
  module.exports.listproductWithCategory= async function (req, res, next) {
    try {
      const productWithCategoryList = await ProductCategoryService.productWithCategoryList();
      if (productWithCategoryList) {
        return res.status(200).json({
          success: true,
          data: productWithCategoryList,
          message: "Data retrived successfully.",
        });
      } else {
        return res.status(404).json({
          success: false,
          data: [],
          message: "Something went to wrong.",
        });
      }
    } catch (error) {
      return res.status(404).json({
        success: false,
        data: [],
        message: "Something went to wrong.",
      });
    }
  };
  

  module.exports.deleteProductCategory = async function (req, res, next) {
    try {
      if (req.params.id === undefined || req.params.id === '') {
        return res.status(404).json({
          success: false,
          data: [],
          message: "Product category Id is required.",
        });
      }
  
      const deletedData = await ProductCategoryService.deleteCategoryProduct(req.params.id);
      if (deletedData) {
        return res.status(200).json({
          success: true,
          data: [],
          message: "Product category deleted successfully.",
        });
      } else {
        return res.status(404).json({
          success: false,
          data: [],
          message: "Something went to wrong.",
        });
      }
    } catch (error) {
      return res.status(404).json({
        success: false,
        data: [],
        message: "Something went to wrong.",
      });
    }
  };
  