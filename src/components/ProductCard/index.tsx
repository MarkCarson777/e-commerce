import clsx from "clsx";

type ProductCardProps = {
  className?: string;
};

export function ProductCard(props: ProductCardProps) {
  const { className } = props;

  return <div className={clsx(className)}>ProductCard</div>;
}
