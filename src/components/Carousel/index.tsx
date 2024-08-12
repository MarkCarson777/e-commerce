import clsx from "clsx";

type CarouselProps = {
  className?: string;
};

export function Carousel(props: CarouselProps) {
  const { className } = props;

  return <h1 className={clsx(className)}>Carousel</h1>;
}
