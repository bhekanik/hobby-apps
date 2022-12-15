export declare const dates: ({
    value: string;
    duration: {
        days: number;
        months?: undefined;
        years?: undefined;
    };
    interval: {
        start: Date;
        end: Date;
    };
    label: string;
} | {
    value: string;
    duration: {
        months: number;
        days?: undefined;
        years?: undefined;
    };
    interval: {
        start: Date;
        end: Date;
    };
    label: string;
} | {
    value: string;
    duration: {
        years: number;
        days?: undefined;
        months?: undefined;
    };
    interval: {
        start: Date;
        end: Date;
    };
    label: string;
} | {
    value: string;
    interval: {
        start: Date;
        end: Date;
    };
    label: string;
    duration?: undefined;
})[];
