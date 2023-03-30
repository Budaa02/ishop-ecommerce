import express from "express";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import Users from "../models/users";
import UserRole from "../models/UserRole";
const authApi = express.Router();

authApi.get("/list", (request, response) => {
  response.status(200).json({
    data: [],
  });
});
authApi.post("/register", async (request, response) => {
  const data = request.body;
  console.log(data);

  if (data) {
    const oldUser = await Users.findOne({ email: data.email });
    if (oldUser) {
      return response.status(400).json({
        success: false,
        status: "hereglegch ali hediin uussen baina.",
      });
    }
    var hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;

    try {
      const user = await Users.create(data);
      const result = await user.populate("userrole");
      response.status(201).json({
        message: "hereglegch amjilttai uuslee",
        data: result,
      });
    } catch (error) {
      response.status(500).json({
        success: false,
        error: error,
      });
    }
  } else {
    return response.json({
      error: "the input field is empty",
    });
  }
});
authApi.post("/login", async (request, response) => {
  try {
    const { email, password } = request.body;
    if (!(email && password)) {
      response.status(400).json({
        message: "buruu bn",
      });
    }
    const user = await Users.findOne({ email: email });
    if (user) {
      const isMatch = await bcrypt.compare(password, user?.password);
      if (user && isMatch) {
        const jwtBody = { user_id: user._id, email: email };
        const token = jwt.sign(jwtBody, "MySuperDuperPrivateKey", {
          expiresIn: "24h",
        });
        response.status(200).json({
          success: true,
          status: "Amjilttai newterlee",
          data: user,
          token: token,
        });
        return;
      }
    } else {
      response.status(400).json({
        success: false,
        status: "nuuts ug ner hoorondoo taarahgui baina",
      });
      return;
    }
  } catch (error) {
    response.status(500).json({
      data: "aldaa garlaa",
      error: error,
    });
  }
});

authApi.post("/role/create", async (req, res) => {
  const { name } = req.body;

  const result = await UserRole.create({ name });

  res.status(200).json({
    data: result,
  });
});

authApi.get("/role/list", async (req, res) => {
  const result = await UserRole.find({});
  res.status(200).json({
    data: result,
  });
});

module.exports = authApi;
