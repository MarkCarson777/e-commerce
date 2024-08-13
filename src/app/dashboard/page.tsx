"use client";

import { AuthRoute } from "@/containers/AuthRoute";

import { useProductContext } from "@/context/ProductContext";

function Page() {
  const { createProduct, products } = useProductContext();

  console.log(products);

  return (
    <>
      <h1>Create product</h1>
      <form>
        <label htmlFor="name" />
        <input type="text" name="name" id="name" placeholder="Name..." />
        <button
          onClick={async (e) => {
            e.preventDefault();
            try {
              await createProduct({ name: "test" });
              console.log("Product created successfully");
            } catch (error) {
              console.error("Error creating product", error);
            }
          }}
        >
          Create
        </button>
      </form>
    </>
  );
}

export default AuthRoute(Page);
