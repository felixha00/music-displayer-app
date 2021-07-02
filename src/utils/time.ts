export const msToMMSS = (millis: number) => {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);
  return `${minutes}:${+seconds < 10 ? '0' : ''}${seconds}`;
};

export const sToMMSS = (d: number) => {
  const m = Math.floor((d % 3600) / 60);
  const s = Math.floor((d % 3600) % 60);

  // const mDisplay = m > 0 ? m + (m == 1 ? ' minute, ' : ' minutes, ') : '';
  // const sDisplay = s > 0 ? s + (s == 1 ? ' second' : ' seconds') : '';
  return `${m}:${+s < 10 ? '0' : ''}${s}`;
};
export default {};
