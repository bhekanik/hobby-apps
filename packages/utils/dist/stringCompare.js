export const stringCompare = (stringOne, stringTwo, options = {}) => {
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
//# sourceMappingURL=stringCompare.js.map