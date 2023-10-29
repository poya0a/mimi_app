import { RegisterOptions } from "react-hook-form";

interface InputData {
    id: string;
    name: string;
    type: string;
    labelName: string;
    isRequired: boolean;
    isDisabled: boolean;

    register?: RegisterOptions;
    placeholder?: string;
}

export type { InputData }