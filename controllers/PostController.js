import PostMessage from "../Models/PostMessage.js";
export const getPosts = async (req, res) => {
  try {
    console.log("This Is Work");
    const data = await PostMessage.find();
    return res.status(200).json(data);
  } catch (error) {
    console.log(error.message);
    res.send("some thing went wonrg");
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage(post);
  try {
    await newPost.save();
    return res.status(200).json(data);
  } catch (error) {
    console.log(error.message);
    res.json({ status: false, message: error.message }, 409);
  }
};
