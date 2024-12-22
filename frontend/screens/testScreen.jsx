import React from "react";
import { View, Button, Alert } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import axios from "axios";
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from "@env"; // Import your environment variables
import DOMAIN from "../utils/constants";

const TestUploadScreen = () => {
  const handleImageUpload = async () => {
    const res = await launchImageLibrary({ mediaType: "photo" });

    // Check if the user cancelled the image picker
    if (res.didCancel) {
      console.log("User cancelled image picker");
      return;
    } else if (res.errorMessage) {
      console.error("Error picking image:", res.errorMessage);
      return;
    }

    // Ensure there are image assets
    if (!res.assets || res.assets.length === 0) {
      console.log("No image assets found");
      return;
    }

    const asset = res.assets[0];
    console.log("Selected Profile Image:", asset);

    const formData = new FormData();
    formData.append("image", {
      uri: asset.uri, // Correct URI to the selected image
      name: asset.fileName || "image.jpg", // Default name if not provided
      type: asset.type || "image/jpeg", // Default type if not provided
    });

    // Include additional data
    formData.append("first_name", "John");
    formData.append("last_name", "Doe");
    formData.append("email", "john.doe@example.com");
    formData.append("phone_number", "123456789");
    formData.append("birth_date", "1990-01-01");
    formData.append("bio", "This is a bio.");

    try {
      const response = await axios.post(
        `${DOMAIN}/api/test`, // Update this to your endpoint
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Important for file uploads
          },
        }
      );

      console.log("Upload Response:", response.data);
      Alert.alert(
        "Image Uploaded",
        `Uploaded Image URL: ${response.data.secure_url || "No URL returned"}`
      );
    } catch (error) {
      console.error("Error uploading image:", error);
      Alert.alert("Upload Error", error.message);
    }
  };

  return (
    <View>
      <Button title="Upload Image" onPress={handleImageUpload} />
    </View>
  );
};

export default TestUploadScreen;
