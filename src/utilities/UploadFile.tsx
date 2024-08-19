import { useState, FunctionComponent } from "react";
import { FormikErrors } from "formik";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firebaseStorage } from "@/firebase/config";
import Image from "next/image";

import { Product } from "@/types";

type UploadFileProps = {
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean
  ) => Promise<void | FormikErrors<Product>>;
};

export const UploadFile: FunctionComponent<UploadFileProps> = ({
  setFieldValue,
}) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState(null);

  console.log("file", file);

  const onChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return; // Return if no file is selected

    setUploading(true); // Set uploading state to true
    const storageRef = ref(firebaseStorage, `images/${file.name}`); // Create a reference to the file in Firebase Storage

    try {
      await uploadBytes(storageRef, file); // Upload the file to Firebase Storage
      const url = await getDownloadURL(storageRef); // Get the download URL of the uploaded file
      setUploadedUrl(url); // Set the uploaded image URL
      console.log("Uploaded URL", url);
      console.log("File Uploaded Successfully");
    } catch (error) {
      console.error("Error uploading the file", error);
    } finally {
      setUploading(false); // Set uploading state to false
    }
  };

  return (
    <div>
      <input type="file" onChange={onChange} />
      {/* File input to select the image */}
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload Image"}
        {/* Button to upload the image */}
      </button>
      {uploadedUrl && (
        <div>
          <p>Uploaded image:</p>
          <Image
            src={uploadedUrl}
            alt="Uploaded image"
            width={300}
            height={300}
          />
        </div>
      )}
    </div>
  );
};
