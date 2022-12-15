declare type NonEmptyArray<T> = [T, ...T[]];
export declare const getLatestDate: (dateArray: NonEmptyArray<Date>) => Date;
export {};
