"use client";

// Forms and validation
import { Form, Formik } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

// Firebase
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firebaseStorage } from "@/firebase/config";
// Routing
import { AuthRoute } from "@/containers/AuthRoute";
import { useRouter } from "next/navigation";
// Components
import { Button } from "@/components/Button";
import { FormInput } from "@/components/FormInput";
import { Navbar } from "@/components/Navbar";
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
  const { createProduct, getProducts } = useProductContext();
  const router = useRouter();

  return (
    <>
      <Navbar />
      <h1 className="text-2xl">Add a new product</h1>
      <div className="flex flex-col h-screen w-full justify-center items-center">
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
            <Form className="flex flex-col gap-2">
              <FormInput
                name="name"
                label="Name*"
                type="text"
                placeholder="Enter a product name"
                autoComplete="off"
              />
              <FormInput name="price" label="Selling price(£)*" type="number" />
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
              {/* Add sizes and currency fields */}
              <div className="flex flex-col">
                <label className="text-sm" htmlFor="photo">
                  Product image*
                </label>
                <input
                  id="photo"
                  className="pt-1 pb-2"
                  type="file"
                  onChange={(event) => {
                    const file = event.target.files?.[0];

                    if (file) {
                      setFieldValue("image", file, false);
                    }
                  }}
                />
              </div>
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
    </>
  );
}

export default AuthRoute(Page);
