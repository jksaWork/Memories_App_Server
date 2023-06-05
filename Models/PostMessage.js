import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  message: String,
  creator: String,
  tags: [String],
  selectedFiled: String,
  LikeCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const PostMessage = mongoose.model("postMessage", postSchema);
export default PostMessage;
