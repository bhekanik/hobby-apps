interface StringCompareOptions {
    caseSensitive?: boolean;
    ignoreWhitespace?: boolean;
    specialChars?: string[];
}
export declare const stringCompare: (stringOne: string, stringTwo: string, options?: StringCompareOptions) => boolean;
export {};
