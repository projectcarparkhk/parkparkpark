export const isToday = (day: string) => {
  const week = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
  const today = new Date().getDay()
  if (day === 'all') {
    return true
  } else if (day.includes('-')) {
    const [startDay, endDay] = day.split('-')
    return today >= week.indexOf(startDay) && today <= week.indexOf(endDay)
  } else {
    const dates = day.split(',')
    return dates.some((date) => date === week[today])
  }
}
