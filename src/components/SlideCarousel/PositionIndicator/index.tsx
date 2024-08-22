import clsx from "clsx";

import { Slide as SlideType } from "@/types";

type PositionIndicatorProps = {
  slides: SlideType[];
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
};

export const PositionIndicator = (props: PositionIndicatorProps) => {
  const { slides, currentIndex, setCurrentIndex } = props;

  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
      {slides.map((_, index) => (
        <div
          key={index}
          className={clsx(
            "w-4 h-4 rounded-full cursor-pointer opacity-60",
            currentIndex === index
              ? "bg-black"
              : "bg-gray-300 hover:bg-gray-500"
          )}
          onClick={() => setCurrentIndex(index)}
        ></div>
      ))}
    </div>
  );
};
