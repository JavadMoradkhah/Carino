export default function (): number {
  const min = 12345;
  const max = 98765;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
