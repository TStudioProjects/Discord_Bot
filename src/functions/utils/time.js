function formatNumberWithLeadingZero (number) {
  return number.toString().padStart(2, '0')
}

export function getCurrentTime () {
  const now = new Date()
  const hours = formatNumberWithLeadingZero(now.getHours())
  const minutes = formatNumberWithLeadingZero(now.getMinutes())
  const seconds = formatNumberWithLeadingZero(now.getSeconds())
  return `${hours}:${minutes}:${seconds}`
}
