export function formattedDate (milliseconds: string | number): string {
  const date = new Date(Number(milliseconds))
  const monthDay = date.getDate()
  const month = date.getMonth() + 1
  const year = String(date.getFullYear()).slice(-2)
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${monthDay}.${month}.${year} - ${hours}:${minutes}`
}
