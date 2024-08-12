import clsx from "clsx";

type ImageCarouselProps = {
  className?: string;
};

export function ImageCarousel(props: ImageCarouselProps) {
  const { className } = props;

  return <h1 className={clsx(className)}>Carousel</h1>;
}
