import express from "express";
import { addSupplierQuestion, updateSupplierInfo } from "../controllers/supplierController.js";

const router = express.Router();


router.post("/updateSupplierInfo", updateSupplierInfo);
router.post("/addSupplierQuestion", addSupplierQuestion);


export default router;
