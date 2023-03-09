import { fieldValidate } from "./utils";

export const createDialogValidation = [
    fieldValidate("partnerLogin", "логин", { min: 3, max: 16 }),
];