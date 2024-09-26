import { User } from "../models/userModel.js";
import expressAsyncHandler from "express-async-handler";
import AppError from "../utils/appError.js";
import { Supplier } from "../models/suppliersModel.js";

export const updateSupplierInfo = expressAsyncHandler(
  async (req, res, next) => {
    const { username, address, total_revenue, panCard, GSTNo, suppliesTo } =
      req.body;
    console.log("req.body", req.body);
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
      console.log("yehi tak tha jo tha");
      // console.log("supp", supplier)

      if (supplier) {
        // 4. Update supplier if it exists
        if (address !== undefined) supplier.address = address;
        if (total_revenue !== undefined) supplier.total_revenue = total_revenue;
        if (panCard !== undefined) supplier.panCard = panCard;
        if (GSTNo !== undefined) supplier.GSTNo = GSTNo;
        if (suppliesTo !== undefined) supplier.suppliesTo = suppliesTo;
        console.log("yehi se return ho gys");
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
      console.log(
        "yha tak hua",
        username,
        address,
        total_revenue,
        panCard,
        GSTNo,
        suppliesTo
      );
      supplier = await Supplier.create({
        username,
        address,
        total_revenue,
        panCard,
        GSTNo,
        suppliesTo,
      });
      console.log("supplier", supplier);

      // 8. After creating the supplier, find the user and update `allData`
      const user = await User.findOne({ username });
      console.log("user", user);
      if (user) {
        console.log("user", user);
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
      console.log("error", error, error.message);
      return next(
        new AppError(
          "Error updating or creating supplier. Please try again later.",
          500
        )
      );
    }
  }
);

export const addSupplierQuestion = expressAsyncHandler(
  async (req, res, next) => {
    const { dataToSend, username, timePeriod } = req.body;

    // Find supplier by username
    const supplier = await Supplier.findOne({ username });

    if (!supplier) {
      return next(new AppError("Supplier with this username not found", 404));
    }

    // Transform dataToSend to match the expected structure
    const newEntry = {
      environment: {
        environmentalManagement:
          dataToSend.environmental.environmentalManagement.map((q) => ({
            question: q.question,
            answer: q.answer.toString(),
          })),
        climateChange: dataToSend.environmental.climateChange.map((q) => ({
          question: q.question,
          answer: q.answer.toString(),
        })),
        airPollution: dataToSend.environmental.airPollution.map((q) => ({
          question: q.question,
          answer: q.answer.toString(),
        })),
        hazardousMaterialManagement:
          dataToSend.environmental.hazardousMaterialManagement.map((q) => ({
            question: q.question,
            answer: q.answer.toString(),
          })),
        naturalResourceManagement:
          dataToSend.environmental.naturalResourceManagement.map((q) => ({
            question: q.question,
            answer: q.answer.toString(),
          })),
        wasteManagement: dataToSend.environmental.wasteManagement.map((q) => ({
          question: q.question,
          answer: q.answer.toString(),
        })),
        regulatoryCompliance: dataToSend.environmental.regulatoryCompliance.map(
          (q) => ({
            question: q.question,
            answer: q.answer.toString(),
          })
        ),
        pollutionPrevention: dataToSend.environmental.pollutionPrevention.map(
          (q) => ({
            question: q.question,
            answer: q.answer.toString(),
          })
        ),
      },
      social: {
        workerHealthSafety: dataToSend.social.workerHealthSafety.map((q) => ({
          question: q.question,
          answer: q.answer.toString(),
        })),
        humanRightsLabourPractices:
          dataToSend.social.humanRightsLabourPractices.map((q) => ({
            question: q.question,
            answer: q.answer.toString(),
          })),
        regulatoryComplianceSocial:
          dataToSend.social.regulatoryComplianceSocial.map((q) => ({
            question: q.question,
            answer: q.answer.toString(),
          })),
        consumerSafetyProductSafety:
          dataToSend.social.consumerSafetyProductSafety.map((q) => ({
            question: q.question,
            answer: q.answer.toString(),
          })),
        communityInvolvement: dataToSend.social.communityInvolvement.map(
          (q) => ({
            question: q.question,
            answer: q.answer.toString(),
          })
        ),
      },
      governance: {
        supplyChainManagement: dataToSend.governance.supplyChainManagement.map(
          (q) => ({
            question: q.question,
            answer: q.answer.toString(),
          })
        ),
        dataPrivacySecurityManagement:
          dataToSend.governance.dataPrivacySecurityManagement.map((q) => ({
            question: q.question,
            answer: q.answer.toString(),
          })),
      },
      timePeriod: new Date(timePeriod), // Ensure this is stored as a date
    };

    // Add the new entry to the questions array
    supplier.questions.push(newEntry);

    // Save the supplier with the new questions entry
    await supplier.save();

    // Send a response back with the updated supplier
    res.status(201).json({
      status: "success",
      data: {
        supplier,
      },
    });
  }
);
