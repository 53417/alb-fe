const differenceInDateTimeInMins = (date1, date2) => {
  const diffMs = date1 - date2
  return Math.round(((diffMs % 86400000) % 3600000) / 60000)
} 

export default {
  differenceInDateTimeInMins
}
