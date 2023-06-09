import mongoose from "mongoose";
import PostMessage from "../Models/PostMessage.js";
export const getPosts = async (req, res) => {
  try {
    const { page } = req.query;
    const LIMIT = 5;
    const startingIndex = (Number(page) - 1) * LIMIT;
    const couuntDocs = await PostMessage.countDocuments({});
    console.log(couuntDocs);
    console.log(req.userId, req.user);
    const data = await PostMessage.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startingIndex);

    return res.status(200).json({
      data,
      current_page: page,
      number_of_page: Math.ceil(couuntDocs / LIMIT),
    });
  } catch (error) {
    console.log(error.message);
    res.send("some thing went wonrg");
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  console.log(req.user, "User Details");
  const newPost = new PostMessage({
    ...post,
    user: req.user[0],
    user_id: req.user[0]._id,
  });
  try {
    const data = await newPost.save();
    return res.status(200).json(data);
  } catch (error) {
    console.log(error.message);
    res.json({ status: false, message: error.message }, 409);
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const post = req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(409).json({ message: "id provided is not valid" });
  try {
    const data = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    return res.status(200).json(data);
  } catch (error) {
    console.log(error.message);
    res.json({ status: false, message: error.message }, 409);
  }
};

export const likedPost = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(409).json({ message: "id provided is not valid" });
  try {
    const post = await PostMessage.findById(id);

    const user_id = req.user[0]._id;
    console.log(user_id, "user Id");
    const index = post.likes.findIndex((id) => id === String(user_id));

    if (index === -1) {
      post.likes.push(user_id);
    } else {
      post.likes = post.likes.filter((id) => id !== String(user_id));
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
      new: true,
    });

    return res.status(200).json(updatedPost);
  } catch (error) {
    console.log(error.message);
    res.status(409).json({ status: false, message: error.message });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(409).json({ message: "id provided is not valid" });
  try {
    const data = await PostMessage.findByIdAndRemove(id);
    return res.status(200).json(id);
  } catch (error) {
    console.log(error.message);
    res.json({ status: false, message: error.message }, 409);
  }
};

export const searchInPost = async (req, res) => {
  console.log("Hello From Search");
  try {
    const { term } = req.query;
    const title = new RegExp(term, "i");
    // console.log(req.userId, req.user);
    const data = await PostMessage.find({
      $or: [{ title }, { tags: { $in: [term] } }],
    });
    // console.log("Done Oprations");
    return res.status(200).json({ data, term });
  } catch (error) {
    console.log(error.message);
    res.send("some thing went wonrg");
  }
};
