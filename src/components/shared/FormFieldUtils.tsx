/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";

import { Input } from "../ui/input";

interface IFromProps {
  register: any;
  name: string;
  isPending: boolean;
  type: string;
  placeholder?: string;
  label: string;
  required: boolean;
}

const FormFieldUtils: FC<IFromProps> = ({
  register,
  name,
  isPending,
  type,
  placeholder,
  label,
  required = false,
}) => {
  return (
    <div>
      <span className="font-bold ">{label}</span>
      <Input
        {...register(name, { required })}
        disabled={isPending}
        placeholder={placeholder}
        type={type}
        className="mt-2"
      />
    </div>
  );
};

export default FormFieldUtils;
