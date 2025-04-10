import { format } from "date-fns";
import { i18n } from "../main";
import { enUS, nb } from "date-fns/locale";

/**
 * Formats a date to a short format based on the current locale.
 */
export function formatShort(date: Date) {
  console.log("DATE", date);

  switch (i18n.global.locale.value) {
    case "en":
      return format(new Date(date), "MM/dd 'at' HH:mm", {
        locale: enUS,
      });
    case "no":
      return format(new Date(date), "dd. MM 'kl' HH:mm", {
        locale: nb,
      });
  }
}
