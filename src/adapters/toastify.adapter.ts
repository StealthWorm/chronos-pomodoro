import { toast } from "react-toastify";

type ToastifyAdapterProps = {
  message?: string;
  type: "success" | "warning" | "error" | "info" | "dismiss";
}

export const toastifyAdapter: Record<ToastifyAdapterProps["type"], (message?: string) => void> = {
  success: (message?: string) => toast.success(message ?? ""),
  warning: (message?: string) => toast.warning(message ?? ""),
  error: (message?: string) => toast.error(message ?? ""),
  info: (message?: string) => toast.info(message ?? ""),
  dismiss: () => toast.dismiss(),
}