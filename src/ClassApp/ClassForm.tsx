import { Component } from "react";
import { ErrorMessage } from "../ErrorMessage";
import ClassTextInput from "./ClassTextInput";
import { Validations } from "../utils/validations";
import { allCities } from "../utils/shared-data";
import ClassPhoneInput from "./ClassPhoneInput";
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

  render() {
    const {
      isSubmitted,
      firstNameInput,
      lastNameInput,
      emailInput,
      cityInput,
      phoneInput,
    } = this.state;

    const allValidationsPassed = () =>
      Validations.isNameValid(firstNameInput) &&
      Validations.isNameValid(lastNameInput) &&
      Validations.isEmailValid(emailInput) &&
      Validations.isCityValid(cityInput, allCities) &&
      Validations.isPhoneValid(phoneInput);

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
          show={isSubmitted && !Validations.isNameValid(firstNameInput)}
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
          show={isSubmitted && !Validations.isNameValid(lastNameInput)}
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
          show={isSubmitted && !Validations.isEmailValid(emailInput)}
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
          show={isSubmitted && !Validations.isCityValid(cityInput, allCities)}
        />

        <ClassPhoneInput
          phoneInput={phoneInput}
          setPhoneState={(newState: PhoneInputState) =>
            this.setState({ phoneInput: newState })
          }
        />
        <ErrorMessage
          message={phoneNumberErrorMessage}
          show={isSubmitted && !Validations.isPhoneValid(phoneInput)}
        />

        <input type="submit" value="Submit" />
      </form>
    );
  }
}
