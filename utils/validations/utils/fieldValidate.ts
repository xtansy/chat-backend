import { body } from "express-validator";

interface LengthConfig {
    min: number;
    max: number;
}
export const fieldValidate = (field: string, name: string, { min, max }: LengthConfig) => {
    return body(field, `Поле ${name} обязательно!`)
        .isString()
        .isLength({ min, max })
        .withMessage(`Неверная длина поля ${name}`)
}