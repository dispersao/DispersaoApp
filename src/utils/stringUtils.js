 export const timeDifference = (current, previous) => {

  const time = {}

  const msPerMinute = 60 * 1000
  const msPerHour = msPerMinute * 60
  const msPerDay = msPerHour * 24
  const msPerMonth = msPerDay * 30
  const msPerYear = msPerDay * 365

  const elapsed = current - previous

  if (elapsed < msPerMinute) {
    time.amount =  Math.round(elapsed/1000)
    time.unity = 'second'
  }

  else if (elapsed < msPerHour) {
    time.amount = Math.round(elapsed/msPerMinute) 
    time.unity = 'minute'
  }

  else if (elapsed < msPerDay ) {
    time.amount = Math.round(elapsed/msPerHour )
    time.unity = 'hour'
  }

  else if (elapsed < msPerMonth) {
    time.amount = Math.round(elapsed/msPerDay)
    time.unity = 'day'
  }

  else if (elapsed < msPerYear) {
    time.amount = Math.round(elapsed/msPerMonth)
    time.unity = 'month'
  }

  else {
    time.amount = Math.round(elapsed/msPerYear)
    time.unity = 'year'
  }

  return time
}
