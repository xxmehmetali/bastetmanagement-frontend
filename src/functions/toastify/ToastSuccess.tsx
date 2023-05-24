import { toast } from "react-toastify";

export function ToastSuccess(message : string = "No Message Found!") {
    return toast.success(message, {
        theme: "colored",
        icon: ({ theme, type }) => <img style={{  }} src="/photos/toastify/smiling-cat.jpg" />
      })
}