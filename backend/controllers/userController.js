import { User } from "../models/userModel.js";
import expressAsyncHandler from "express-async-handler";
import AppError from "../utils/appError.js";
import { Supplier } from "../models/suppliersModel.js";

export const updateSupplierInfo = expressAsyncHandler(
  async (req, res, next) => {
    const { username, address, total_revenue, panCard, GSTNo, suppliesTo } =
      req.body;

    // 1. Check if the username is provided
    if (!username) {
      return next(new AppError("Username is required", 400));
    }

    // 2. Check if at least one supplier information field is provided
    if (!address && !total_revenue && !panCard && !GSTNo && !suppliesTo) {
      return next(
        new AppError(
          "At least one field (address, total revenue, panCard, GSTNo, suppliesTo) must be provided to update or create supplier",
          400
        )
      );
    }

    try {
      // 3. Check if supplier with the username exists
      let supplier = await Supplier.findOne({ username });

      if (supplier) {
        // 4. Update supplier if it exists
        if (address !== undefined) supplier.address = address;
        if (total_revenue !== undefined) supplier.total_revenue = total_revenue;
        if (panCard !== undefined) supplier.panCard = panCard;
        if (GSTNo !== undefined) supplier.GSTNo = GSTNo;
        if (suppliesTo !== undefined) supplier.suppliesTo = suppliesTo;

        // 5. Check if all fields are set to update `allData` in the user document
        if (address && total_revenue && panCard && GSTNo && suppliesTo) {
          const user = await User.findOne({ username });
          if (user) {
            user.allData = true;
            await user.save();
          }
        }

        await supplier.save(); // Save the updated supplier document

        // 6. Return the updated supplier and user in the response
        const user = await User.findOne({ username });
        return res.status(201).json({
          status: "success",
          data: {
            supplier,
            user,
          },
        });
      }

      // 7. If supplier does not exist, create a new one
      supplier = await Supplier.create({
        username,
        address,
        total_revenue,
        panCard,
        GSTNo,
        suppliesTo,
      });

      // 8. After creating the supplier, find the user and update `allData`
      const user = await User.findOne({ username });
      if (user) {
        user.allData = true;
        await user.save();
      }

      // 9. Return the newly created supplier and the updated user in the response
      return res.status(201).json({
        status: "success",
        data: {
          supplier,
          user,
        },
      });
    } catch (error) {
      // 10. Handle database errors or unexpected issues
      return next(
        new AppError(
          "Error updating or creating supplier. Please try again later.",
          500
        )
      );
    }
  }
);