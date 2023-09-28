import { ChangeEventHandler, Component, createRef } from "react";
import { ErrorMessage } from "../ErrorMessage";
import ClassTextInput from "./ClassTextInput";
import * as vld from "../utils/validations";
import { phoneInputLengths, allCities } from "../utils/shared-data";
import ClassPhone from "./ClassPhone";
import { PhoneInputState, UserInformation } from "../types";

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "State is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

export class ClassForm extends Component<{
  updateParentState: (userData: UserInformation) => void;
}> {
  phoneInputState: PhoneInputState = ["", "", "", ""];
  state = {
    isSubmitted: false,
    firstNameInput: "",
    lastNameInput: "",
    emailInput: "",
    cityInput: "",
    phoneInput: this.phoneInputState,
  };

  ref0 = createRef<HTMLInputElement>();
  ref1 = createRef<HTMLInputElement>();
  ref2 = createRef<HTMLInputElement>();
  ref3 = createRef<HTMLInputElement>();

  render() {
    const {
      isSubmitted,
      firstNameInput,
      lastNameInput,
      emailInput,
      cityInput,
      phoneInput,
    } = this.state;
    const refs = [this.ref0, this.ref1, this.ref2, this.ref3];

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
        this.setState({ phoneInput: newState });
      };

    const allValidationsPassed = () =>
      vld.isNameValid(firstNameInput) &&
      vld.isNameValid(lastNameInput) &&
      vld.isEmailValid(emailInput) &&
      vld.isCityValid(cityInput, allCities) &&
      vld.isPhoneValid(phoneInput);

    const resetForm = () => {
      this.setState({
        isSubmitted: false,
        firstNameInput: "",
        lastNameInput: "",
        emailInput: "",
        cityInput: "",
        phoneInput: ["", "", "", ""],
      });
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (allValidationsPassed()) {
        /* CHANGE "setUserData" TO CLASS COMPONENT LOGIC */

        this.props.updateParentState({
          firstName: firstNameInput,
          lastName: lastNameInput,
          email: emailInput,
          city: cityInput,
          phone: phoneInput.join(""),
        });
        resetForm();
        this.setState({ isSubmitted: false });
      } else {
        alert("Bad Data Input");
        this.setState({ isSubmitted: true });
      }
    };

    return (
      <form onSubmit={handleSubmit}>
        <u>
          <h3>User Information Form</h3>
        </u>

        {/* first name input */}
        <ClassTextInput
          label="First Name"
          inputProps={{
            placeholder: "Bilbo",
            value: firstNameInput,
            onChange: (e) => {
              this.setState({ firstNameInput: e.target.value });
            },
          }}
        />
        <ErrorMessage
          message={firstNameErrorMessage}
          show={isSubmitted && !vld.isNameValid(firstNameInput)}
        />

        {/* last name input */}
        <ClassTextInput
          label="Last Name"
          inputProps={{
            placeholder: "Baggins",
            value: lastNameInput,
            onChange: (e) => {
              this.setState({ lastNameInput: e.target.value });
            },
          }}
        />
        <ErrorMessage
          message={lastNameErrorMessage}
          show={isSubmitted && !vld.isNameValid(lastNameInput)}
        />

        {/* Email Input */}
        <ClassTextInput
          label="Email"
          inputProps={{
            placeholder: "bilbo-baggins@adventurehobbits.net",
            value: emailInput,
            onChange: (e) => {
              this.setState({ emailInput: e.target.value });
            },
          }}
        />
        <ErrorMessage
          message={emailErrorMessage}
          show={isSubmitted && !vld.isEmailValid(emailInput)}
        />

        {/* City Input */}
        <ClassTextInput
          label="City"
          inputProps={{
            list: "cities",
            placeholder: "Hobbiton",
            value: cityInput,
            onChange: (e) => {
              this.setState({ cityInput: e.target.value });
            },
          }}
        />
        <ErrorMessage
          message={cityErrorMessage}
          show={isSubmitted && !vld.isCityValid(cityInput, allCities)}
        />

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
                  <ClassPhone
                    phoneInputProps={{
                      ref: refs[index],
                      type: "text",
                      id: `phone-input-${index + 1}`,
                      placeholder: "5".repeat(length),
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
  }
}
