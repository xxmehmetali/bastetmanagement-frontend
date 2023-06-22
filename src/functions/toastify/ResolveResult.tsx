import { ToastError } from "./ToastError";
import { ToastSuccess } from "./ToastSuccess";

export const ResolveResult = (result: any) => {
    if (result?.success) {
        ToastSuccess(result.message)
    } else {
        ToastError(result.message)
    }
}
