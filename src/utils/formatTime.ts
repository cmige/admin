export const formatTime = (time: Date) => {
  const _time = new Date(time)
  const Year = _time.getFullYear()
  const Month = _time.getMonth()
  const Day = _time.getDay()
  const Hours = _time.getHours()
  const Minutes = _time.getMinutes()
  const Seconds = _time.getSeconds()
  return `${Year}-${Month}-${Day} ${Hours}:${Minutes}`
}