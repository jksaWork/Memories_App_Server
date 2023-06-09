import express from "express";
import {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  likedPost,
  searchInPost,
} from "../controllers/PostController.js";
import { Auth } from "../Middleware/auth.js";
const router = express.Router();
// Post Router
router.use(Auth);
router.get("/", getPosts);
router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
router.put("/like/:id", likedPost);
router.get("/search", searchInPost);

export default router;
