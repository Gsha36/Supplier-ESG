import { User } from "../models/userModel.js";
import expressAsyncHandler from "express-async-handler";
import AppError from "../utils/appError.js";
import { Supplier } from "../models/suppliersModel.js";

export const updateSupplierInfo = expressAsyncHandler(
  async (req, res, next) => {
    // const { username } = req.user;  
    const username = 'harmeet';
    const { address, total_revenue, panCard, GSTNo } = req.body;  

    // Check if all required fields are provided in the request
    if (!username) {
      return next(new AppError("Username is required", 400));
    }

    // Check if any of the required supplier information is provided
    if (!address && !total_revenue && !panCard && !GSTNo) {
      return next(
        new AppError(
          "At least one field (address, total revenue, panCard, GSTNo) must be provided to update or create supplier",
          400
        )
      );
    }

    try {
      // Check if supplier with the username exists
      let supplier = await Supplier.findOne({ username });

      if (supplier) {
        // If supplier exists, update the fields if they are provided
        if (address !== undefined) supplier.address = address;
        if (total_revenue !== undefined) supplier.total_revenue = total_revenue;
        if (panCard !== undefined) supplier.panCard = panCard;
        if (GSTNo !== undefined) supplier.GSTNo = GSTNo;

        await supplier.save(); // Save the updated supplier document

        return res.status(200).json({
          status: "success",
          data: {
            supplier,
          },
        });
      }

      // If supplier does not exist, create a new supplier
      supplier = await Supplier.create({
        username,
        address,
        total_revenue,
        panCard,
        GSTNo,
      });

      return res.status(201).json({
        status: "success",
        data: {
          supplier,
        },
      });
    } catch (error) {
      // Handle database errors or other unexpected issues
      return next(
        new AppError(
          "Error updating or creating supplier. Please try again later.",
          500
        )
      );
    }
  }
);
