import { phoneInputLengths } from "./shared-data";

export const capitalize = (str: string) =>
  str.toLowerCase().replace(/^\w{1}/, (match) => match.toUpperCase());

export const formatPhoneNumber = (phoneInput: string) => {
  let hyphenedString = "";
  let phoneInputCopy = phoneInput;
  for (const i in phoneInputLengths) {
    const endIndex = phoneInputLengths[Number(i)];
    hyphenedString +=
      Number(i) === 0
        ? phoneInputCopy.slice(0, endIndex)
        : "-" + phoneInputCopy.slice(0, endIndex);
    phoneInputCopy = phoneInputCopy.substring(endIndex);
  }
  return hyphenedString;
};
