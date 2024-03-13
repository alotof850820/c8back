export function setFormatDuration(seconds: number): string {
  return new Date(seconds * 1000).toISOString().substr(14, 5);
}
