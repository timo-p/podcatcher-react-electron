export default function formatSpeed(speedInKilobytes: number) {
  return speedInKilobytes <= 1024
    ? `${speedInKilobytes.toFixed(2)} kb/s`
    : `${(speedInKilobytes / 1024).toFixed(2)} mb/s`;
}
