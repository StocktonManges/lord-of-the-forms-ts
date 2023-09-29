import { useRef, ChangeEventHandler } from "react";
import { phoneInputLengths } from "../utils/shared-data";
import { PhoneInputState } from "../types";

export default function FunctionalPhoneInput({
  phoneInput,
  setPhoneState,
}: {
  phoneInput: PhoneInputState;
  setPhoneState: (newPhoneInput: PhoneInputState) => void;
}) {
  const refs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  // Returns onChange function for phone input fields.
  const createOnChangeHandler =
    (index: number): ChangeEventHandler<HTMLInputElement> =>
    (e) => {
      const phoneInputCount = phoneInputLengths.length;
      const currentMaxLength = phoneInputLengths[index];
      const nextRef = refs[index + 1];
      const prevRef = refs[index - 1];
      const value = e.target.value;

      const shouldGoToNextRef =
        currentMaxLength === value.length &&
        index < phoneInputCount - 1 &&
        !isNaN(Number(value) + 1);
      const shouldGoToPrevRef = value.length === 0 && index > 0;

      // Maps through phoneInput and assigns the input value to the state.
      const newState = phoneInput.map((phoneInput, phoneInputIndex) =>
        index === phoneInputIndex && !isNaN(Number(value) + 1)
          ? value.slice(0, phoneInputLengths[index])
          : phoneInput
      ) as PhoneInputState;

      if (shouldGoToNextRef) {
        nextRef.current?.focus();
      }

      if (shouldGoToPrevRef) {
        prevRef.current?.focus();
      }
      setPhoneState(newState);
    };
  return (
    <div className="input-wrap">
      <label htmlFor="phone">Phone:</label>
      <div id="phone-input-wrap">
        {phoneInputLengths.map((length, index) => {
          const isLastIteration = index < phoneInputLengths.length - 1;
          return (
            <span
              key={index}
              style={
                isLastIteration
                  ? { display: "flex", flexGrow: "1" }
                  : { display: "flex" }
              }
            >
              <input
                type="text"
                ref={refs[index]}
                id={`phone-input-${index + 1}`}
                value={phoneInput[index]}
                placeholder={`${"5".repeat(length)}`}
                onChange={createOnChangeHandler(index)}
              />
              {isLastIteration ? <div style={{ flexGrow: "1" }}>-</div> : null}
            </span>
          );
        })}
      </div>
    </div>
  );
}
