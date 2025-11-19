import { format } from "date-fns";

export const formatDate = (currentDate: number) => {
  const formattedDate = new Date(currentDate);
  return format(formattedDate, 'dd/MM/yyyy HH:mm');
}