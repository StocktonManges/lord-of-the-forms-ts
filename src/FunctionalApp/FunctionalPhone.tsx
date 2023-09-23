import { ComponentProps } from "react";

export default function FunctionalPhoneInput({
  phoneInputProps,
}: {
  phoneInputProps: ComponentProps<"input">;
}) {
  return <input {...phoneInputProps} />;
}
