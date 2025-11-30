import { toast } from "react-toastify";
import { Dialog } from "../components/Dialog";

type ToastifyAdapter = {
  success: (message?: string) => void;
  warning: (message?: string) => void;
  error: (message?: string) => void;
  info: (message?: string) => void;
  dismiss: () => void;
  confirm: (data: string, onClosing: (confirmation: boolean) => void) => ReturnType<typeof toast>;
}

export const toastifyAdapter: ToastifyAdapter = {
  success: (message?: string) => toast.success(message ?? ""),
  warning: (message?: string) => toast.warning(message ?? ""),
  error: (message?: string) => toast.error(message ?? ""),
  info: (message?: string) => toast.info(message ?? ""),
  dismiss: () => toast.dismiss(),
  confirm: (data: string, onClosing: (confirmation: boolean) => void) =>
    toast(Dialog, {
      data,
      onClose: confirmation => {
        if (confirmation) return onClosing(true);
        return onClosing(false);
      },
      autoClose: false,
      closeOnClick: false,
      closeButton: false,
      draggable: false,
    }),
}