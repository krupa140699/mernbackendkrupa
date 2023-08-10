const { Validator } = require("node-input-validator");
const ProductService = require("../services/product.service");

module.exports.addProduct = async function (req, res, next) {
  try {
    var message = "Product added sucessfully.";
    const v = new Validator(req.body, {
      name: "required",
      price: "required",
      category: "required",
      userId: "required",
      company: "required",
      selectedImages: "required"
    });

    const matched = await v.check();
    if (!matched) {
      return res.status(404).send(v.errors);
    }
    await ProductService.add(req.body);
    return res.status(200).json({
      success: true,
      data: [],
      message: message,
    });
  } catch (error) {
    console.log("Error in product add", error);
    return res.status(404).json({
      success: false,
      data: [],
      message: "Something went to wrong.",
    });
  }
};


module.exports.listProduct = async function (req, res, next) {
  try {
    const productList = await ProductService.list();
    if (productList) {
      return res.status(200).json({
        success: true,
        data: productList,
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


module.exports.deleteProduct = async function (req, res, next) {
  try {
    if (req.params.id === undefined || req.params.id === "") {
      return res.status(404).json({
        success: false,
        data: [],
        message: "Product Id is required.",
      });
    }

    const deletedData = await ProductService.delete(req.params.id);
    if (deletedData) {
      return res.status(200).json({
        success: true,
        data: [],
        message: "Product deleted successfully.",
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


module.exports.editDataProduct = async function (req, res, next) {
  try {
    const productList = await ProductService.editDataFromId(req.params.id);
    if (productList) {
      return res.status(200).json({
        success: true,
        data: productList,
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


module.exports.editDataChangeProduct = async function (req, res, next) {
  try {
    const v = new Validator(req.params, {
      id: "required"
    });

    const matched = await v.check();
    if (!matched) {
      res.status(404).json({ success: false, data: v.errors, message: 'Something went to wrong.' });
    }
    const productData = await ProductService.edit(req);
    if (productData) {
      return res.status(200).json({
        success: true,
        data: productData,
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



module.exports.searchProduct = async function (req, res, next) {
  try {
    const v = new Validator(req.params, {
      key: "required"
    });

    const matched = await v.check();
    if (!matched) {
      res.status(404).json({ success: false, data: v.errors, message: 'Something went to wrong.' });
    }
    const productDataList = await ProductService.search(req.params.key);
    if (productDataList) {
      return res.status(200).json({
        success: true,
        data: productDataList,
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







