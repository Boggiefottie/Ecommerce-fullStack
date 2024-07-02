import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  console.log("Starting upload to Cloudinary...");
  console.log("Local file path:", localFilePath);

  try {
    if (!localFilePath) {
      console.error("No local file path provided");
      return null;
    }

    console.log("Uploading to Cloudinary...");
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    console.log("Cloudinary upload response:", response);

    // Delete the local file after upload
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    console.error("Cloudinary upload error:", error);

    // Delete the local file if an error occurred
    fs.unlinkSync(localFilePath);
    return null;
  }
};

export { uploadOnCloudinary };
