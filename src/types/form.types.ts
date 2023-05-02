export type FormErrors<FormValues extends Record<string, unknown>> = {
    [T in keyof FormValues]?: unknown;
};