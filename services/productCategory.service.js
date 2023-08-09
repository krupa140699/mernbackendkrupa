const Product = require("../model/Product");
const ProductCategory = require("../model/ProductCategory");


exports.addCategory = async function (data) {

    try {
        let productCategory = new ProductCategory(data);
        let result = await productCategory.save();
        return result;
    } catch (error) {
        throw error;
    }
}


exports.productCategoryList = async function () {

    try {
        var aggregate = ProductCategory.aggregate([
            {
                $project: {
                    _id: 1,
                    category: 1
                },
            },
        ]);
        return aggregate;
    } catch (error) {
        throw error;
    }
}


exports.productWithCategoryList = async function () {

    try {
        var aggregate = ProductCategory.aggregate([
            {
                $lookup: {
                    from: 'products',
                    localField: '_id',
                    foreignField: 'category',
                    as: 'categories'
                },

            },
        ]);
        return aggregate;
    } catch (error) {
        throw error;
    }
}


exports.deleteCategoryProduct = async function (id) {

    try {
        const result = await ProductCategory.deleteOne({ _id: id });
        return result;
    } catch (error) {
        throw error;
    }
}