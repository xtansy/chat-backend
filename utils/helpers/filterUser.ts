import { UserModelDocument } from "../../models/user.model"
import { UserInfo, UserModel } from "../../@types/models";

export const filterUser = (user: UserModelDocument | UserModel): UserInfo => {
    return {
        _id: user._id,
        email: user.email,
        login: user.login,
        name: user.name,
        surname: user.surname,
        role: user.role,
    }
}