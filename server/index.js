const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;

//Schema
const schemaData = mongoose.Schema(
  {
    name: String,
    email: String,
    mobile: String,
  },
  {
    timestamps: true,
  }
);

const userModal = mongoose.model("user", schemaData);

// DB Connection
mongoose.connect("mongodb://127.0.0.1:27017/crud");

// read data
app.get("/", async (req, res) => {
  const data = await userModal.find({});
  res.json({ success: true, data: data });
});

//create data
app.post("/create", async (req, res) => {
  console.log(req.body);
  const data = new userModal(req.body);
  await data.save();
  res.send({
    success: true,
    message: "The data saved succssfully",
    data: data,
  });
});

// update data

app.put("/update", async (req, res) => {
  console.log(req.body);
  const { id, ...rest } = req.body;
  const data = await userModal.updateOne({ _id: id }, rest);
  res.send({
    success: true,
    message: "The data updated succssfully",
    data: data,
  });
});

// Delete Data

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const data = await userModal.deleteOne({ _id: id });
  res.send({
    success: true,
    message: "The data delete succssfully",
    data: data,
  });
});

app.listen(PORT);
