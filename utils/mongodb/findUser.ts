import { db } from "../../models";
import { filterUser } from "../helpers/filterUser";
import { UserModelDocument } from "../../models/user.model";
import { UserInfo } from "../../@types";

const { user } = db;

interface findUserResultProps {
    isError: {
        message: string;
    } | null;
    data: UserInfo | null;
}

export const findUserById = async (userId: string): Promise<findUserResultProps> => {
    const userData = await user.findById(userId).populate("role").exec();

    if (!userData) {
        return {
            isError: {
                message: "user not found"
            },
            data: null
        }
    }

    return {
        isError: null,
        data: filterUser(userData)
    }
}



export const findUserByLogin = async (login: string): Promise<findUserResultProps> => {
    const data = await user.findOne({ login }).populate("role").exec();
    if (data) {
        return {
            isError: null,
            data: filterUser(data)
        }
    }
    return {
        isError: {
            message: "user not found"
        },
        data: null
    }
}
