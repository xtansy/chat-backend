import { Error, FilterQuery, Model } from "mongoose";

import { UserModelDocument } from "../../models/user.model";
import { RoleModelDocument } from "../../models/role.model";

export type Collections = UserModelDocument | RoleModelDocument;

interface findOneCollectionProps {
    model: Model<Collections>;
    filter: FilterQuery<Collections>;
}

interface mongoResultProps {
    isError: {
        error: Error;
        message: string;
    } | null;
    data: Collections | null;
}

export const findOneCollection = ({
    model,
    filter,
}: findOneCollectionProps): mongoResultProps => {
    const result: mongoResultProps = {
        isError: null,
        data: null,
    };

    model.findOne(filter).exec(async (err, data) => {
        if (err) {
            result.isError = {
                error: err,
                message: err.message,
            };
            return;
        }

        if (!data) {
            result.isError = {
                error: new Error("Not found."),
                message: "Not found.",
            };
            return;
        }
        result.data = data;
    });

    return result;
};
