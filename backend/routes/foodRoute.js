import express from "express";
import {
  addFood,
  listFood,
  removeFood,
} from "../controllers/foodController.js";
import multer from "multer";

const foodRouter = express.Router();

// Multer is a middleware for handling file uploads in Node.js, typically with Express.js.
//  It saves files physically in a directory on your server, not inside MongoDB Atlas.
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

// this is the middlelware we have created
const upload = multer({ storage: storage });

// This uploads a single file with the key name "image".
// upload.single("image") -> this middel warre intercepts the request in between adn than attach a path/directorey address to image
foodRouter.post("/add", upload.single("image"), addFood);

foodRouter.get("/list", listFood);
foodRouter.post("/remove", removeFood);
export default foodRouter;
