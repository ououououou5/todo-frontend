export function formattedDateAndTime(date: number): string {
  const d = new Date(date);
  const now = new Date();
  
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const yyyy = d.getFullYear();
  
  let hours24 = d.getHours();
  const ampm = hours24 >= 12 ? "PM" : "AM";
  const hours12 = hours24 % 12 || 12;
  
  const hh = String(hours12).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");
  
  const formattedDate =
    d.getFullYear() === now.getFullYear()
      ? `${hh}:${min} ${ampm}  ${mm}/${dd}`
      : `${hh}:${min} ${ampm}  ${mm}/${dd}/${yyyy}`;

  return formattedDate;
}