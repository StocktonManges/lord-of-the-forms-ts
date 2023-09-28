import { ChangeEventHandler, useRef, useState } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { PhoneInputState, UserInformation } from "../types";
import * as vld from "../utils/validations";
import { phoneInputLengths, allCities } from "../utils/shared-data";
import FunctionalPhoneInput from "./FunctionalPhone";
import FunctionalTextInput from "./FunctionalTextInput";

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid.";
const cityErrorMessage = "State is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

export const FunctionalForm = ({
  setUserData,
}: {
  setUserData: React.Dispatch<React.SetStateAction<UserInformation>>;
}) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [phoneInput, setPhoneInput] = useState<PhoneInputState>([
    "",
    "",
    "",
    "",
  ]);

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
      setPhoneInput(newState);
    };

  const allValidationsPassed = () =>
    vld.isNameValid(firstNameInput) &&
    vld.isNameValid(lastNameInput) &&
    vld.isEmailValid(emailInput) &&
    vld.isCityValid(cityInput, allCities) &&
    vld.isPhoneValid(phoneInput);

  const resetForm = () => {
    setFirstNameInput("");
    setLastNameInput("");
    setEmailInput("");
    setCityInput("");
    setPhoneInput(["", "", "", ""]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (allValidationsPassed()) {
      setUserData({
        firstName: firstNameInput,
        lastName: lastNameInput,
        email: emailInput,
        city: cityInput,
        phone: phoneInput.join(""),
      });
      resetForm();
      setIsSubmitted(false);
    } else {
      alert("Bad Data Input");
      setIsSubmitted(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <u>
        <h3>User Information Form</h3>
      </u>

      {/* first name input */}
      <FunctionalTextInput
        label="First Name"
        inputProps={{
          placeholder: "Bilbo",
          value: firstNameInput,
          onChange: (e) => {
            setFirstNameInput(e.target.value);
          },
        }}
      />
      <ErrorMessage
        message={firstNameErrorMessage}
        show={isSubmitted && !vld.isNameValid(firstNameInput)}
      />

      {/* last name input */}
      <FunctionalTextInput
        label="Last Name"
        inputProps={{
          placeholder: "Baggins",
          value: lastNameInput,
          onChange: (e) => {
            setLastNameInput(e.target.value);
          },
        }}
      />
      <ErrorMessage
        message={lastNameErrorMessage}
        show={isSubmitted && !vld.isNameValid(lastNameInput)}
      />

      {/* Email Input */}
      <FunctionalTextInput
        label="Email"
        inputProps={{
          placeholder: "bilbo-baggins@adventurehobbits.net",
          value: emailInput,
          onChange: (e) => {
            setEmailInput(e.target.value);
          },
        }}
      />
      <ErrorMessage
        message={emailErrorMessage}
        show={isSubmitted && !vld.isEmailValid(emailInput)}
      />

      {/* City Input */}
      <FunctionalTextInput
        label="City"
        inputProps={{
          placeholder: "Hobbiton",
          list: "cities",
          value: cityInput,
          onChange: (e) => {
            setCityInput(e.target.value);
          },
        }}
      />
      <ErrorMessage
        message={cityErrorMessage}
        show={isSubmitted && !vld.isCityValid(cityInput, allCities)}
      />

      {/* Phone Input */}
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
                <FunctionalPhoneInput
                  phoneInputProps={{
                    ref: refs[index],
                    type: "text",
                    id: `phone-input-${index + 1}`,
                    placeholder: `${"5".repeat(length)}`,
                    value: phoneInput[index],
                    onChange: createOnChangeHandler(index),
                  }}
                />
                {isLastIteration ? (
                  <div style={{ flexGrow: "1" }}>-</div>
                ) : null}
              </span>
            );
          })}
        </div>
      </div>

      <ErrorMessage
        message={phoneNumberErrorMessage}
        show={isSubmitted && !vld.isPhoneValid(phoneInput)}
      />

      <input type="submit" value="Submit" />
    </form>
  );
};
