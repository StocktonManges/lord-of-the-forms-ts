import { useState } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { PhoneInputState, UserInformation } from "../types";
import { Validations } from "../utils/validations";
import { allCities } from "../utils/shared-data";
import FunctionalPhoneInput from "./FunctionalPhoneInput";
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

  const allValidationsPassed = () =>
    Validations.isNameValid(firstNameInput) &&
    Validations.isNameValid(lastNameInput) &&
    Validations.isEmailValid(emailInput) &&
    Validations.isCityValid(cityInput, allCities) &&
    Validations.isPhoneValid(phoneInput);

  const resetForm = () => {
    setFirstNameInput("");
    setLastNameInput("");
    setEmailInput("");
    setCityInput("");
    setPhoneInput(["", "", "", ""]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!allValidationsPassed()) {
      alert("Bad Data Input");
      setIsSubmitted(true);
      return;
    }
    setUserData({
      firstName: firstNameInput,
      lastName: lastNameInput,
      email: emailInput,
      city: cityInput,
      phone: phoneInput.join(""),
    });
    resetForm();
    setIsSubmitted(false);
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
        show={isSubmitted && !Validations.isNameValid(firstNameInput)}
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
        show={isSubmitted && !Validations.isNameValid(lastNameInput)}
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
        show={isSubmitted && !Validations.isEmailValid(emailInput)}
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
        show={isSubmitted && !Validations.isCityValid(cityInput, allCities)}
      />

      {/* Phone Input */}
      <FunctionalPhoneInput
        phoneInput={phoneInput}
        setPhoneState={(newState: PhoneInputState) => setPhoneInput(newState)}
      />
      <ErrorMessage
        message={phoneNumberErrorMessage}
        show={isSubmitted && !Validations.isPhoneValid(phoneInput)}
      />

      <input type="submit" value="Submit" />
    </form>
  );
};
