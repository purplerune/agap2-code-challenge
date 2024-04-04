import toast from "react-hot-toast";

export const notifySuccess = (message: string) =>
  toast.success(message, { duration: 1000, position: "top-center" });

export const notifyError = (message: string) =>
  toast.error(message, { duration: 1000, position: "top-center" });
