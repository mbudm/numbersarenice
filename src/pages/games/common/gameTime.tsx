export const gameTime = (startTime, endTime) => {
  // fix end time render issue in tests
  const time = endTime < startTime ?
    Date.now() - startTime :
    endTime - startTime

  return Math.round((time) / 10) / 100
}
