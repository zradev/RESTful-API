import express from "express";
import controller from "../controllers/Book";
import { Schemas, ValidateJoi } from "../middleware/ValidateSchema";

const router = express.Router();

router.post("/create", ValidateJoi(Schemas.book.create), controller.createBook);
router.get("/get/:bookId", controller.getBook);
router.get("/get/", controller.getAllBooks);
router.patch("/update/:bookId", ValidateJoi(Schemas.book.update), controller.updateBook);
router.delete("/delete/:bookId", controller.deleteBook);

export = router;
