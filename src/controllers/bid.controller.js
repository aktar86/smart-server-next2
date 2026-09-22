const { ObjectId } = require("mongodb");
const bidService = require("../services/bid.service");

exports.postBids = async (req, res) => {
  try {
    const newBid = req.body;
    newBid.status = "pending";

    if (!newBid || Object.keys(newBid).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Bid data is required",
      });
    }

    const result = await bidService.postBids(newBid);
    return res.status(201).json({
      success: true,
      message: "Bids posted successfully",
      data: result,
    });
  } catch (err) {
    console.error("post bids error:", err.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.getAllBids = async (req, res) => {
  const result = await bidService.getAllBids();
  res.send({
    success: true,
    message: "Bids retrive successfully",
    data: result,
  });
};

// existingBid
exports.getExistingBid = async (req, res) => {
  const { productId, buyerEmail } = req.query;

  const query = {
    product_id: productId,
    buyer_email: buyerEmail,
  };

  const result = await bidService.getExistingBid(query);

  res.send(result);
};

exports.getBids = async (req, res) => {
  const { productId } = req.params;

  const query = {
    product_id: productId,
  };

  const result = await bidService.getBids(query);

  res.send({
    success: true,
    message: "Data retrieved successfully",
    data: result,
  });
};

exports.deleteBid = async (req, res) => {
  try {
    const { bidId } = req.query;

    if (!bidId) {
      return res.status(400).send({
        success: false,
        message: "bidId and buyerEmail are required",
      });
    }

    const query = {
      _id: new ObjectId(bidId),
      buyer_email: req.token_email,
    };

    console.log("Delete query:", query);

    const result = await bidService.deleteBid(query);

    console.log("Delete result:", result);

    if (result.deletedCount === 0) {
      return res.status(404).send({
        success: false,
        message: "Bid not found or you are not the owner of this bid",
      });
    }

    res.send({
      success: true,
      message: "Bid rejected successfully",
      data: result,
    });
  } catch (error) {
    console.error("Delete bid error:", error);

    res.status(500).send({
      success: false,
      message: "Failed to delete bid",
    });
  }
};

//get my bids
exports.getMyBids = async (req, res) => {
  const { email } = req.query;

  const query = {};
  if (email) {
    if (email !== req.token_email) {
      return res.status(403).send({
        success: false,
        message: "forbidden Access",
      });
    }
    query.buyer_email = email;
  }

  const result = await bidService.getMyBids(query);

  res.send({
    success: true,
    message: "Bids retrive Successfully",
    data: result,
  });
};
