export function secondsToStringTimestamp(seconds) {
  const numhours = Math.floor(((seconds % 31536000) % 86400) / 3600);
  const numminutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60);
  const numseconds = Math.floor((((seconds % 31536000) % 86400) % 3600) % 60);
  return numhours.toString().padStart(2, '0') + ":" + numminutes.toString().padStart(2, '0') + ":" + numseconds.toString().padStart(2, '0');
}

export function secondsToStringDuration(seconds) {
  const numhours = Math.floor(((seconds % 31536000) % 86400) / 3600);
  const numminutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60);
  const numseconds = Math.floor((((seconds % 31536000) % 86400) % 3600) % 60);
  if(numhours !== 0) {
    return numhours + "h" + numminutes + "m" + numseconds + "s";
  } else if(numminutes !== 0) {
    return numminutes + "m" + numseconds + "s";
  } else {
    return numseconds + "s";
  }
}

