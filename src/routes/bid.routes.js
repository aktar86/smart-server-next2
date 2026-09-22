const express = require("express");
const router = express.Router();
const bidController = require("../controllers/bid.controller");
const verifyToken = require("../middlewares/auth.middleware");

router.post("/", verifyToken, bidController.postBids);
router.get("/", verifyToken, bidController.getAllBids);
router.get("/mybids", verifyToken, bidController.getMyBids);
router.get("/check", verifyToken, bidController.getExistingBid);
router.delete("/", verifyToken, bidController.deleteBid);
router.get("/:productId", verifyToken, bidController.getBids);

module.exports = router;
