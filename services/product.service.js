const Product = require("../model/Product");
const ProductCategory = require("../model/ProductCategory");

exports.add = async function (data) {

    try {
        let product = new Product(data);
        let result = await product.save();
        return result;
    } catch (error) {
        throw error;
    }
}


exports.list = async function () {

    try {
        var aggregate = Product.aggregate([
            {
                $project: {
                    _id: 1,
                    name: 1,
                    price: 1,
                    category: 1,
                    userId: 1,
                    company: 1,
                },
            },
        ]);
        return aggregate;
    } catch (error) {
        throw error;
    }
}

exports.delete = async function (id) {

    try {
        const result = await Product.deleteOne({ _id: id });
        return result;
    } catch (error) {
        throw error;
    }
}


exports.editDataFromId = async function (id) {

    try {
        const result = await Product.findOne({ _id: id });
        return result;
    } catch (error) {
        throw error;
    }
}


exports.edit = async function (data) {

    try {
        let result = await Product.updateOne({
            _id: data.params.id
        }, {
            $set: data.body
        });
        return result;
    } catch (error) {
        throw error;
    }
}


exports.search = async function (key) {

    try {
        let result = await Product.find({
            '$or': [
                { name: { $regex: key } },
                { company: { $regex: key } },
                { category: { $regex: key } },
                { price: { $regex: key } }
            ]
        })
        return result;
    } catch (error) {
        throw error;
    }
}


