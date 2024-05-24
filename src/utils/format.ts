import { format, parseISO, isValid, differenceInDays } from "date-fns";

export const formatRuntime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours}h${minutes}m`;
};

export const formatDate = (dateString: string): string => {
  const date = parseISO(dateString);
  if (isValid(date)) {
    return format(date, "dd MMM yyyy");
  } else {
    return "Invalid Date";
  }
};

export const formatReleaseDays = (dateString: string): number | null => {
  const releaseDays = isValid(parseISO(dateString))
    ? differenceInDays(new Date(dateString), new Date())
    : null;
  return releaseDays;
};

export const formatVotes = (votes: string): string => {
  const votesNumber = parseInt(votes.replace(/,/g, ''), 10);
  if (votesNumber >= 1000) {
    return `${(votesNumber / 1000).toFixed(1)}k`;
  }
  return votesNumber.toString();
};
