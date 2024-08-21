"use client";

// React
import { useState } from "react";
// Next
import Image from "next/image";
// Forms and validation
import { Form, Formik, ErrorMessage } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
// Firebase
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firebaseStorage } from "@/firebase/config";
// Routing
import Link from "next/link";
import { AuthRoute } from "@/containers/AuthRoute";
import { useRouter } from "next/navigation";
// Components
import { Button } from "@/components/Button";
import { FormInput } from "@/components/FormInput";
import { Icon } from "@/components/Icon";
// Context
import { useProductContext } from "@/context/ProductContext";
// Types
import { Product } from "@/types";

const CreateProductSchema = z.object({
  name: z.string(),
  price: z.number().min(1, "Price must be greater than 0"),
  quantity: z.number().min(1, "Quantity must be greater than 0"),
  description: z.string(),
  sizes: z.array(z.string()).optional(),
  currency: z.string().optional(),
  image: z.any(),
});

function Page() {
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const { createProduct, getProducts } = useProductContext();
  const router = useRouter();

  const onFileUpload = async (file: File, setFieldValue: Function) => {
    const storageRef = ref(firebaseStorage, `images/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    setFieldValue("image", file, false);
    setUploadedUrl(url);
  };

  const onSubmit = async (
    values: Product,
    { setSubmitting, setErrors }: any
  ) => {
    if (!values.image) {
      setErrors({ image: "An image is required" });
      setSubmitting(false);
      return;
    }

    const storageRef = ref(firebaseStorage, `images/${values.image.name}`);
    try {
      const url = await getDownloadURL(storageRef);
      values.image = url;
      await createProduct(values);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error creating product", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="h-screen w-full flex flex-col">
      <div className="bg-gray-200 w-full flex items-center gap-3 pl-3 py-2 min-h-16">
        <Link href="/dashboard">
          <Icon icon="CircleLeft" size={24} />
        </Link>
        <h1 className="text-2xl">Add a new product</h1>
      </div>
      <Formik<Product>
        initialValues={{
          name: "",
          price: 0,
          quantity: 0,
          description: "",
          sizes: [],
          currency: "",
          image: null,
        }}
        validationSchema={toFormikValidationSchema(CreateProductSchema)}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form className="w-11/12 rounded-2xl bg-white p-4">
            <div className="flex gap-4">
              <div className="flex flex-col gap-2 w-full">
                <FormInput
                  name="name"
                  label="Name*"
                  type="text"
                  placeholder="Enter a product name"
                  autoComplete="off"
                />
                <FormInput
                  name="price"
                  label="Selling price(£)*"
                  type="number"
                />
                <FormInput
                  name="quantity"
                  label="Stock quantity*"
                  type="number"
                />
                <FormInput
                  name="description"
                  label="Description*"
                  placeholder="Describe the product"
                  type="textarea"
                  autoComplete="off"
                />
              </div>
              {/* Add sizes and currency fields */}
              <div className="flex flex-col">
                <label className="text-sm" htmlFor="photo">
                  Product image*
                </label>
                <input
                  id="photo"
                  className="pt-1 pb-2"
                  type="file"
                  onChange={async (event) => {
                    const file = event.target.files?.[0];
                    if (file) onFileUpload(file, setFieldValue);
                  }}
                />
                <ErrorMessage
                  name="image"
                  component="div"
                  className="text-red-500 text-sm"
                />
                {uploadedUrl ? (
                  <div className="relative h-full">
                    <Image
                      src={uploadedUrl}
                      alt="Uploaded image"
                      fill
                      priority
                      sizes="25vw"
                    />
                  </div>
                ) : (
                  <div>Upload an image</div>
                )}
              </div>
            </div>
            <Button
              type="submit"
              color="primary"
              disabled={isSubmitting}
              pending={isSubmitting}
              className="w-full mt-4"
            >
              <span>Add product</span>
            </Button>
          </Form>
        )}
      </Formik>
    </main>
  );
}

export default AuthRoute(Page);
