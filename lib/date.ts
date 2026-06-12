import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInMonths,
  differenceInSeconds,
  differenceInYears,
  intervalToDuration,
  format,
  parseISO,
} from "date-fns";

function toDate(value: string | Date) {
  if (value instanceof Date) {
    return value;
  }

  const parsedDate = parseISO(value);
  if (!Number.isNaN(parsedDate.getTime())) {
    return parsedDate;
  }

  return new Date(value);
}

export function formatExactDate(value: string | Date, pattern = "dd MMM yyyy") {
  return format(toDate(value), pattern);
}

export function formatExactDateTime(value: string | Date) {
  return format(toDate(value), "dd MMM yyyy, HH:mm");
}

export function formatRelativeDate(value: string | Date, referenceDate = new Date()) {
  const targetDate = toDate(value);
  const elapsedSeconds = differenceInSeconds(targetDate, referenceDate);
  const elapsedMinutes = differenceInMinutes(targetDate, referenceDate);
  const elapsedHours = differenceInHours(targetDate, referenceDate);
  const elapsedDays = differenceInDays(targetDate, referenceDate);
  const elapsedMonths = differenceInMonths(targetDate, referenceDate);
  const elapsedYears = differenceInYears(targetDate, referenceDate);
  const relativeFormat = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  if (Math.abs(elapsedYears) >= 1) {
    return relativeFormat.format(elapsedYears, "year");
  }

  if (Math.abs(elapsedMonths) >= 1) {
    return relativeFormat.format(elapsedMonths, "month");
  }

  if (Math.abs(elapsedDays) >= 1) {
    return relativeFormat.format(elapsedDays, "day");
  }

  if (Math.abs(elapsedHours) >= 1) {
    return relativeFormat.format(elapsedHours, "hour");
  }

  if (Math.abs(elapsedMinutes) >= 1) {
    return relativeFormat.format(elapsedMinutes, "minute");
  }

  return relativeFormat.format(elapsedSeconds, "second");
}

export function formatRelativeDateTime(value: string | Date, referenceDate = new Date()) {
  return `${formatRelativeDate(value, referenceDate)} · ${formatExactDateTime(value)}`;
}

export function formatDurationSince(startValue: string | Date, endValue = new Date()) {
  const duration = intervalToDuration({ start: toDate(startValue), end: toDate(endValue) });
  const parts = [
    duration.years ? `${duration.years} year${duration.years === 1 ? "" : "s"}` : "",
    duration.months ? `${duration.months} month${duration.months === 1 ? "" : "s"}` : "",
    duration.days ? `${duration.days} day${duration.days === 1 ? "" : "s"}` : "",
  ].filter(Boolean);

  return parts.length ? parts.join(", ") : "0 days";
}

export function formatDurationUntil(targetValue: string | Date, referenceDate = new Date()) {
  const targetDate = toDate(targetValue);
  const startDate = referenceDate <= targetDate ? referenceDate : targetDate;
  const endDate = referenceDate <= targetDate ? targetDate : referenceDate;
  const duration = intervalToDuration({ start: startDate, end: endDate });
  const parts = [
    duration.years ? `${duration.years} year${duration.years === 1 ? "" : "s"}` : "",
    duration.months ? `${duration.months} month${duration.months === 1 ? "" : "s"}` : "",
    duration.days ? `${duration.days} day${duration.days === 1 ? "" : "s"}` : "",
  ].filter(Boolean);

  return parts.length ? parts.join(", ") : "0 days";
}
