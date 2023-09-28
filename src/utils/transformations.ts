import { phoneInputLengths } from "./shared-data";

export const capitalize = (str: string) =>
  str
    // Replace accented characters with normal characters.
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    // Capitalize the first letter of the string.
    .replace(/^\w{1}/, (match) => match.toUpperCase());

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

/* 
*** QUESTION FOR INSTRUCTOR ***

Would it be better to use the above formatPhoneNumber function that
concatenates a string or the below formatPhoneNumber function that 
creates an array and then uses the .join("-") function to add the hyphens?
*/

// export const formatPhoneNumber = (phoneInput: string) => {
//   const phoneDigitsArray = [];
//   let phoneInputCopy = phoneInput;
//   for (const i in phoneInputLengths) {
//     const endIndex = phoneInputLengths[Number(i)];
//     phoneDigitsArray.push(phoneInputCopy.slice(0, endIndex));
//     phoneInputCopy = phoneInputCopy.substring(endIndex);
//   }
//   return phoneDigitsArray.join("-");
// };
