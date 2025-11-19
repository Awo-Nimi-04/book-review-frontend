export function formatMessageTime(isoDateString) {
  const date = new Date(isoDateString);
  const now = new Date();

  const timeString = date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const msgDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  if (msgDate.getTime() === today.getTime()) {
    return timeString;
  } else if (msgDate.getTime() === yesterday.getTime()) {
    return `Yesterday ${timeString}`;
  } else {
    const dateString = date.toLocaleDateString("en-US"); 
    return `${dateString} ${timeString}`;
  }
}
