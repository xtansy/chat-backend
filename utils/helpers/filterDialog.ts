import { DialogModel } from "../../@types";
import { filterUser } from "./filterUser";

export const filterDialog = (dialog: DialogModel) => {
    return {
        ...dialog,
        owner: filterUser(dialog.owner),
        partner: filterUser(dialog.partner),
    }
}