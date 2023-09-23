import { PhoneInputState } from "../types";
import { phoneInputLengths } from "./shared-data";
import { capitalize } from "./transformations";

export function isEmailValid(emailAddress: string) {
  // eslint-disable-next-line no-useless-escape
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return !!emailAddress.match(regex);
}

export function isNameValid(nameInput: string) {
  for (const char of nameInput) {
    if (!isNaN(Number(char) + 1)) {
      return false;
    }
  }
  return nameInput.length >= 2;
}

export const isCityValid = (cityInput: string, cityArr: string[]) =>
  cityArr.map((city) => capitalize(city)).includes(capitalize(cityInput));

export function isPhoneValid(phoneInput: PhoneInputState) {
  const phoneString = phoneInput.join("");
  return (
    phoneString.length ===
      phoneInputLengths.reduce((acc, curr) => acc + curr, 0) &&
    !isNaN(Number(phoneString) + 1)
    /* 
    ***QUESTION FOR INSTRUCTOR***

    If the phoneInput state will not be set unless the input is a
    number (line 55 of FunctionalForm.tsx), do I need to check if the
    phoneInput is a number in this isPhoneValid function?
    */
  );
}
