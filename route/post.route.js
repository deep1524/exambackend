const express = require("express");
const PostModel = require("../model/post.model");

const app = express.Router();

app.get("/",async (req, res) => {
  
//   try{
   
//     let notes = await TodoModel.find();
//     res.send(notes);
// }
// catch(err){
//     console.log(err);
//     res.send(err.message);
// }

const query = req.query;

try {
  if (query.sort === "price_low") {
    const data = await PostModel.find().sort({ price: 1 });
    res.send(data);
  } else if (query.sort === "price_high") {
    const data = await PostModel.find().sort({ price: -1 });
    res.send(data);
  } else {
    const data = awaitPostModel.find(query);
    res.send(data);
  }
} catch (err) {
  console.log(err);
}
});

app.post("/", async (req, res) => {
  // verify token
  const payload = req.body;
  try {
    const new_note = new PostModel(payload);
    await new_note.save();
    res.send("created the note");
  } catch (e) {
    console.log(e);
    res.send("error creating");
  }
  
});

app.patch("/update/:id", async (req, res) => {
  const payload = req.body;
  const id = req.params.id;
  const note = await PostModel.findOne({"_id":id});
  console.log(note);
  const userID_in_note =note.userID;
  const userID_making_req = req.body.userID;
  try {
    if (userID_making_req !== userID_in_note) {
      res.send({ msg: "you are not authorized " });
    } else {
      await PostModel.findByIdAndUpdate({"_id":id}, payload);
      res.send("update data");
    }
  } catch (err) {
    console.log(err);
    res.send({"msg":"something went wrong "});
  }
});

app.delete("/delete/:id", async(req, res) => {

  const id = req.params.id;
  const note = await PostModel.findOne({"_id":id});
  const userID_in_note = note.userID;
  const userID_making_req = req.body.userID;
  try {
    if (userID_making_req !== userID_in_note) {
      res.send({ msg: "you are not authorized " });
    } else {
      await PostModel.findByIdAndDelete({"_id":id});
      res.send("Delete the note");
    }
  } catch (err) {
    console.log(err);
    res.send({"msg":"something went wrong "});
  }
});

module.exports = app;
