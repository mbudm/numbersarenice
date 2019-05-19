export const gameTime = (startTime, endTime) => {
  return `${Math.round((endTime - startTime) / 10) / 100} secs`;
};
