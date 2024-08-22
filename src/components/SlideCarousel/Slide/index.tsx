import clsx from "clsx";

import Image from "next/image";
import Link from "next/link";

import { Slide as SlideType } from "@/types";

type SlideProps = {
  slide: SlideType;
};

export function Slide(props: SlideProps) {
  const { slide } = props;
  const [firstImage, secondImage] = slide.images;
  const hasMultipleImages = slide.images.length > 1;

  return (
    <div className="relative w-full shrink-0">
      <div className="flex h-full">
        <div
          className={clsx("relative h-full", {
            "w-1/2": hasMultipleImages,
            "w-full": !hasMultipleImages,
          })}
        >
          <Image
            src={firstImage.img}
            alt={firstImage.alt}
            fill
            style={{
              objectFit: "cover",
            }}
            priority
          />
        </div>
        {hasMultipleImages && (
          <div className="relative w-1/2 h-full">
            <Image
              src={secondImage.img}
              alt={secondImage.alt}
              fill
              style={{
                objectFit: "cover",
              }}
              priority
            />
          </div>
        )}
      </div>
      <div
        className={clsx(
          "absolute flex flex-col top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 gap-6 items-center",
          slide.lightMode ? "text-black" : "text-white"
        )}
      >
        <span className="text-8xl font-tangerine font-semibold">
          {slide.title}
        </span>
        <Link href="/products">
          <span
            className={clsx(
              "uppercase text-montserrat text-xl border-2 px-8 py-4 w-fit",
              slide.lightMode
                ? "hover:bg-white border-black"
                : "hover:bg-black border-white"
            )}
          >
            {slide.btn.label}
          </span>
        </Link>
      </div>
    </div>
  );
}
