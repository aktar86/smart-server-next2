const userService = require("../services/user.service");

exports.postUser = async (req, res) => {
  try {
    const userBody = req.body;
    console.log(userBody);

    if (!userBody || Object.keys(userBody).length === 0) {
      return res.status(400).json({
        success: false,
        message: "User data is required",
      });
    }

    const userData = {
      ...userBody,
      role: "user",
      createdAt: new Date(),
    };

    const result = await userService.postUser(userData);

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: result,
    });
  } catch (err) {
    console.error("post user error:", err.message);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const result = await userService.getUser();

    return res.status(200).json({
      success: true,
      message: "User data retrieved successfully",
      data: result,
    });
  } catch (err) {
    console.error("get all users error:", err.message);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

