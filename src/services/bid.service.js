const client = require("../config/db");

const COLLECTION = Object.freeze({
  BIDS: "bids",
});

const bidsCollection = client.db(process.env.MYDB).collection(COLLECTION.BIDS);

exports.postBids = async (data) => {
  const result = await bidsCollection.insertOne(data);

  return {
    insertedId: result.insertedId,
    data: data,
  };
};

exports.getAllBids = async () => {
  return await bidsCollection.find().toArray();
};

// existingBid
exports.getExistingBid = async (query) => {
  const result = await bidsCollection.findOne(query);

  return result;
};

// getbids
exports.getBids = async (query) => {
  const result = await bidsCollection.find(query).toArray();
  return result;
};

// get my bids
exports.getMyBids = async (query) => {
  return await bidsCollection.find(query).toArray();
};

exports.deleteBid = async (query) => {
  const result = await bidsCollection.deleteOne(query);
  return result;
};
