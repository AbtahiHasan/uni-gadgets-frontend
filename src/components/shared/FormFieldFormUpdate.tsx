/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";

import { Input } from "../ui/input";

interface IFromProps {
  name: string;
  isPending: boolean;
  type: string;
  placeholder?: string;
  label: string;
  required?: boolean;
  min?: number;
  max?: number;
  defaultValue?: any;
}

const FormFieldFormUpdate: FC<IFromProps> = ({
  name,
  isPending,
  type,
  placeholder,
  label,
  required = false,
  ...rest
}) => {
  return (
    <div>
      <span className="font-bold ">{label}</span>
      <Input
        name={name}
        disabled={isPending}
        placeholder={placeholder}
        type={type}
        className="mt-2"
        required={required}
        {...rest}
      />
    </div>
  );
};

export default FormFieldFormUpdate;
