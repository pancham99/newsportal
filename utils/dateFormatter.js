/**
 * Lightweight, zero-dependency date formatting utility.
 * Replaces moment & moment-timezone (~200KB bundle size reduction).
 */

export function formatDate(dateVal, formatStr = 'DD MMM YYYY') {
  if (!dateVal) return '';
  const d = new Date(dateVal);
  if (isNaN(d.getTime())) return String(dateVal);

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const fullMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const dayName = days[d.getDay()];
  const dayNum = String(d.getDate()).padStart(2, '0');
  const monthName = months[d.getMonth()];
  const fullMonthName = fullMonths[d.getMonth()];
  const year = d.getFullYear();

  let hours = d.getHours();
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const hours12 = hours % 12 || 12;
  const formattedHours = String(hours12).padStart(2, '0');

  if (formatStr === 'dddd, MMMM D, YYYY | h:mm A') {
    return `${dayName}, ${fullMonthName} ${d.getDate()}, ${year} | ${hours12}:${minutes} ${ampm}`;
  }
  if (formatStr === 'DD MMM YYYY | hh:mm A' || formatStr === 'DD MMM YYYY, hh:mm A') {
    return `${dayNum} ${monthName} ${year} | ${formattedHours}:${minutes} ${ampm}`;
  }
  if (formatStr === 'hh:mm A') {
    return `${formattedHours}:${minutes} ${ampm}`;
  }
  if (formatStr === 'fromNow') {
    const diffMs = Date.now() - d.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return 'अभी';
    if (diffMins < 60) return `${diffMins} मिनट पहले`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} घंटे पहले`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} दिन पहले`;
  }

  return `${dayNum} ${monthName} ${year}`;
}
