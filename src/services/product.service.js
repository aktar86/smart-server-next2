const { ObjectId } = require("mongodb");
const client = require("../config/db");

const productCollection = client.db(process.env.MYDB).collection("products");

exports.createProduct = async (data) => {
  return await productCollection.insertOne(data);
};

exports.getAllProducts = async (query) => {
  return await productCollection.find(query).toArray();
};

exports.getSingleProduct = async (id) => {
  const query = { _id: new ObjectId(id) };
  return await productCollection.findOne(query);
};

exports.updateProduct = async (id, data) => {
  return await productCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...data, updatedAt: new Date() } },
  );
};

exports.deleteProduct = async (id) => {
  return await productCollection.deleteOne({ _id: new ObjectId(id) });
};
