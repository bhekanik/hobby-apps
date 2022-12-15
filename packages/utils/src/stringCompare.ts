interface StringCompareOptions {
  caseSensitive?: boolean;
  ignoreWhitespace?: boolean;
  specialChars?: string[];
}

export const stringCompare = (
  stringOne: string,
  stringTwo: string,
  options: StringCompareOptions = {}
): boolean => {
  let string1 = stringOne;
  let string2 = stringTwo;

  const caseSensitive = options.caseSensitive || false;
  const ignoreWhitespace = options.ignoreWhitespace || false;
  const specialChars = options.specialChars || [];

  if (!caseSensitive) {
    string1 = string1.toLowerCase();
    string2 = string2.toLowerCase();
  }

  if (ignoreWhitespace) {
    string1 = string1.replace(/\s/g, "");
    string2 = string2.replace(/\s/g, "");
  }

  if (specialChars.length > 0) {
    specialChars.forEach((char) => {
      string1 = string1.replace(char, "");
      string2 = string2.replace(char, "");
    });
  }

  return string1 === string2;
};
