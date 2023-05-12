import { toast } from "react-toastify";

export function ToastError(message : string = "No Message Found!") {
    return toast.error(message, {
        theme: "colored",
        icon: ({ theme, type }) => <img style={{  }} src="/photos/toastify/angry-cat.jpg" />
      })
}