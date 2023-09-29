import { PhoneInputState } from "../types";
import { phoneInputLengths } from "./shared-data";
import { capitalize } from "./transformations";

function isEmailValid(emailAddress: string) {
  // eslint-disable-next-line no-useless-escape
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return !!emailAddress.match(regex);
}

function isNameValid(nameInput: string) {
  for (const char of nameInput) {
    if (!isNaN(Number(char) + 1)) {
      return false;
    }
  }
  return nameInput.length >= 2;
}

const isCityValid = (cityInput: string, cityArr: string[]) => {
  return cityArr
    .map((city) => capitalize(city))
    .includes(capitalize(cityInput));
};

function isPhoneValid(phoneInput: PhoneInputState) {
  const phoneString = phoneInput.join("");

  return (
    phoneString.length ===
    phoneInputLengths.reduce((acc, curr) => acc + curr, 0)
  );
}

export const Validations = {
  isEmailValid,
  isNameValid,
  isCityValid,
  isPhoneValid,
};
