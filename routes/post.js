import express from "express";
import { createPost, getPosts } from "../controllers/PostController.js";
const router = express.Router();
// Post Router
router.get("/", getPosts);
router.post("/", createPost);
export default router;
