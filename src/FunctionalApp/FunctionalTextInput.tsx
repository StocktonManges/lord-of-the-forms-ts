import { ComponentProps } from "react";

export default function FunctionalTextInput({
  label,
  inputProps,
}: {
  label: string;
  inputProps: ComponentProps<"input">;
}) {
  return (
    <div className="input-wrap">
      <label>{label}:</label>
      <input {...inputProps} />
    </div>
  );
}
