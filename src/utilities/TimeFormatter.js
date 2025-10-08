export function formatMessageTime(isoDateString) {
  const date = new Date(isoDateString);
  const now = new Date();

  // Strip time (midnight) for comparisons
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  // Message date stripped
  const msgDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  if (msgDate.getTime() === today.getTime()) {
    // Same day → show only time (e.g., 1:30 PM)
    return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  } else if (msgDate.getTime() === yesterday.getTime()) {
    // Yesterday
    return "Yesterday";
  } else {
    // Older → show mm/dd/yyyy
    return date.toLocaleDateString("en-US");
  }
}

