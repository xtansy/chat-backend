import { fieldValidate } from "./utils";

export const signUpValidation = [
    fieldValidate("login", "логин", { min: 3, max: 16 }),
    fieldValidate("name", "имя", { min: 3, max: 15 }),
    fieldValidate("surname", "фамилия", { min: 3, max: 15 }),
    fieldValidate("password", "пароль", { min: 6, max: 20 }),
    fieldValidate("email", "почта", { min: 5, max: 20 }).isEmail().withMessage("Неверный E-Mail"),
    fieldValidate("confirmPassword", "подтверждение", { min: 6, max: 20 }).custom((value: string, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Пароли не совпадают');
        }
        return true;
    }),
];

export const signInValidation = [
    fieldValidate("login", "логин", { min: 3, max: 16 }),
    fieldValidate("password", "пароль", { min: 6, max: 20 }),
]