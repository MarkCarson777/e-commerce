"use client";

import { useEffect } from "react";
import Link from "next/link";
// import Image from "next/image";
import { AuthRoute } from "@/containers/AuthRoute";
import { useProductContext } from "@/context/ProductContext";
import { firebaseStorage } from "@/firebase/config";
import { ref, getDownloadURL } from "firebase/storage";
function Page() {
  const { products } = useProductContext();

  useEffect(() => {
    const fetchImages = async () => {
      const imagesRef = ref(firebaseStorage, "images/");

      try {
        const images = await getDownloadURL(imagesRef);
        console.log(images);
      } catch (error) {
        console.error("Error fetching images", error);
      }
    };

    fetchImages();
  }, [products]);

  return (
    <>
      <Link href="/dashboard/create">Add product</Link>
      <h1>All products</h1>
      {products.map((product, index) => (
        <div key={index}>
          <span>{product.name}</span>
          {/* <Image src="" alt={product.name} width={200} height={200} /> */}
        </div>
      ))}
    </>
  );
}

export default AuthRoute(Page);
