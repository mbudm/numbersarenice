export const gameTime = (startTime, endTime) => {
  console.log('s',startTime, 'e', endTime)
  // fix end time render issue
  const time = endTime < startTime ?
    Date.now() - startTime :
    endTime - startTime
  return Math.round((time) / 10) / 100
}
