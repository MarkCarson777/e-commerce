import clsx from "clsx";

type ButtonProps = {
  children: React.ReactNode;
  type: "button" | "submit" | "reset";
  color: "primary" | "danger";
  pending?: boolean;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
};

export function Button(props: ButtonProps) {
  const { children, type, color, pending, disabled, onClick, className } =
    props;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "relative flex font-semibold h-12 justify-center items-center rounded-md text-white px-4",
        color === "primary" && "bg-blue-500",
        color === "danger" && "bg-red-500",
        className
      )}
    >
      {pending ? <span>Loading...</span> : children}
    </button>
  );
}
