import { db } from "../../models";
import { UserModelDocument } from "../../models/user.model";

const {user } = db;

interface findUserResultProps {
    isError: {
        error: Error;
        message: string;
    } | null;
    data: UserModelDocument | null;
}

export const findUser = async (userId: string): Promise<findUserResultProps> => {
    const userData = await user.findById(userId).populate("role").exec();

    if (!userData) {
        return {
            isError: {
                error: new Error("user not found"),
                message: "user not found"
            },
            data: null
        }
    }

    return {
        isError: null,
        data: userData
    }
}
