import { format, parse } from "date-fns";
import { id } from "date-fns/locale";

export function formatDate(
  date?: string | Date | null,
  pattern: string = "dd-MM-yyyy"
) {
  if (!date) return "-";

  let parsedDate: Date;

  if (typeof date === "string") {
    parsedDate = new Date(date);

    if (isNaN(parsedDate.getTime())) {
      parsedDate = parse(date, "dd/MM/yyyy", new Date());
    }
  } else {
    parsedDate = date;
  }

  if (isNaN(parsedDate.getTime())) {
    return "-";
  }

  return format(parsedDate, pattern, { locale: id });
}
