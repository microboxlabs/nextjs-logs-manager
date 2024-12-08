interface DateFormatOptions {
  locale?: string;
  format?: "short" | "medium" | "long";
  includeTime?: boolean;
  hour12?: boolean;
}

const formatDate = (
  date: Date | string | number,
  options: DateFormatOptions = {},
): string => {
  const {
    locale = "en-US",
    format = "medium",
    includeTime = true,
    hour12 = true,
  } = options;

  const dateObj = date instanceof Date ? date : new Date(date);

  if (isNaN(dateObj.getTime())) {
    throw new Error("Invalid date provided");
  }

  const formatOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    ...(includeTime && {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12,
    }),
  };

  switch (format) {
    case "short":
      formatOptions.month = "numeric";
      formatOptions.year = "2-digit";
      break;
    case "long":
      formatOptions.month = "long";
      break;
  }

  return new Intl.DateTimeFormat(locale, formatOptions).format(dateObj);
};

export default formatDate;
