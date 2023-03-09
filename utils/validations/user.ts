import { fieldValidate } from "./utils";


export const changeUserInfoValidation = [
    fieldValidate("login", "логин", { min: 3, max: 16 }),
    fieldValidate("name", "имя", { min: 3, max: 15 }),
    fieldValidate("surname", "фамилия", { min: 3, max: 15 }),
    fieldValidate("email", "почта", { min: 5, max: 20 }).isEmail().withMessage("Неверный E-Mail"),
];

export const changeUserPasswordValidation = [
    fieldValidate("oldPassword", "пароль", { min: 6, max: 20 }),
    fieldValidate("newPassword", "пароль", { min: 6, max: 20 }),
    fieldValidate("newPasswordConfirmed", "подтверждение", { min: 6, max: 20 }).custom((value: string, { req }) => {
        if (value !== req.body.newPassword) {
            throw new Error('Пароли не совпадают');
        }
        return true;
    }),
];