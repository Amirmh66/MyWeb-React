export const conditionStatusColor = (status: string) => {
  switch (status) {
    case "draft":
      return "draft";
    case "pending":
      return "pending";
    case "archived":
      return "archived";
    case "published":
      return "published";
    default:
      return "nothing";
  }
};
export const headerText = (sortName: string) => {
  switch (sortName) {
    case "date-desc":
      return "Newest";

    case "date-asc":
      return "Oldest";

    case "views-desc":
      return "Most Viewed";

    case "views-asc":
      return "Least Viewed";

    default:
      "";
  }
}
export const formattedDate = (dateString: Date) => {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  })

  return `${formattedDate} | ${formattedTime}`;
}