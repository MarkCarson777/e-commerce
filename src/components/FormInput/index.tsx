import clsx from "clsx";

import { Field, ErrorMessage } from "formik";

type FormInputProps = {
  name: string;
  type: string;
  label: string;
  placeholder?: string;
  autoComplete?: string;
  className?: string;
};

export function FormInput(props: FormInputProps) {
  const { name, type, label, placeholder, autoComplete, className } = props;

  return (
    <div className={clsx("flex flex-col", className)}>
      <label className="text-sm" htmlFor={name}>
        {label}
      </label>
      <Field
        id={name}
        className="border-2 px-3 py-2 rounded"
        name={name}
        type={type}
        placeholder={placeholder}
        min={0}
        autoComplete={autoComplete}
      />
      <ErrorMessage
        name={name}
        render={(error) => (
          <span className="text-red-500 text-sm">{error}</span>
        )}
      />
    </div>
  );
}
