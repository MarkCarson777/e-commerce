"use client";

import { Form, Formik, Field, ErrorMessage } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firebaseStorage } from "@/firebase/config";

import Link from "next/link";
import { AuthRoute } from "@/containers/AuthRoute";
import { useRouter } from "next/navigation";

import { Button } from "@/components/Button";

import { useProductContext } from "@/context/ProductContext";

import { Product } from "@/types";

const CreateProductSchema = z.object({
  name: z.string(),
  price: z.number(),
  quantity: z.number(),
  description: z.string(),
  sizes: z.array(z.string()).optional(),
  currency: z.string().optional(),
  image: z.any(),
});

function Page() {
  const { createProduct, getProducts } = useProductContext();
  const router = useRouter();

  return (
    <div className="flex flex-col h-screen w-full justify-center items-center">
      <Link href="/dashboard">Back</Link>
      <h1>Add product</h1>
      <Formik<Product>
        initialValues={{
          id: null,
          name: "",
          price: 0,
          quantity: 0,
          description: "",
          sizes: [],
          currency: "",
          image: null,
        }}
        validationSchema={toFormikValidationSchema(CreateProductSchema)}
        onSubmit={async (values: Product) => {
          if (!values.image) {
            return;
          }

          const storageRef = ref(
            firebaseStorage,
            `images/${values.image.name}`
          );

          try {
            await uploadBytes(storageRef, values.image);
            const url = await getDownloadURL(storageRef);
            values.imageUrl = url;

            const { result } = await createProduct(values);

            if (result) {
              console.log("Product created with ID:", result.id);
              await getProducts();
              return router.push("/dashboard");
            }
          } catch (error) {
            console.error("Error creating product", error);
          }
        }}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form className="flex flex-col">
            <Field name="name" placeholder="Name" />
            <ErrorMessage name="name" />
            <Field name="price" type="number" placeholder="Price" />
            <ErrorMessage name="price" />
            <Field name="quantity" type="number" placeholder="Quantity" />
            <ErrorMessage name="quantity" />
            <Field name="description" placeholder="Description" />
            <ErrorMessage name="description" />
            <Field name="sizes" placeholder="Sizes" />
            <ErrorMessage name="sizes" />
            <Field name="currency" placeholder="Currency" />
            <ErrorMessage name="currency" />
            <input
              type="file"
              onChange={(event) => {
                const file = event.target.files?.[0];

                if (file) {
                  setFieldValue("image", file, false);
                }
              }}
            />
            <Button
              type="submit"
              color="primary"
              disabled={isSubmitting}
              pending={isSubmitting}
            >
              <span>Add product</span>
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AuthRoute(Page);
