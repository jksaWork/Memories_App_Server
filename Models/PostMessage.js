import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  message: String,
  creator: String,
  tags: [String],
  user: Object,
  user_id: String,
  selectedFiled: String,
  LikeCount: {
    type: Number,
    default: 0,
  },
  likes: [String],
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const PostMessage = mongoose.model("postMessage", postSchema);
export default PostMessage;
