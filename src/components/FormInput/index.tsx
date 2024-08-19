import clsx from "clsx";

import { Field, ErrorMessage } from "formik";

type FormInputProps = {
  name: string;
  placeholder: string;
  className?: string;
};

export function FormInput(props: FormInputProps) {
  const { name, placeholder, className } = props;

  return (
    <div className={clsx("flex flex-col", className)}>
      <Field
        className="border-2 px-3 py-2 rounded"
        name={name}
        placeholder={placeholder}
      />
      <ErrorMessage
        name={name}
        render={(error) => (
          <span className="text-red-500 text-xs">{error}</span>
        )}
      />
    </div>
  );
}
