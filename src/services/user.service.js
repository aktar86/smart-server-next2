const client = require("../config/db");

const COLLECTION = {
  USERS: "users",
};

const usersCollection = client
  .db(process.env.MYDB)
  .collection(COLLECTION.USERS);

exports.postUser = async (data) => {
  const result = await usersCollection.insertOne(data);

  return {
    insertedId: result.insertedId,
    data: data,
  };
};

exports.getUser = async () => {
  const result = await usersCollection.find().toArray();

  return result;
};
