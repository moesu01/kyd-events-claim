export function formatPrice(amount: number): string {
  return `$${amount.toFixed(2)}`
}

export function formatDate(dateString: string): string {
  return dateString
}

const DAY_ABBREVIATIONS: Record<string, string> = {
  Monday: 'Mon',
  Tuesday: 'Tue',
  Wednesday: 'Wed',
  Thursday: 'Thu',
  Friday: 'Fri',
  Saturday: 'Sat',
  Sunday: 'Sun',
}

const MONTH_ABBREVIATIONS: Record<string, string> = {
  January: 'Jan',
  February: 'Feb',
  March: 'Mar',
  April: 'Apr',
  May: 'May',
  June: 'Jun',
  July: 'Jul',
  August: 'Aug',
  September: 'Sep',
  October: 'Oct',
  November: 'Nov',
  December: 'Dec',
}

export function formatEventDateTimeLabel(date: string, showTime: string): string {
  const match = date.match(/^([A-Za-z]+),\s+([A-Za-z]+)\s+(\d{1,2})/)
  if (!match) return `${date} at ${showTime}`

  const [, dayName, monthName, dayOfMonth] = match
  const dayAbbr = DAY_ABBREVIATIONS[dayName] ?? dayName.slice(0, 3)
  const monthAbbr = MONTH_ABBREVIATIONS[monthName] ?? monthName.slice(0, 3)

  return `${dayAbbr}, ${monthAbbr} ${dayOfMonth} at ${showTime}`
}
