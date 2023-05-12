import { toast } from "react-toastify";
import { Result } from "../../results/Result";
import { ToastError } from "./ToastError";
import { ToastSuccess } from "./ToastSuccess";

export function ResolveResult(result: any) {
    const data = result.data
    if (data.success) {
        ToastSuccess(data.message)
    } else {
        return ToastError(data.message)
    }

}